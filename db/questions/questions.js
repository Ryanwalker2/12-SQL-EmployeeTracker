const inquirer = require("inquirer");
const fs = require('fs');
const Department = require('../classes/department');
const Role = require('../classes/role');
const Employee = require('../classes/employee');

const intro = [{
    type: 'list',
    name: 'intro',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employees role', new inquirer.Separator(), 'Exit', new inquirer.Separator()],
}];

const addDepartment = [{
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the new department?',
}];

const addRole = [{
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the new role?',
} , {
    type: 'input',
    name: 'roleSalary',
    message: 'What is the salary for this new role?',
}, {
    type: 'input',
    name: 'roleDepartment',
    message: 'What department does this role report to?',
}];

const addEmployee = [{
    type: 'input',
    name: 'empFirstName',
    message: 'Enter the employees first name.',
}, {
    type: 'input',
    name: 'empLastName',
    message: 'Enter the employees last name.'
}, {
    type: 'list',
    name: 'empRole',
    message: 'Select a role for the new employee.',
    choices: 'test'
}];

const updateEmployee = [{
    type: 'list',
    name: 'empList',
    message: 'Select the employee you would like to update.',
    choices: 'test',
}, {
    type: 'list',
    name: 'newEmpRole',
    message: 'Select the new role for the employee.',
    choices: 'test',
}];

module.exports = { intro, addDepartment, addRole, addEmployee, updateEmployee };