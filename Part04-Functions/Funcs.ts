function foo(x: number): number{
    return x;
}


function bar(x: number, z?: string ): string{
    return x +  (z || "");
}


function deflt(x: string = "hello", y: string="world"): string {
    return x + y;
}