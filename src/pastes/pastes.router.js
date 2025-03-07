const router = require("express").Router({mergeParams: true}); // create a new instance of Express Router
const controller = require("./pastes.controller"); // imports the '/pastes' controller previously created
const methodNotAllowed = require("../errors/methodNotAllowed");

// allows us to write a path once, and then chain multiple route handlers to that path
router.route("/")
    .get(controller.list)
    .post(controller.create) // 'get(controller.list)' uses the 'list()' route handler defined in the controller for GET requests to '/'
    .all(methodNotAllowed);

router
    .route("/:pasteId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router; // exports the router for us in app.js