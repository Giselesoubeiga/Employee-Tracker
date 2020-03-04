  const mysql = require("mysql");
  const inquirer = require("inquirer");
  const CFonts = require('cfonts');
  
  CFonts.say('Employee|Manager!', {
      font: 'block',              // define the font face
      align: 'left',              // define text alignment
      colors: ['green'],         // define all colors
      background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1,           // define letter spacing
      lineHeight: 1,              // define the line height
      space: true,                // define if the output text should have empty lines on top and on the bottom
      maxLength: '0',             // define how many character can be on one line
      gradient: false,            // define your two gradient colors
      independentGradient: false, // define if you want to recalculate the gradient for each new line
      transitionGradient: false,  // define if this is a transition between colors directly
      env: 'node'                 // define the environment CFonts is being executed in
  });


  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connection open");
    firstPrompt();
  });

  function firstPrompt() {
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "what would you like to do?",
        choices: [
          "View employees",
          "View departments",
          "View roles",
          "Add department",
          "Add role",
          "Add employee",
          "Delete employee",
          "Exit"
        ]
      })
      .then(function(response) {
        console.log(response);
        if (response.task == "View employees") {
          ViewEmployees();
        }else if (response.task == "View departments") {
          ViewDepartments();
        } else if (response.task == "View roles") {
          ViewRoles();
        } else if (response.task == "Exit") {
          Exit();
        } else if (response.task == "Add department") {
          AddDepartment();
        } else if (response.task == "Add role") {
        AddRole();
        } else if (response.task == "Add employee") {
          //  addemployees();
          AddEmployeeTwo();
        } else if (response.task == "Delete employee") {
          // addemployees();
          DeleteEmployee();
        }
      });
  }

  function Exit(){
    console.log("About to exit.");
    process.exit(0);
    connection.end();
  }

  function ViewDepartments() {
    console.log("fonctions to display departements");
    let q = "SELECT* FROM departement";
    connection.query(q, function(err, rep) {
      if (err) throw err;
      // console.log("-----List of departements-----");
      console.log("\n");
      console.table(rep);
    });

    firstPrompt();
  }

  function ViewEmployees() {
    console.log("fonctions to display employees");
    let q =`SELECT
                EM.id,
                EM.first_name,
                EM.last_name,
                EM.manager_id,
                R.title Role,
                CONCAT(EM.last_name, " ", EM.first_name) AS ManagerName
            FROM
                employee AS EM
            LEFT JOIN role AS R
            ON
            R.id = EM.role_id
    `;
    connection.query(q, function(err, rep) {
      if (err) throw err;
      // console.log("-----List of employees-----");
      console.log("\n");
      console.table(rep);
    });

    firstPrompt();
  }

  function ViewRoles() {
    console.log("fonctions to display roles");
    let q = "SELECT* FROM role";
    connection.query(q, function(err, rep) {
      if (err) throw err;
      // console.log("-----List of roles-----");
      console.log("\n");
      console.table(rep);
    });

    firstPrompt();
  }

  function ViewManager() {}

  function AddDepartment() {
    inquirer
      .prompt({
        type: "input",
        name: "name",
        message: "Enter the departement"
      })
      .then(function(response) {
        var q = "INSERT INTO departement SET ?";
        console.log(response.name);

        connection.query(q, { name: response.name }, function(err, res) {
          if (err) throw err;
          ViewDepartments();
          console.log("Insertion of departement");
          firstPrompt();
        });
      });
  }
  //title, salary, departement_id
  function AddRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter role"
        },
        {
          type: "number",
          name: "salary",
          message: "Enter role salary"
        },
        {
          type: "number",
          name: "departement_id",
          message: "Enter role departement_id"
        }
      ])
      .then(function(response) {
        var q = "INSERT INTO role SET ?";
        connection.query(
          q,
          {
            title: response.title,
            salary: response.salary,
            departement_id: response.departement_id
          },
          function(err, res) {
            if (err) throw err;
            ViewRoles();
            console.log("Insert role");
            firstPrompt();
          }
        );
      });
  }
  // first_name, last_name, role_id, manage_id
  function AddEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter employee first name"
        },

        {
          type: "input",
          name: "last_name",
          message: "Enter employee Last name"
        },

        {
          type: "number",
          name: "role_id",
          message: "Enter employee role_id"
        },

        {
          type: "number",
          name: "manager_id",
          message: "Enter manager_id"
        }
      ])
      .then(function(response) {
        var q = "INSERT INTO employee SET ?";
        connection.query(
          q,
          {
            first_name: response.first_name,
            last_name: response.last_name,
            role_id: response.role_id,
            manager_id: response.manager_id
          },
          function(err, res) {
            if (err) throw err;
            ViewEmployees();
            console.log("Insert employee");
            firstPrompt();
          }
        );
      });
  }
  function AddEmployeeTwo(){
    console.log("insertation employee")
    var q = `SELECT * FROM role`;
    connection.query(q, function(err, res){
      if(err)throw err;
      const roleChoice = res.map(function(result){
        return result.id 
      });
      // console.log(roleChoice)
      promptInsertEmployee(roleChoice)
    })
  }
  function promptInsertEmployee(roleChoice){
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter employee first name"
        },

        {
          type: "input",
          name: "last_name",
          message: "Enter employee Last name"
        },

        {
          type: "list",
          name: "role_id",
          message: "Enter employee role_id",
          choices: roleChoice
        },

        {
          type: "number",
          name: "manager_id",
          message: "Enter manager_id"
        }
      ])
      .then(function(response) {
        var q = "INSERT INTO employee SET ?";
        connection.query(
          q,
          {
            first_name: response.first_name,
            last_name: response.last_name,
            role_id: response.role_id,
            manager_id: response.manager_id
          },
          function(err, res) {
            if (err) throw err;
            ViewEmployees();
            console.log("Insert employee");
            firstPrompt();
          }
        );
      });
  }
  function DeleteEmployee() {    
    console.log("Deleting an employee");
    var query =
      `SELECT e.id, e.first_name, e.last_name
        FROM employee e`

    connection.query(query, function (err, res) {
      if (err) throw err;

      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, title: `${id} ${first_name} ${last_name}`
      }));
      console.table(res);
      console.log("ArrayToDelete!\n");
      promptDelete(deleteEmployeeChoices);
    });
  }
  // User choose the employee list, then employee is deleted
  function promptDelete(deleteEmployeeChoices) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {

        var query = `DELETE FROM employee WHERE ?`;
      
        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Deleted!\n");

          firstPrompt();
        });
        // console.log(query.sql);
      });
  }
  