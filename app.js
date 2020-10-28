const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// create output directory if it doesn't exist
fs.access(OUTPUT_DIR, fs.constants.F_OK, err => {
  if (err) {
    fs.mkdir(OUTPUT_DIR, (err) => {
      if (err) {
        console.log(`Error: Unable to create output directory: ${OUTPUT_DIR}\nExiting ...`);
        process.exit(1);
      }
    });
  }
});

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

let employees = [];
let eIdCnt = 100;

// Get Manager info
async function getTeamInfoAndGenHTML() {
  let name, id, email, school, officeNumber, github;
  console.log("Enter the Manager's Info:");
  let managerInfo = await inquirer.prompt([ ...commonQuestions, ...roleQuestions[0] ]);
  // console.log(managerInfo);
  ({name, email, officeNumber} = managerInfo);
  employees.push(new Manager(name, eIdCnt++, email, officeNumber));
  // Enter team members
  while(1) {
    // Select Intern/Engineer/Exit
    let roleSel = await inquirer.prompt(roleChoices);
    if (roleSel.role == "3") break;
    console.log(`Enter the ${roleNames[roleSel.role]}'s Info:`);
    let info = await inquirer.prompt([ ...commonQuestions, ...roleQuestions[roleSel.role] ]);
    // console.log(info);
    switch(roleSel.role) {
      case 1:
        ({name, email, school} = info);
        employees.push(new Intern(name, eIdCnt++, email, school));
        break;
      case 2:
        ({name, email, github} = info);
        employees.push(new Engineer(name, eIdCnt++, email, github));
        break;
    }
  }
  // gen html
  const html = render(employees);
  // write out html
  fs.writeFile(outputPath, html, (err) => {
    if (err) {
      console.log(`Error: Unable to generate output html file.\nExiting ...`);
      process.exit(1);
    }
    console.log(`${outputPath} has been generated!`);
  });
}
getTeamInfoAndGenHTML();
