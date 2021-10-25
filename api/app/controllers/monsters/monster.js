"use strict";

import CheckIt from "checkit";
import Jwt from "jsonwebtoken";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Monster from "../../models/monster";

class MonsterBase {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Monster.fetchAll()
        .then( all_monster => {
            if (all_monster.length) {
                res.status(HTTP.OK).json({
                    message: "Monster found",
                    data: all_monster.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No Monster found" })
            }
        })
        .catch((error) => { ISE(error, res) });
    }
}

export default MonsterBase;
