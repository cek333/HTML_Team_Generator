const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const Employee = require("./lib/Employee");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const commonQuestions = [
  {
    name: 'name',
    message: 'Employee name:'
  },
  {
    name: 'email',
    message: 'Employee email:'
  }
]

const roleQuestions = [
  [
    // Manager questions
    {
      name: 'officeNumber',
      message: 'Enter office number:'
    }
  ],
  [
    // Intern questions
    {
      name: 'school',
      message: 'Enter school:'
    }
  ],
  [
    // Engineer questions
    {
      name: 'github',
      message: 'Enter Github:'
    }
  ]
]

const roleChoices = [
  {
    type: 'list',
    name: 'role',
    message: 'Choose employee role:',
    choices: [
      { name: 'Intern', value: 1 },
      { name: 'Engineer', value: 2 },
      { name: 'Exit', value: 3 }
    ]
  }
];

const roleNames = [ "Manager", "Intern", "Engineer"];

// Get Manager info
async function getTeamInfo() {
  console.log("Enter the Manager's Info:");
  let managerInfo = await inquirer.prompt([ ...commonQuestions, ...roleQuestions[0] ]);
  // console.log(managerInfo);
  // Enter team members
  while(1) {
    // Select Intern/Engineer/Exit
    let roleSel = await inquirer.prompt(roleChoices);
    if (roleSel.role == "3") break;
    console.log(`Enter the ${roleNames[roleSel.role]}'s Info:`);
    let info = await inquirer.prompt([ ...commonQuestions, ...roleQuestions[roleSel.role] ]);
    // console.log(info);
  }
}
getTeamInfo();
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
