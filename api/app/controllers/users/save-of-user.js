"use strict";

import HTTP from "../../helpers/httpcodes";
import { ISE } from "../../helpers/error-handler";

// models used
import Users from "../../models/users";

class SaveOfUser {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (! req.params.id instanceof Number) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Users.where({"ID": req.params.id}).fetch({withRelated: ['saves']})
        .then( user => {
            if (user) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: user.related('saves').toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "User couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }
}

export default SaveOfUser;
