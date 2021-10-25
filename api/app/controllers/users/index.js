"use strict";

import Base from "./base";
import IdParameter from "./id-parameter";
import IdParameterAddress from "./id-parameter-address";
import UserByName from "./user-by-name";
import SaveOfUser from "./save-of-user";

module.exports = (router, middlewares) => {

    // middleware for this route only
    router.use('/users', (req, res, next) => next() );

    // all the routes related to '/users'

    const base = new Base()
    router.route('/users')
        .all(base.all) // open route
        .get(base.get) // fetch all users
        .post(base.post); // create new user

    const userByName = new UserByName()
    router.route('/users/:name')
        .all(userByName.all)
        .get(userByName.get)

    const saveOfUser = new SaveOfUser()
    router.route('/users/:id/save')
        .all(saveOfUser.all)
        .get(saveOfUser.get)

    // always place route with parameter at the end so that above routes become valid
    
    const idParameter = new IdParameter();
    router.route('/users/:id')
        .all(idParameter.all) // protected route
        .get(idParameter.get) // fetch single user by id
        .put(idParameter.put) // update user by id
    
    /*
    const idParameter = new IdParameter();
    router.route('/users/:id')
        .all(middlewares.authenticate) // protected route
        .get(idParameter.get) // fetch single user by id
        .put(idParameter.put) // update user by id
        .delete(idParameter.delete); // delete user by id

    const address = new IdParameterAddress();
    router.route('/users/:id/address')
        .all(middlewares.authenticate) // protected route
        .get(address.get) // fetch all address of user by id
        .post(address.post); // create new address for the user by id
    */
};
