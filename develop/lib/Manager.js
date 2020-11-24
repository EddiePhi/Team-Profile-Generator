// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(officeNum){
        this.officeNum = officeNum;

        super(name, id, email);
    };
    getRole(){
        return "Manager"
    }
};