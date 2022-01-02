const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


function runEmpTracker() {
    console.log (
    `
    =========================================
    |                                       |
    |            You're Accessing           |
    |            EMPLOYEE TRACKER           |
    |                                       |
    =========================================
    `
    )
    inquirer
    .prompt ({
        type: "list",
        name: "navigation",
        message: "What do you need to do?",
        choices: 
            [
                'View All Deparments', 
                'View All Roles', 
                'View All Employees', 
                'Add A Department', 
                'Add A Role', 
                'Add An Employee', 
                'Update An Employee Role', 
                'Exit Employee Tracker'
            ]
    })
    .then (function(selection) {
        //switch case for appropriate selection function
        switch (selection.navigation) {
            case 'View All Deparments':
                viewAllDeparments();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;

            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'Add A Department':
                addADepartment();
                break;

            case 'Add A Role':
                addARole();
                break;

            case 'Add An Employee':
                addAnEmployee();
                break;

            case 'Update An Employee Role':
                updateAnEmployeeRole();
                break;

            case 'Exit Employee Tracker':
                exitEmployeeTracker();
                break;
        }
    })
};

// To view Departments Table
function viewAllDeparments() {
    const sql = `
    SELECT * FROM departments;
    `;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`
    =========================================
         You're viewing DEPARTMENTS TABLE
    =========================================
    `);
        console.table(rows);
        continueOrExit();
    })
};

// To view Roles Table
function viewAllRoles() {
    const sql = `
    SELECT roles.*, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;
    `;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`
    =========================================
            You're viewing ROLES TABLE
    =========================================
    `);
        console.table(rows);
        continueOrExit();
    });
};

// To view Employees Table
function viewAllEmployees() {
    const sql = `
    SELECT employees.*, roles.title AS role_title, 
    roles.salary, department_id, departments.name AS department_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id;
    `;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`
    =========================================
          You're viewing EMPLOYEES TABLE
    =========================================
    `);
        console.table(rows);
        continueOrExit();
    });
};

// To add a department
function addADepartment() {
    inquirer
    .prompt (
        {
        type: "input",
        name: "newDept",
        message: "What is the name of NEW DEPARTMENT?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ('Please enter the NEW DEPARTMENT name!');
                return false;
            }
        }
    })
    .then (function(data) {
        const newDepartment = data.newDept;
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [newDepartment];
        
        // to add new department name to db
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log(`
    =========================================
        Successfully added new department
     named ${newDepartment} to the database!
    =========================================
        `);

        // call department function to display the new database of Departments Table
        viewAllDeparments();
        });
    })
};

// To add a role
function addARole() {

};

// To add an employee
function addAnEmployee() {

};

// to update an employee role
// function updateAnEmployeeRole() {
//     const sql = `UPDATE voters SET email = ? WHERE id = ?`;
//     const params = [req.body.email, req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Voter not found'
//         });
//       } else {
//         res.json({
//           message: 'success',
//           data: req.body,
//           changes: result.affectedRows
//         });
//       }
//     });
//};


// Exit tracker and end connection
function exitEmployeeTracker() {
    console.log (
    `
    =========================================
       Successfully Exit Employee Tracker!
       RUN 'node index.js' to start again!
    =========================================
    `
    )
    db.end();
    return;
};

// To continue or exit the Employee Tracker app
function continueOrExit() {
    inquirer
    .prompt ({
        type: "list",
        name: "contOrExit",
        message: "What do you want to do next?",
        choices: 
            [
                'Continue With Employee Tracker', 
                'Exit Employee Tracker'
            ]
    })
    .then (function(selection) {
    
        //switch case for appropriate selection function
        switch (selection.contOrExit) {
            case 'Continue With Employee Tracker':
                runEmpTracker();
                break;

            case 'Exit Employee Tracker':
                exitEmployeeTracker();
                break;
        }
    })
};

// fxn call to start the Employee Tracker
runEmpTracker();