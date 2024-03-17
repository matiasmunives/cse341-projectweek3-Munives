const validator = require('../helpers/validate');

const saveTeam = (req, res, next) => {
  const validationRule = {
    ID: 'required|integer',
    Name: 'required|string',
    ShortName: 'required|string',
    ImageURL: 'required|string|url'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const savePlayer = (req, res, next) => {
  const validationRule = {
    ID: 'required|integer',
    Forename: 'required|string',
    Surname: 'required|string',
    ImageURL: 'required|string|url'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTeam,
  savePlayer
};

