const router = require("express").Router();
const controller = require("./users-controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:userId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;