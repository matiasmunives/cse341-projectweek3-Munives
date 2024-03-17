/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //swagger.tags=['Hello World']
  const result = await mongodb.getDatabase().db().collection("teams").find();
  result.toArray().then((teams) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(teams);
  });
};

const getSingle = async (req, res) => {
  //swagger.tags=['Hello World']
  const teamId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection("teams").find({ _id: teamId });
  result.toArray().then((teams) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(teams[0]);
  });
};

const createTeam = async (req, res) => {
  //swagger.tags=['Hello World']
  const team = {
    ID: req.body.ID,
    Name: req.body.name,
    ShortName: req.body.shortname,
    ImageURL: req.body.ImageURL,
  };
  const response = await mongodb.getDatabase().db().collection("teams").insertOne(team);
  if (response.acknowledged > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const updateTeam = async (req, res) => {
  //swagger.tags=['Hello World']
  const teamId = new ObjectId(req.params.id);
  const team = {
    ID: req.body.ID,
    Name: req.body.name,
    ShortName: req.body.shortname,
    ImageURL: req.body.ImageURL,
  };
  const response = await mongodb.getDatabase().db().collection("teams").replaceOne({ _id: teamId }, team);
  if (response.modifiedCount > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteTeam = async (req, res) => {
  //swagger.tags=['Hello World']
  const teamId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("teams").deleteOne({ _id: teamId });
  if (response.deleteCount > 0){
  res.status(204).send();
  }
  else {
  res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createTeam,
  updateTeam,
  deleteTeam,
};