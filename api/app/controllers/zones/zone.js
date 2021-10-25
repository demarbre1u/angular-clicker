"use strict";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Zone from "../../models/zones";

class ZoneBase {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Zone.fetchAll()
        .then( all_zone => {
            if (all_zone.length) {
                res.status(HTTP.OK).json({
                    message: "Zones found",
                    data: all_zone.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No Zone found" })
            }
        })
        .catch((error) => { ISE(error, res) });
    }
}

export default ZoneBase;
