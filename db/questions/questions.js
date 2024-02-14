const inquirer = require("inquirer");
const fs = require('fs');
const Department = require('../classes/department');
const Role = require('../classes/role');
const Employee = require('../classes/employee');
const db = require('../../server');


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

const addRole = function (choices) { 
const addRole = [{
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the new role?',
} , {
    type: 'input',
    name: 'roleSalary',
    message: 'What is the salary for this new role?',
}, {
    type: 'list',
    name: 'roleDepartment',
    message: 'What department does this role report to?',
    choices: choices,
    filter(answer) {
        for (let choice of choices) {
            if (choice.name.includes(answer)) {
                return choice.id;
            }
        }
    }
}];
    return addRole;
};

const addEmployee = function (roles, employees) {
    const newRoles = [];
    const newEmployees = [];
    for (let role of roles) {
        const newRole = {
            id: role.id,
            name: role.title,
            salary: role.salary,
            department_id: role.department_id
        } 
        newRoles.push(newRole);
    };
    for (let employee of employees) {
        const newEmp = {
            id: employee.id,
            name: `${employee.first_name} ${employee.last_name}`,
            role_id: employee.role_id,
            manager_id: employee.manager_id
        }
        newEmployees.push(newEmp);
    }
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
    choices: newRoles,
    filter(answer) {
        for(let role of newRoles) {
            if (role.name.includes(answer)) {
                return role.id;
            }
        }
    }
}, {
    type: 'list',
    name: 'empManager',
    message: 'Who will this employee report to?',
    choices: [newEmployees, 'null'],
    filter(answer) {
        for (let employee of newEmployees) {
            if (employee.name.includes(answer)) {
                return employee.id;
            }
        }
    }
}];
    return addEmployee;
};

const updateEmployee = function (employees, roles) {
    const newEmpList = [];
    const newRoles = [];
    for (let role of roles) {
        const newRole = {
            id: role.id,
            name: role.title,
            salary: role.salary,
            department_id: role.department_id
        } 
        newRoles.push(newRole);
    };
    for (let employee of employees) {
        const newEmp = {
            id: employee.id,
            name: `${employee.first_name} ${employee.last_name}`,
            role_id: employee.role_id,
            manager_id: employee.manager_id
        }
        newEmpList.push(newEmp);
    };
    const newEmployee = [{
    type: 'list',
    name: 'empList',
    message: 'Select the employee you would like to update.',
    choices: newEmpList,
    filter(answer) {
        for (let employee of newEmpList) {
            if (employee.name.includes(answer)) {
                return employee.id;
            }
        }
    }
}, {
    type: 'list',
    name: 'newEmpRole',
    message: 'Select the new role for the employee.',
    choices: newRoles,
    filter(answer) {
        for (let role of newRoles) {
            if (role.name.includes(answer)) {
                return role.id;
            }
        }
    }
}];
return newEmployee;
};

const exit = [{
    type: 'confirm',
    name: 'exit',
    message: 'Would you like to do anything else?',
    default: false
}];

module.exports = { intro, addDepartment, addRole, addEmployee, updateEmployee, exit };