const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


const teamMembers = [];

const initialPrompt = [
    {
        type: 'list',
        name: 'initialAdd',
        message: 'Add new role?',
        choices: ['Yes', 'No'],
    },
]

const generalQuestions = [
    {
        type: 'list',
        name: 'role',
        message: 'Job Role: ',
        choices: ['Manager','Engineer', 'Intern', 'None']
    }
];

const managerQuestion = [
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

const engineerQuestion = [
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

const internQuestion = [
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

function init(){

    function write(){
        fs.writeFile(outputPath, render(teamMembers), {}, (e) => {
            e ? console.log(e) : console.log('Render Success!');
        });
    };

    function askFirstQuestion(){
        inquirer
            .prompt(generalQuestions)
            .then((initialAnswer) => {
                if(initialAnswer.role === 'Manager'){
                    generateManager();
                } else if (initialAnswer.role === 'Engineer'){
                    generateEngineer();
                } else if (initialAnswer.role === 'Intern'){
                    generateIntern();
                } else {
                    write();
                }
            });
            };

    function generateManager(){
        inquirer
            .prompt(managerQuestion)
            .then(function(managerAnswer){
                
                const managerObj = new Manager (managerAnswer.name, managerAnswer.id, managerAnswer.email, managerAnswer.officeNumber);
                teamMembers.push(managerObj);
                
                console.log('Manager added!');
                console.log(teamMembers)
                askFirstQuestion(); 
            });
    };

    function generateEngineer(){
        inquirer
            .prompt(engineerQuestion)
            .then(function(engineerAnswer){

                const engineerObj = new Engineer (engineerAnswer.name, engineerAnswer.id, engineerAnswer.email, engineerAnswer.github);
                teamMembers.push(engineerObj);
                
                console.log('Engineer added!');
                console.log(teamMembers)
                askFirstQuestion(); 
            });
    };

    function generateIntern(){
        inquirer
            .prompt(internQuestion)
            .then(function(internAnswer){
                
                const internObj = new Intern (internAnswer.name, internAnswer.id, internAnswer.email, internAnswer.school);
                teamMembers.push(internObj);
                
                console.log('Intern added!');
                console.log(teamMembers)
                askFirstQuestion(); 
            });
    };

    askFirstQuestion();

};

init();







