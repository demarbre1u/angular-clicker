"use strict";

import SaveBase from "./save";
import SaveById from "./save-by-id";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/saves', (req, res, next) => next() )

    // all the routes related to '/users'

    const baseSave = new SaveBase();
    router.route('/saves')
        .all(baseSave.all)
        .get(baseSave.get)
        .post(baseSave.post)

    const saveById = new SaveById()
    router.route('/saves/:id')
        .all(saveById.all)
        .get(saveById.get)
        .put(saveById.put)
};
