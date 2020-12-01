const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to contain employee objects
const teamMembers = [];

// Initial questions for initial prompt upon CLI application start
const initialQuestion = [
    {
        type: 'list',
        name: 'add',
        message: 'Add new role?',
        choices: ['Yes', 'No'],
    }
]

// Secondary question following initial questions if user selects "Yes"
const generalQuestion = [
    {
        type: 'list',
        name: 'role',
        message: 'Job Role: ',
        choices: ['Manager','Engineer', 'Intern', 'None']
    }
];

// Questions following secondary question if user selects "Manager"
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Name: ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email Address: ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Office #: ',
    },
];

// Questions following secondary question if user selects "Engineer"
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Name: ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email Address: ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
    },
    {
        type: 'input',
        name: 'github',
        message: 'GitHub Username: ',
    },
];

// Questions following secondary question if user selects "Intern"
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Name: ',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email Address: ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID: ',
    },
    {
        type: 'input',
        name: 'school',
        message: 'School: ',
    },
];

// Container function to initiate when CLI app is called.
function init(){

    // function to write rendered info for teamMembers array to outputPath location defined above.
    function write(){
        fs.writeFile(outputPath, render(teamMembers), {}, (e) => {
            e ? console.log(e) : console.log('Render Success!');
        });
    };

    // function to prompt initial question
    function askInitialQuestion(){
        inquirer
            .prompt(initialQuestion)
            .then((initialAnswer) => {
                if(initialAnswer.add === "Yes"){
                    askGeneralQuestion();
                } else {
                    write();
                    console.log('Process Ended.')
                }
            })
    };

    // function to prompt secondary question
    function askGeneralQuestion(){
        inquirer
            .prompt(generalQuestion)
            .then((generalAnswer) => {
                if(generalAnswer.role === 'Manager'){
                    generateManager();
                } else if (generalAnswer.role === 'Engineer'){
                    generateEngineer();
                } else if (generalAnswer.role === 'Intern'){
                    generateIntern();
                } else {
                    write();
                }
            });
            };

    // function to prompt manager questions and push object to teamMembers array
    function generateManager(){
        inquirer
            .prompt(managerQuestions)
            .then(function(managerAnswers){
                
                const managerObj = new Manager (managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
                teamMembers.push(managerObj);
                
                console.log('Manager added!');
                console.log(teamMembers)
                askInitialQuestion(); 
            });
    };

    // function to prompt engineer questions and push object to teamMembers array
    function generateEngineer(){
        inquirer
            .prompt(engineerQuestions)
            .then(function(engineerAnswers){

                const engineerObj = new Engineer (engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
                teamMembers.push(engineerObj);
                
                console.log('Engineer added!');
                console.log(teamMembers)
                askInitialQuestion(); 
            });
    };

    // function to prompt intern questions and push object to teamMembers array
    function generateIntern(){
        inquirer
            .prompt(internQuestions)
            .then(function(internAnswers){
                
                const internObj = new Intern (internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
                teamMembers.push(internObj);
                
                console.log('Intern added!');
                console.log(teamMembers)
                askInitialQuestion(); 
            });
    };

    // initiate initial question prompt
    askInitialQuestion();

};

// initial container function
init();







