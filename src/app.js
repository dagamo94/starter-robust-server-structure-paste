const express = require("express");
const app = express();

const usersRouter = require("./users/users.router"); // import users router
const pastesRouter = require("./pastes/pastes.router"); // import pastes router

// EXPRESS.JSON() IS A BUILT IN MIDDLEWARE THAT ADDS A BODY PROPERTY TO THE REQUEST (req.body)
// MUST COME BEFORE ANY HANDLERS THAT WILL MAKE USE OF THE JSON IN THE BODY OF THE REQUEST
app.use(express.json());

// TODO: Follow instructions in the checkpoint to implement ths API.

// *** USE USERSROUTER TO HANDLE ALL REQUESTS TO THIS PATH ***
app.use("/users", usersRouter);
// *** USE PASTESROUTER TO HANDLE ALL REQUESTS TO THIS PATH (GET, POST, ALL, ETC.) ***
app.use("/pastes", pastesRouter);




// *** Not found handler ***
app.use((req, res, next) => {
  return next({
    status: 404,
    message: `Not found: ${req.originalUrl}`
  });
});

// *** Error handler ***
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong. Internal server error." } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
