"use strict";

import CheckIt from "checkit";

import HTTP from "../../helpers/httpcodes";
import { isID } from '../../helpers/validate';
import { ModelError, ISE } from "../../helpers/error-handler";

// models used
import Save from "../../models/save";

class SaveById {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        if (! req.params.id instanceof Number) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Save.where({"ID": req.params.id}).fetch()
        .then( save => {
            if (save) {
                res.status(HTTP.OK).json({
                    message: "Save found",
                    data: save.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "Save couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });

    }

    // PUT request
    put (req, res) {

        if (!req.params.id instanceof Number) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });

        Save.where({'ID': req.params.id}).fetch()
        .then( user => {
            if (user) {

                let updateObj = {};
                if (req.body.gold) updateObj.gold = req.body.gold
                if (req.body.dmg) updateObj.dmg = req.body.dmg
                if (req.body.auto) updateObj.auto = req.body.auto
                if (req.body.progress) updateObj.progress = req.body.progress
                if (req.body.weapons) updateObj.weapons = req.body.weapons
                if (req.body.id_zone) updateObj.id_zone = req.body.id_zone

                if (Object.keys(updateObj).length === 0) {
                    res.status(HTTP.BAD_REQUEST).json({ message: "No parameter given"});
                }
                else {
                    Save.where({'ID': req.params.id})
                    .save(updateObj, { patch:true }) // why using patch: so to update selective fields
                    .then( model => {
                        res.status(HTTP.OK).json({
                            message: "Save successfully updated",
                            data: req.params.id
                        });
                    })
                    .catch((error) => { ModelError(error, res) });
                }

            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "Save couldn't be found" });
            }
        })
        .catch((error) => { ISE(error, res) });
    }
}

export default SaveById;
