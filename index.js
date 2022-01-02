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
                viewAllDepartments();
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
function viewAllDepartments() {
    const sql = `
    SELECT * FROM departments;
    `;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(`
    =========================================
    You're viewing CURRENT DEPARTMENTS TABLE
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
        You're viewing CURRENT ROLES TABLE
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
      You're viewing CURRENT EMPLOYEES TABLE
    =========================================
    `);
        console.table(rows);
        continueOrExit();
    });
};

// To add a department
function addADepartment() {

    const sql = `SELECT * FROM departments;`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table('List of current Departments Table:', rows);
        
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
            }
        )
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
        viewAllDepartments();
            });
        })
    });
};

// To add a role
function addARole() {
    // Display current Roles Table for users to refet to:
    sqlCurrentRoles = `SELECT roles.*, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`;
        db.query(sqlCurrentRoles, (err, rows) => {
        if(err) throw err;
        console.table('List of current Roles Table:', rows);
    });

    // to display the current departments table so user can refer to the current department IDs
    sqlCurrentDept = `SELECT * FROM departments`;
    db.query(sqlCurrentDept, (err, rows) => {
        if(err) throw err;
        console.table('List of current Departments Table:', rows);

        // to prompt user to input new role info
        inquirer
        .prompt ([
            {
                type: "input",
                name: "newTitle",
                message: "What is the new role TITLE?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the new role title!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newSalary",
                message: "What is this new role SALARY?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the new role SALARY!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newDeptId",
                message: "What is this new role's DEPARTMENT ID?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the new role DEPARTMENT ID!');
                        return false;
                    }
                }
            }
        ])
        .then (function(data) {
            const newRoleTitle = data.newTitle;
            const newRoleSalary = data.newSalary;
            const newRoleDeptId = data.newDeptId;

            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [newRoleTitle, newRoleSalary, newRoleDeptId];
            
            // to add new role info to db
            db.query(sql, params, (err, rows) => {
                if (err) throw err;
                console.log(`
        =========================================
            Successfully added new role
        named ${newRoleTitle} to the database!
        =========================================
            `);

            // call role function to display the new and current database of Roles Table
            viewAllRoles();
            });
        })
    })
};

// To add an employee
function addAnEmployee() {

    // Display current Employees Table for users to refet to:
    sqlCurrentEmp = `SELECT employees.*, roles.title AS role_title, 
    roles.salary, department_id, departments.name AS department_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id;`;
    db.query(sqlCurrentEmp, (err, rows) => {
        if(err) throw err;
        console.table('List of current Employees Table:', rows);
    });

    // to display the current roles table so user can refer to the current role IDs
    sqlCurrentRoles = `SELECT roles.*, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`;
    db.query(sqlCurrentRoles, (err, rows) => {
        if(err) throw err;
        console.table('List of current Roles Table:', rows);

        // to prompt user to input new role info
        inquirer
        .prompt ([
            {
                type: "input",
                name: "newFN",
                message: "What is the new Employee's First Name?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the new Employee\'s First Name!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newLN",
                message: "What is the new Employee's Last Name?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the new Employee\'s Last Name!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newRoleId",
                message: "What is this new Empoyee's Role ID?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the new new Empoyee\'s Role ID!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newManagerId",
                message: "Who is the Manager for this new employee (enter the Manager ID)?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter  the Manager ID!');
                        return false;
                    }
                }
            }
        ])
        .then (function(data) {
            const newFN = data.newFN;
            const newLN = data.newLN;
            const newRoleId = data.newRoleId;
            const newManagerId = data.newManagerId;

            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            const params = [newFN, newLN, newRoleId, newManagerId];
            
            // to add new role info to db
            db.query(sql, params, (err, rows) => {
                if (err) throw err;
                console.log(`
        =========================================
            Successfully added new employee
        named ${newFN} ${newLN} to the database!
        =========================================
            `);

            // call role function to display the new and current database of Roles Table
            viewAllEmployees();
            });
        })
    })
};

// To update an employee role
function updateAnEmployeeRole() {
    // Display current Employees Table for users to refer to:
    sqlCurrentEmp = `SELECT employees.*, roles.title AS role_title, 
    roles.salary, department_id, departments.name AS department_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id;`;
    db.query(sqlCurrentEmp, (err, rows) => {
        if(err) throw err;
        console.table('List of current Employees Table:', rows);
    });

    // to display the current roles table so user can refer to the current role IDs
    sqlCurrentRoles = `SELECT roles.*, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`;
    db.query(sqlCurrentRoles, (err, rows) => {
        if(err) throw err;
        console.table('List of current Roles Table:', rows);

        // to prompt user to input new role info
        inquirer
        .prompt ([
            {
                type: "input",
                name: "empId",
                message: "Which employee needs to be updated?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the Employee ID!');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "newRoleId",
                message: "What is the employee's New Role ID?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter the employee\'s New Role ID!');
                        return false;
                    }
                }
            },
        ])
        .then (function(data) {
            const empId = data.empId;
            const newRoleId = data.newRoleId;

            const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
            const params = [newRoleId, empId];
            
            // to add new role info to db
            db.query(sql, params, (err, rows) => {
                if (err) throw err;
                console.log(`
        =========================================
            Successfully updated new role ID ${newRoleId} 
            for Employee ${empId} to the database!
        =========================================
            `);

            // call role function to display the new and current database of Roles Table
            viewAllEmployees();
            });
        })
    })
};


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