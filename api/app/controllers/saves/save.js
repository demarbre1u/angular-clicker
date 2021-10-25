"use strict";

import CheckIt from "checkit";
import Jwt from "jsonwebtoken";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Save from "../../models/save";

class SaveBase {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
        Save.fetchAll()
        .then( all_saves => {
            if (all_saves.length) {
                res.status(HTTP.OK).json({
                    message: "Saves found",
                    data: all_saves.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No Save found" })
            }
        })
        .catch((error) => { ISE(error, res) });
    }

    post (req, res) {

        const save = new Save({
            gold: req.body.gold,
            dmg: req.body.dmg,
            auto: req.body.auto,
            progress: req.body.progress,
            weapons: req.body.weapons,
            id_zone: req.body.id_zone
        });

        save.save()
        .then( model => {

            res.status(HTTP.OK).json({
                message: "Save successfully created",
                data: {
                    id: model.StringID,
                    save: save.toJSON()
                }
            });

        })
        .catch((error) => { ModelError(error, res) });

    }
    
}

export default SaveBase;
