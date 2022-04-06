const express = require("express");
const app = express();

// EXPRESS.JSON() IS A BUILT IN MIDDLEWARE THAT ADDS A BODY PROPERTY TO THE REQUEST (req.body)
// MUST COME BEFORE ANY HANDLERS THAT WILL MAKE USE OF THE JSON IN THE BODY OF THE REQUEST
app.use(express.json());

// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

// RETURN ONLY ONE PASTE OBJECT FOUND BY ID
app.get("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => Number(pasteId) === paste.id);

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next(`Paste id not found: ${pasteId}`);
  }
});

// RETURN/GET ALL PASTES OBJECTS
app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});

// POST HANDLER FOR '/pastes'
// variable to hold the next ID
// because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);
app.post("/pastes", (req, res, next) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body; // If the body doesn't contain a data property, th destructuring will still succeed because a defualt value of {} has still been suppied for the 'data' property
  if(text){

    const newPaste = {
      id: ++lastPasteId, // Increment last ID, then asign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id,
    };
    pastes.push(newPaste);
    res.status(201).json({ data: newPaste });
  }else{
    res.sendStatus(400);
  }
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
