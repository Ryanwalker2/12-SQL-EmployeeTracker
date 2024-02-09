const db = require('../server');
const { addRole, addEmployee, addDepartment, updateEmployee } = require('./questions/questions.js');
const inquirer = require('inquirer');

const GetAllDepartments = 'SELECT * FROM department;';

const GetAllRoles = 'SELECT * FROM role;';

const GetAllEmployees = 'SELECT * FROM employee;';

async function AddDepartment(name) {
    return new Promise((resolve, reject) => {
        console.log(name);
        db.query(`INSERT INTO department (name) VALUES ('${name}');`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function AddRole(title, salary, department_id) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id});`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function AddEmployee(first_name, last_name, role_id) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, 0);`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function UpdateEmployee() {
    let employees = await db.promise().query(GetAllEmployees);
    let roles = await db.promise().query(GetAllRoles);
    try{
        inquirer.prompt(updateEmployee(employees, roles)).then((answers) => {
    const { empList, newEmpRole } = answers;
    let query = `INSERT INTO role (title, salary, department_id) VALUES ("${empList}", "${newEmpRole}");`;

    console.log(query);

    db.query(query, function (err, results) {
        console.log('Employee added successfully!');
    });
});
} catch (error) {
    console.log(error);
}
};

module.exports = { GetAllDepartments, GetAllRoles, GetAllEmployees, AddDepartment, AddRole, AddEmployee, UpdateEmployee };