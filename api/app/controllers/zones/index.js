"use strict";

import ZoneBase from "./zone";
import ZoneById from "./zone-by-id";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/zones', (req, res, next) => next() )

    // all the routes related to '/users'

    const baseZone = new ZoneBase();
    router.route('/zones')
        .all(baseZone.all)
        .get(baseZone.get)

    const zoneById = new ZoneById()
    router.route('/zones/:id')
        .all(zoneById.all)
        .get(zoneById.get)
};
