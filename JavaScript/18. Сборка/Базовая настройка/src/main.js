import main from "./some";
const a = 5;
const b = 2;
console.log(a + b);
class Humman {
    constructor(name,surname){
        this.name = name;
        this.surname = surname;
    }

    logFullName(){
        console.log(`${this.name} ${this.surname}`)
    }
}

const igor = new Humman('Igor','Atlas');
console.log(igor.logFullName());
document.body.classList.add('body')
document.body.append(main);
