const inquirer = require('inquirer');
const db = require('./server.js');
const fs = require('fs');
const { intro, updateEmployee, addDepartment, addRole, addEmployee } = require('./db/questions/questions');
const { GetAllDepartments, GetAllRoles, GetAllEmployees, AddDepartment, AddRole, AddEmployee, UpdateEmployee } = require('./db/queries.js');

async function init() {
    let exitFlag = false;
    while (!exitFlag) {
        try {
            const answers = await inquirer.prompt(intro);
            switch (answers.intro) {
                case 'View all departments':
                    const departments = await new Promise((resolve, reject) => {
                        db.query(GetAllDepartments, (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    console.table(departments);
                    break;
                case 'View all roles':
                    const roles = await new Promise((resolve, reject) => {
                        db.query(GetAllRoles, (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    console.table(roles);
                    break;
                case 'View all employees':
                    const employees = await new Promise((resolve, reject) => {
                        db.query(GetAllEmployees, (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    console.table(employees);
                    break;
                case 'Add a department':
                    const departmentAnswers = await inquirer.prompt(addDepartment);
                    await AddDepartment(departmentAnswers.addDepartment);
                    console.log('Department added successfully.');
                    break;
                case 'Add a role':
                    const getDepartments = await new Promise((resolve, reject) => {
                        db.query('SELECT * FROM department;', (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    const roleAnswers = await inquirer.prompt(addRole(getDepartments));
                    const { roleName, roleSalary, roleDepartment } = roleAnswers;
                    await AddRole(roleName, roleSalary, roleDepartment);
                    console.log('Role added successfully.');
                    break;
                case 'Add an employee':
                    const getRoles = await new Promise((resolve, reject) => {
                        db.query('SELECT * FROM role;', (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    }); 
                    const getEmployees = await new Promise((resolve, reject) => {
                        db.query('SELECT * FROM employee;', (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    const employeeAnswers = await inquirer.prompt(addEmployee(getRoles, getEmployees));
                    const { empFirstName, empLastName, empRole, empManager } = employeeAnswers;
                    await AddEmployee(empFirstName, empLastName, empRole, empManager);
                    console.log('Role added successfully.');
                    break;
                case 'Update an employees role':
                    const getRoles2 = await new Promise((resolve, reject) => {
                        db.query('SELECT * FROM role;', (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    const getEmployees2 = await new Promise((resolve, reject) => {
                        db.query('SELECT * FROM employee;', (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                    const employeeInfo = await inquirer.prompt(updateEmployee(getEmployees2, getRoles2));
                    const {empList, newEmpRole} = employeeInfo;
                    console.log(empList, newEmpRole);
                    await UpdateEmployee(empList, newEmpRole);
                    console.log('Employee Role updated successfully.');
                    break;
                case 'Exit':
                    console.log('Exiting application. Have a good day!');
                    exitFlag = true;
                    process.exit();
                default:
                    console.log('Invalid choice. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
    }
}


db;
init();