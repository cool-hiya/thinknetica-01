'use strict';

/**
 * 
 * @param {Group} group 
 * @param {Date} date 
 */
function Lesson(group, date) {
    this.group = group;
    this.date = date;
    this._students = group.students;

    this._students.forEach(student => {
        student.hasLesson = true;
    });

    this.getAbsentStudents = function () {
        return this._students.filter(s => s.isAbsent());
    }

    this.getStudents = function () {
        return this._students.filter(s => !s.isAbsent());
    }

    this.getStudentsCount = function () {
        return this.getStudents().length;
    }
}


