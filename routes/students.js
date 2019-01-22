var express = require('express');
var router = express.Router();
// var Student = require('../models/Student');
var studentController = require('../controllers/studentController');
var studentValidation = require('../validations/Student');

/* GET student listing. */
router.get('/', studentController.getAllStudent);
router.get('/:id(\\d+)/',  studentController.getStudentById);
router.post('/', studentValidation.NewStudent, studentController.CreateNewStudent);

module.exports = router;
