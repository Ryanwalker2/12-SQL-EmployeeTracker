const inquirer = require('inquirer');
const questions = require('../db/questions/questions');

inquirer
    .prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
    });
