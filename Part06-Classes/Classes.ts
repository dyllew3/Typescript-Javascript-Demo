class Employee {
    public name: string;
    public employeeId: number;

    constructor(name: string, employeeId: number){
        this.name = name;
        this.employeeId = employeeId;
    }
}

class Manager extends Employee {
    constructor(name: string, employeeId: number){
        super(name, employeeId);
    }
}

class GenClass<T> {
    val: T
}