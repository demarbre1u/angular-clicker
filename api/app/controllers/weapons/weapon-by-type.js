"use strict";

import CheckIt from "checkit";

import HTTP from "../../helpers/httpcodes";
import { isID } from '../../helpers/validate';
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Weapon from "../../models/weapon";

class WeaponByType {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (!req.params.type instanceof Number) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid type" });

        Weapon.where({"Type": req.params.type }).fetchAll()
        .then( weapon => {
            if (weapon) {
                res.status(HTTP.OK).json({
                    message: "weapon found",
                    data: weapon.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "weapon couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }
}

export default WeaponByType;
