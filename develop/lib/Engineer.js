// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        super.name = name;
        super.id = id;
        super.email = email;
        this.github = github;

        // super(name, id, email);

        
    };

    getGithub(){
        return this.github;
    };
    getRole(){
        return "Engineer";
    };
};

module.exports = Engineer;