"use strict";

import HTTP from "../../helpers/httpcodes";
import { isID } from '../../helpers/validate';
import { ISE } from "../../helpers/error-handler";

// models used
import Monster from "../../models/monster";

class MonsterByZone {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (! req.params.id instanceof Number) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid id_zone" });

        Monster.where({"id_zone": req.params.id_zone}).fetchAll()
        .then( monster => {
            if (monster) {
                res.status(HTTP.OK).json({
                    message: "Monsters found",
                    data: monster.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "Monster couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }
}

export default MonsterByZone;
