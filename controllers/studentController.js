var Student = require('../models/Student');
const { check } = require('express-validator/check');
const crypto = require('crypto');
const moment = require('moment-timezone');

exports.getAllStudent = function(req, res, next) {
  Student.getAllStudent(function(error, results) {
    if(error) {
        const error = new Error(error);
        return next(error);
      } 

      return res.status(200).json({ status: 200, error: null, response: results });
  });
};

exports.getStudentById = function(req, res, next) {
  var id = req.params.id;
  if(id) {
    Student.getStudentById(id, function(error, results) {
      if(error) {
        return res.status(500).json({ status: 500, error: error, response: null });
      } else {
        return res.status(200).json({ status: 200, error: null, response: results });
      }      
    });
  }  
};

exports.CreateNewStudent = (req, res, next) => {
    Student.createStudent(req.body, function(error, results) {
      if(error) {
        return res.status(422).json({ status: 422, error: error, response: null });
      } 
        return res.status(201).json({ status: 201, error: null, response: true });
    });
};

exports.UpdateStudent = (req, res, next) => {
    var id = req.params.id;
    Student.UpdateStudent(id, req.body, function(error, results) {
      if(error) {
        return res.status(422).json({ status: 422, error: error, response: null });
      } 
        return res.status(202).json({ status: 202, error: null, response: true });
    });
};

exports.DeleteStudent = function(req, res, next) {
  var id = req.params.id;
  if(id) {
    Student.deleteStudent(id, function(error, results) {
      if(error) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      } else {
          res.status = 203;
          res.json({ status: 203, error: null, response: true });
      }      
    });
  }  
};