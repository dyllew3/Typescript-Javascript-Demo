
interface Person {
    firstname: string;
    lastname: string;
    age: number; // it's just number
}

let testPerson: Person = {firstname: "Dylan", lastname: "Lewis", age: 22};

interface Shape {
    width: number;
    height: number;
    colour?: string;
}

interface Polygon {
    something: number;
}

interface Circle extends Shape, Polygon{
    circumference: number;
}

interface Animal {
    readonly species: string;
    readonly status: string;
}

interface Foo {
    count: () => number;
}

class Oof implements Foo {
    private val: number;

    constructor(){
        this.val = 0;
    }
    public count(){
        return this.val++;
    }
}