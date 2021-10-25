"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName, isID, isExist } from '../helpers/validate';

class Save extends Bookshelf.Model {

    // Initialization
    initialize () {

        // defining events for validation and other stuff
        /*
        this.on("creating", (model, attrs, options) => {
            this.attributes.ID = (this.attributes.ID) ? this.attributes.ID : crypto.randomBytes(16);
            this.id = this.attributes.ID; // because we are using custom id and to overwrite native properties
        }, this);
        */

        this.on("saving", (model, attrs, options) => {

            // preparing the data
            let validateObj = {}, validateRule = {};

            Object.keys(this.attributes).map( key => {
                // sanitizing the input
                this.attributes[key] = (key.includes("ID")) ? this.attributes[key] : sanitize(this.attributes[key]);

                validateObj[key] = (!key.includes("ID")) ? this.attributes[key] : this.attributes[key];
                validateRule[key] = Save.validation_rules()[key];
            });

            if (Object.keys(validateObj).length !== 0) {
                return CheckIt(validateRule).validate(validateObj);
            }

        }, this);
    }

    constructor () {
        super();
        Bookshelf.Model.apply(this, arguments);
    }

    get tableName () { return "saves" } // table to map with the DB

    get idAttribute () { return "ID" }


    // Relations
    zone () { return this.hasOne('zones', 'id', 'id_zone') }


    // Validation Rules
    static validation_rules () { return {
        ID: ['required', val => {
            if (! val instanceof Number) throw new Error("The ID is not valid number");
        }],

        gold: ['required'],

        dmg: ['required'],

        auto: ['required'],

        weapons: ['required'],

        progress: ['required'],

        id_zone: ['required'],
    }}


    // Helper Function
    get StringID () { return this.attributes.ID }

    set StringID (string = null) {
        if (string === null) return false;
        return this.attributes.ID = string;
    }

}

export default Bookshelf.model("Saves", Save);
