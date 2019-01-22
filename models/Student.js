var db=require('../db');

var Student = {
    getAllStudent:function(callback) {
        return db.query("select * from students limit 10", callback);
    },
    getStudentById:function(id, callback) {
        return db.query("select * from students where id=?",[id], callback);
    },
    createStudent:function(newStudent, callback) {
        return db.query("INSERT INTO students (name, email, phone) VALUES(?,?,?)", [newStudent.name, newStudent.email, newStudent.phone], callback);
    }
}

module.exports = Student;