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
                    
                    "Add departements",
                    "Add roles",
                    "Add employees",
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
                    
                }else if (response.task== "Add departements"){

                    addepartements()

                }else if (response.task== "Add roles"){

                    addroles()

                }else if (response.task== "Add employees"){
                    addemployees()
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

        function addepartements(){
            inquirer.prompt({
                    type: "input",
                    name: "name",
                    message: "Enter the departement"
                    

            }).then(function(response){
                var q = "INSERT INTO departement SET ?"
                connection.query(q,{name:response.name},function(err,res){
                    if(err) throw err;
                    console.table(res)
                    console.log("Insertion of departement")
                    firstPrompt()
                })
            })
        }
    //title, salary, departement_id
        function addroles(){
            inquirer.prompt([{
                type: "input",
                name: "title",
                message: "Enter role"
            },

            {
                type:"number",
                name: "salary",
                message: "Enter role salary"
            },

            {
                type: "number",
                name: "departement_id",
                message: "Enter role departement_id"
            }
        
        ]).then(function(response){
                var q = "INSERT INTO role SET ?"
                connection.query(q,
                    {
                        title:response.title,
                        salary:response.salary,
                        departement_id:response.departement_id,
                    },function(err,res){
                    if(err) throw err;
                    console.table(res)
                    console.log("Insert role")
                    firstPrompt()
                })
            })
                
        }

        // first_name, last_name, role_id, manage_id
            function addemployees(){
                inquirer.prompt([
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
            
            
            ]).then(function(response){
                    var q = "INSERT INTO employee SET ?"
                    connection.query(q,{
                        first_name:response.first_name,
                        last_name:response.last_name,
                        role_id:response.role_id,
                        manager_id:response.manager_id,
                    },function(err,res){
                        if(err) throw err;
                        console.table(res)
                        console.log("Insert employee")
                        firstPrompt()
                    })
                })
            }

