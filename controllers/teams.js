/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('teams')
    .find()
    .toArray((err, teams) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(teams);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const teamId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('teams')
    .find({ id: teamId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};


const createTeam = async (req, res) => {
  const team = {
    ID: req.body.ID,
    Name: req.body.Name,
    ShortName: req.body.ShortName,
    ImageURL: req.body.ImageURL,
  };
  const response = await mongodb.getDatabase().db().collection("teams").insertOne(team);
  if (response.acknowledged > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while creating the team.');
  }
};

const updateTeam = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const teamId = new ObjectId(req.params.id);
  const team = {
    ID: req.body.ID,
    Name: req.body.Name,
    ShortName: req.body.ShortName,
    ImageURL: req.body.ImageURL,
  };
  const response = await mongodb.getDatabase().db().collection("teams").replaceOne({ _id: teamId }, team);
  if (response.modifiedCount > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while updating the team.');
  }
};

const deleteTeam = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const teamId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("teams").deleteOne({ _id: teamId });
  if (response.deleteCount > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createTeam,
  updateTeam,
  deleteTeam,
};
