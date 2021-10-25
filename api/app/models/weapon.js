"use strict";

import crypto from "crypto";
import CheckIt from "checkit";

import Bookshelf from "../db";
import { sanitize, isName } from '../helpers/validate';

class Weapon extends Bookshelf.Model {

    // Initialization
    initialize () {

        // defining events for validation and other stuff
        this.on("creating", (model, attrs, options) => {
            this.attributes.ID = (this.attributes.ID) ? this.attributes.ID : crypto.randomBytes(16);
            this.id = this.attributes.ID; // because we are using custom id and to overwrite native properties
        }, this);

        this.on("saving", (model, attrs, options) => {

            // preparing the data
            let validateObj = {}, validateRule = {};

            Object.keys(this.attributes).map( key => {
                // sanitizing the input
                this.attributes[key] = (key.includes("ID")) ? this.attributes[key] : sanitize(this.attributes[key]);

                validateObj[key] = (!key.includes("ID")) ? this.attributes[key] : this.attributes[key].toString("hex");
                validateRule[key] = Users.validation_rules()[key];
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

    get tableName () { return "weapons" } // table to map with the DB

    get idAttribute () { return "ID" }

    // Validation Rules
    static validation_rules () { return {
        ID: ['required', val => {
            if (! val instanceof Number) throw new Error("The ID is not valid Number");
        }],
        
        Name: ['required', 'name'],

        Dmg: ['required', val => {
            if (! val instanceof Number) throw new Error("The ID is not valid Number");
        }],

        Price: ['required', val => {
            if (! val instanceof Number) throw new Error("The ID is not valid Number");
        }],

        Auto: ['required', val => {
            if (! val instanceof Number) throw new Error("The ID is not valid Number");
        }],

        Type: ['required', val => {
            if (! val instanceof Number) throw new Error("The ID is not valid Number");
        }],

        Src: ['required', 'src'],
    }}


    // Helper Function
    get StringID () { return this.attributes.ID.toString() }

    set StringID (string = null) {
        if (string === null) return false;
        return this.attributes.ID = string;
    }

}

export default Bookshelf.model("Weapon", Weapon);
