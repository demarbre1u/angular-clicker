"use strict";

import Middlewares from "./helpers/middlewares";
import _root from "./controllers/root";
import _users from "./controllers/users";
import _weapons from "./controllers/weapons";
import _monsters from "./controllers/monsters";
import _zones from "./controllers/zones";
import _saves from "./controllers/saves";

module.exports = express => {

    // initiaizing express router
    const router = express.Router();
    const middlewares = new Middlewares();

    const cors = require('cors')
    router.use(cors())

    // middleware
    router.use(middlewares.applicationBase);

    // actual routes
    // router is compusary as a first arg and then we can send anything
    // we are sending router because its an object and object are passed by refrence
    _root(router, middlewares);
    _users(router, middlewares);
    _weapons(router, middlewares);
    _monsters(router, middlewares);
    _zones(router, middlewares);
    _saves(router, middlewares);

    // at this point router will contain all the routes and now it can be added to the express instance

    // return instance of router so that it can be added to the express instance
    return router;

}
