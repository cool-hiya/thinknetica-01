'use strict';

const Ivan = new Student('Ivanov Ivan Ivanovich');

console.log('Created student', Ivan);
console.log('Student fullname', Ivan.getFullName());
console.log('Student initials', Ivan.getInitials());
console.log('Student health', Ivan.isHealthy());

const Petr = new Student('Smirnov Petr Dimovich');
console.log('Created student', Petr);

Petr.getSick();
console.log('Student gets sick', Petr);

const Masha = new Student('Smirnova Maria Petrovna');
console.log('Created student', Masha);

Masha.skipLesson();
console.log('Student skips lesson', Masha);

const groupA = new Group('A');

console.log('Created group', groupA);

groupA.addStudent(Petr);
groupA.addStudent(Masha);
groupA.addStudent(Ivan);

console.log('Added students', groupA);
console.log('Absent students', groupA.getAbsentStudents());
console.log('Sick students', groupA.getSickStudents());

Petr.skipLesson();
console.log('Absent students', groupA.getAbsentStudents());