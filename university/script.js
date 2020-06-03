'use strict';

const ivan = new Student('Ivanov Ivan Ivanovich');

console.log('Created student', ivan);
console.log('Student fullname', ivan.getFullName());
console.log('Student initials', ivan.getInitials());
console.log('Student health', ivan.isHealthy());

const petr = new Student('Smirnov Petr Dimovich');
console.log('Created student', petr);

petr.getSick();
console.log('Student gets sick', petr);

const masha = new Student('Smirnova Maria Petrovna');
console.log('Created student', masha);

masha.skipLesson();
console.log('Student skips lesson', masha);

const groupA = new Group('A');

console.log('Created group', groupA);

groupA.addStudent(petr);
groupA.addStudent(masha);
groupA.addStudent(ivan);

console.log('Added students', groupA);
console.log('Absent students', groupA.getAbsentStudents());
console.log('Sick students', groupA.getSickStudents());

Petr.skipLesson();
console.log('Absent students', groupA.getAbsentStudents());