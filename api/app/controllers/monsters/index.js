"use strict";

import MonsterBase from "./monster";
import MonsterByZone from "./monster-by-zone";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/monsters', (req, res, next) => next() )

    // all the routes related to '/users'

    const baseMonster = new MonsterBase();
    router.route('/monsters')
        .all(baseMonster.all)
        .get(baseMonster.get)

    const baseMonsterByZone = new MonsterByZone();
    router.route('/monsters/:id_zone/zone')
        .all(baseMonsterByZone.all)
        .get(baseMonsterByZone.get)
};
