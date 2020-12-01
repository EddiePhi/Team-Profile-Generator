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


// Activity from week 9 activity 28

// const util = require('util');

// const writeFileAsync = util.promisify(fs.writeFile);

// const promptUser = () =>

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
        type: 'input',
        name: 'name',
        message: 'Name: ',
    },
    {
        type: 'list',
        name: 'role',
        message: 'Job Role: ',
        choices: ['Manager', 'Engineer', 'Intern']
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
];

const managerQuestion = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Office #: ',
    },
];

const engineerQuestion = [
    {
        type: 'input',
        name: 'github',
        message: 'GitHub Username: ',
    },
];

const internQuestion = [
    {
        type: 'input',
        name: 'school',
        message: 'School: ',
    },
];

inquirer
    .prompt(initialPrompt)
    .then((initialAnswer) => {
        if(initialAnswer.initialAdd === 'Yes'){
            inquirer
                .prompt(generalQuestions)
                .then(function(generalAnswers){
                    if (generalAnswers.role === 'Manager'){
                        inquirer
                            .prompt(managerQuestion)
                            .then(function(managerAnswer){
                                generalAnswers.officeNumber = managerAnswer.officeNumber;
                                
                                const managerObj = new Manager (generalAnswers.name, generalAnswers.id, generalAnswers.email, generalAnswers.officeNumber);
                                teamMembers.push(managerObj);
                                
                                console.log('Manager added!');
                                console.log(teamMembers)
                                  
                                fs.writeFile('./output/team.html', render(teamMembers), {}, (e) => {
                                    e ? console.log(e) : console.log('Render Success!');
                                });
                            });
                    } else if (generalAnswers.role === 'Engineer'){
                        inquirer
                            .prompt(engineerQuestion)
                            .then(function(engineerAnswer){
                                generalAnswers.github = engineerAnswer.github;

                                const engineerObj = new Engineer (generalAnswers.name, generalAnswers.id, generalAnswers.email, generalAnswers.github);
                                teamMembers.push(engineerObj);
                                
                                console.log('Engineer added!');
                                console.log(teamMembers)
                                  
                                fs.writeFile('./output/team.html', render(teamMembers), {}, (e) => {
                                    e ? console.log(e) : console.log('Render Success!');
                                });
                            });
                    } else if (generalAnswers.role === 'Intern'){
                        inquirer
                            .prompt(internQuestion)
                            .then(function(internAnswer){
                                generalAnswers.school = internAnswer.school;
                                
                                const internObj = new Intern (generalAnswers.name, generalAnswers.id, generalAnswers.email, generalAnswers.school);
                                teamMembers.push(internObj);
                                
                                console.log('Intern added!');
                                console.log(teamMembers)
                                  
                                fs.writeFile('./output/team.html', render(teamMembers), {}, (e) => {
                                    e ? console.log(e) : console.log('Render Success!');
                                });
                            });
                    };
                });    
        } else {
            return console.log('Ending process.');
        };
    });






// -----------------------------------------
// May not be needed
// const generateHTML = (answers) =>
// `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//   <title>Document</title>
// </head>
// <body>
//   <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">${answers.name}</h1>
//     <p class="lead">${answers.jobRole}.</p>
//     <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//     <ul class="list-group">
//       <li class="list-group-item">${answers.id}</li>
//       <li class="list-group-item">${answers.email}</li>
//     </ul>
//   </div>
// </div>
// </body>
// </html>`;

// promptUser()
//   .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
//   .then(() => console.log('Successfully wrote to index.html'))
//   .catch((err) => console.error(err));
// -----------------------------------------







