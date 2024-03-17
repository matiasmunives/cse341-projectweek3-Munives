/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('players')
    .find()
    .toArray((err, players) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(players);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const playerId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('players')
    .find({ id: playerId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createPlayer = async (req, res) => {
  //swagger.tags=['Hello World']
  const player = {
    ID: req.body.ID,
    Forename: req.body.Forename,
    Surname: req.body.Surname,
    ImageURL: req.body.ImageURL,
  };
  const response = await mongodb.getDatabase().db().collection("players").insertOne(player);
  if (response.acknowledged > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while creating the player.');
  }
};

const updatePlayer = async (req, res) => {
  //swagger.tags=['Hello World']
  const playerId = new ObjectId(req.params.id);
  const player = {
    ID: req.body.ID,
    Forename: req.body.Forename,
    Surname: req.body.Surname,
    ImageURL: req.body.ImageURL,
  };
  const response = await mongodb.getDatabase().db().collection("players").replaceOne({ _id: playerId }, player);
  if (response.modifiedCount > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while updating the player.');
  }
};

const deletePlayer = async (req, res) => {
  //swagger.tags=['Hello World']
  const playerId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("players").deleteOne({ _id: playerId });
  if (response.deleteCount > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while deleting the player.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
