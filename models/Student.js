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
    },
    UpdateStudent:function(id, student, callback) {
        return db.query("UPDATE students SET name=?, email=?, phone=? WHERE id=?", [student.name, student.email, student.phone, id], callback);
    },
    deleteStudent:function(id, callback) {
        return db.query("DELETE FROM students WHERE id=?", [id], callback);
    }
}

module.exports = Student;