const router = require("express").Router();
const controller = require("./users-controller");
const pastesRouter = require("../pastes/pastes.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:userId")
    .get(controller.read)
    .all(methodNotAllowed);

router.use("/:userId/pastes", controller.userExists, pastesRouter);

module.exports = router;