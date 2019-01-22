var express = require('express');
var router = express.Router();
var Student = require('../models/Student');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  Student.getAllStudent(function(error, results) {
    if(error) {
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
    }      
  });
});



/* GET users listing. */
router.get('/:id', checkStudent, function(req, res) {
  //  res.send('respond with a resource '+ req.params.id);
  var id = req.params.id;
  Student.getStudentById(id, function(error, results) {
    if(error) {
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results})); 
    }      
  });
});

function checkStudent(req, res, next) {
  // We access the ID param on the request object
  var id = req.params.id;
  // console.log('id');
  // Build an SQL query to select the resource object by ID
  // var sql = 'SELECT * FROM photo WHERE id = ?';
  // postgres.client.query(sql, [ photoId ], function(err, results) {
  //   if (err) {
  //     console.error(err);
  //     res.statusCode = 500;
  //     return res.json({ errors: ['Could not retrieve photo'] });
  //   }
  //   // No results returned mean the object is not found
  //   if (results.rows.length === 0) {
  //     // We are able to set the HTTP status code on the res object
  //     res.statusCode = 404;
  //     return res.json({ errors: ['Photo not found'] });
  //   }
  //   // By attaching a Photo property to the request
  //   // Its data is now made available in our handler function
  //   req.photo = results.rows[0];
    next();
  // });
}
module.exports = router;
