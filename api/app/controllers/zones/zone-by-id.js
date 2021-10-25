"use strict";

import HTTP from "../../helpers/httpcodes";
import { ISE } from "../../helpers/error-handler";

// models used
import Zone from "../../models/zones";

class ZoneById {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (! req.params.id instanceof Number) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid id" });

        Zone.where({"ID": req.params.id}).fetch()
        .then( zone => {
            if (zone) {
                res.status(HTTP.OK).json({
                    message: "Zone found",
                    data: zone.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "Zone couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }
}

export default ZoneById;
