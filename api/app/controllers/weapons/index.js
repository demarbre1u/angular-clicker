"use strict";

import WeaponBase from "./weapon";
import WeaponByType from "./weapon-by-type";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/weapon', (req, res, next) => next() )

    // all the routes related to '/users'

    const baseWeapon = new WeaponBase();
    router.route('/weapons')
        .all(baseWeapon.all)
        .get(baseWeapon.get)

    const weaponByType = new WeaponByType()
    router.route('/weapons/type/:type')
        .all(weaponByType.all)
        .get(weaponByType.get)
};
