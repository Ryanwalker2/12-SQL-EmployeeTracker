const inquirer = require('inquirer');
const { intro, addDepartment, addRole, addEmployee, updateEmployee } = require('./db/questions/questions');
const db = require('./server');
const fs = require('fs');

function init() {
inquirer
   .prompt(intro).then((answers) => {
        switch (answers) {
            case 'View all departments':
                    db.query('SELECT * FROM department ORDER BY id;');
                break;
                case 'View all roles':
                    db.query('SELECT * FROM role ORDER BY id;');
                break;
                case 'View all employees':
                    db.query('SELECT * FROM employee ORDER BY id;');
                break;
                case 'Add a department':
                    inquirer.prompt(addDepartment).then();
                break;
                case 'Add a role':
                    inquirer.prompt(addRole).then();
                break;
                case 'Add an employee':
                    inquirer.prompt(addEmployee).then();
                break;
                case 'Update an employees role':
                    inquirer.prompt(updateEmployee).then();
                break;
        }
    })
    .catch((error) => {
        console.log(error);
    });
};

init();