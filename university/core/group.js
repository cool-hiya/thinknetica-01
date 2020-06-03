'use strict';

/**
 * 
 * @param {string} groupId 
 */

function Group(groupId) {
    this.groupId = groupId;
    this.students = [];

    /**
     * @param {Student} student
     */
    this.addStudent = function (student) {
        this.students.push(student);
    }

    this.getAbsentStudents = function () {
        return this.students.filter(s => s.isAbsent());
    }

    this.getSickStudents = function () {
        return this.students.filter(s => !s.isHealthy());
    }
}
