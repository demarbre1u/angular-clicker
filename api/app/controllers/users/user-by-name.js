"use strict";

import HTTP from "../../helpers/httpcodes";
import { ISE } from "../../helpers/error-handler";

// models used
import Users from "../../models/users";

class UserByName {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (! req.params.name instanceof String) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid name" });

        Users.where({"Name": req.params.name}).fetch()
        .then( user => {
            if (user) {
                res.status(HTTP.OK).json({
                    message: "Users found",
                    data: user.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "user couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }
}

export default UserByName;
