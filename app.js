    const mysql = require ("mysql");
    const inquirer = require ("inquirer");

    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "employee_db"
    })

    connection.connect(function(err){
        if (err) throw err;
        console.log("connection open");
    firstPrompt()
    
    })

    function firstPrompt(){
        inquirer.prompt({
            type: "list",
            name: "task",
            message : "what would you like to do?",
            choices : [
                "View employees",
                "View departements",
                "View roles",
            
                "Exit"
            ]

        }).then(function(response ){

            console.log(response)
            if(response.task ==  "View employees"){

                viewemployees()

            }if(response.task== "View departements"){
               
                viewDepartements()

            }else  if(response.task== "View roles"){

                viewroles()

            }else if(response.task== "Exit") {
                connection.end() ;
            }

        })
    }

    function viewDepartements(){
        console.log("fonctions to display departements")
        let q = "SELECT* FROM departement"
        connection.query(q,function(err,rep){
            if(err) throw err
            console.log('-----List of departements-----')
            console.table(rep)
        })

        firstPrompt()
    }

    function viewemployees(){
        console.log("fonctions to display employees")
        let q = "SELECT* FROM employee"
        connection.query(q,function(err,rep){
            if(err) throw err
            console.log('-----List of employees-----')
            console.table(rep)
        })

        firstPrompt()
    }


    function viewroles(){
        console.log("fonctions to display roles")
        let q = "SELECT* FROM role"
        connection.query(q,function(err,rep){
            if(err) throw err
            console.log('-----List of roles-----')
            console.table(rep)
        })

        firstPrompt()
    }


    function viewEmployee(){
        inquirer.prompt({
            name: "viewEmployee",
            type: "input",
            message: "Which employee would you like to search for?"
        }).then(function(response){

            console.log(response)
            if(response.task == "viewEmployee"){
                viewEmployee()
            }
        })

    }

    function ViewManager(){

    }
