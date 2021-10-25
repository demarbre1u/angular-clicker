"use strict";

import CheckIt from "checkit";
import Jwt from "jsonwebtoken";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Weapon from "../../models/weapon";

class WeaponBase {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Weapon.fetchAll()
        .then( all_weapon => {
            if (all_weapon.length) {
                res.status(HTTP.OK).json({
                    message: "Weapon found",
                    data: all_weapon.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No Weapon found" })
            }
        })
        .catch((error) => { ISE(error, res) });
    }
}

export default WeaponBase;
