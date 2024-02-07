const inquirer = require("inquirer");
const fs = require('fs');
const Department = require('../classes/department');
const Role = require('../classes/role');
const Employee = require('../classes/employee');

const questions = [{
    type: 'list',
    name: 'intro',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', new inquirer.Separator(), 'Exit', new inquirer.Separator()],
    loop: true
}, {
    type: 'input',
    name: 'addDepartment',
    message: 'What is the name of the new department?',
    when: (answer) => answer.intro == 'Add a department'
}, {
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the new role?',
    when: (answer) => answer.intro == 'Add a role'
}, {
    type: 'input',
    name: 'roleSalary',
    message: 'What is the salary for this new role?',
    when: (answer) => answer.intro == 'Add a role'
}, {
    type: 'input',
    name: 'roleDepartment',
    message: 'What department does this role report to?',
    when: (answer) => answer.intro == 'Add a role'
}, {
    type: 'input',
    name: 'empFirstName',
    message: 'Enter the employees first name.',
    when: (answer) => answer.intro == 'Add an employee'
}, {
    type: 'input',
    name: 'empLastName',
    message: 'Enter the employees last name.',
    when: (answer) => answer.intro == 'Add an employee'
}, {
    type: 'list',
    name: 'empRole',
    message: 'Select a role for the new employee.',
    choices: 'test',
    when: (answer) => answer.intro == 'Add an employee'
}, {
    type: 'list',
    name: 'empList',
    message: 'Select the employee you would like to update.',
    choices: 'test',
    when: (answer) => answer.intro == 'Add an employee'
}, {
    type: 'list',
    name: 'newEmpRole',
    message: 'Select the new role for the employee.',
    choices: 'test',
    when: (answer) => answer.intro == 'Add an employee'
}];

module.exports = questions;