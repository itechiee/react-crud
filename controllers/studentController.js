var Student = require('../models/Student');
const { check } = require('express-validator/check');

exports.getAllStudent = function(req, res, next) {
  // res.send('respond with a resource');
  Student.getAllStudent(function(error, results) {
    if(error) {
      // const error = new Error(error);
      // next(error);
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
    }      
  });
};

exports.getStudentById = function(req, res, next) {
  //  res.send('respond with a resource '+ req.params.id);
  var id = req.params.id;
  if(id) {
    Student.getStudentById(id, function(error, results) {
      if(error) {
        res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      } else {
        // if(results.length == 0) {
        //   const error = new Error('No record found');
        //   error.status = 200;
        //   next(error);
        // } else {
          // res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
          res.status = 200;
          res.json({
            status: 200,
            error: null,
            response: results
          });
        // }
      }      
    });
  }  
};

// exports.getStudentById = (req, res, next) => {
//   req.getValidationResult()
//   .then(validationHandler())
//   .then(() => {
//       Student.getStudentById(id, function(error, results) {
//           if(error) {
//             res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
//           } else {
//             res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
//           }      
//       })
//       .catch(next)
//   })
  //  res.send('respond with a resource '+ req.params.id);
  // var id = req.params.id;
  // if(id) {
    // Student.getStudentById(id, function(error, results) {
    //     if(error) {
    //       res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
    //     } else {
    //       res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
    //     }      
    // });
  // }  
// };

// exports.validate = (method) => {
//   switch (method) {
//       case 'StudentId': {
//       return [ 
//           check('id', "Id should be numeric").isNumeric()
//         ]   
//       }
//     }
// }



exports.CreateNewStudent = (req, res, next) => {
    Student.createStudent(req.body, function(error, results) {
      if(error) {
        return res.status(422).json({ 
            status: 422,
            error: error,
            response: null });
      } 
        return res.status(201).json({ 
            status: 201,
            error: null,
            response: true });
    });
};
