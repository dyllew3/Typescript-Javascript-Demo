enum Enum {
    SomeValue = 0
}
{
    let whatev: any = "" + 2;
    let num : number = 10;
    let bool : boolean = true;
    let str : string = "hell";
    let arr : Array<number> = [1,2,3];
    let tup : [string, number] = ["1", 2];
    let enm : Enum = Enum.SomeValue; 
    let func : () => number = function(){ return 1; } ;
    let obj : object = {"firstname":"Dylan"};
    let nullVal :null = null;
    let undef : undefined = undefined;
 
let x: number = 2;
let y = x + ""; // Type error
console.log(typeof(y)); // type string
}