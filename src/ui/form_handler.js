

export default class FormHandler{  //handler - takes all values from the user entries, 
                                   //forms  an object and calls a method of a controller, getting a message, 
                                   // if a message empty - OK if not then alert. The processor will  take a logic. 
                                   // all these fields for DOM
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert){
        this.#formElement = document.getElementById(idForm);
        this.#alertElement = document.getElementById(idAlert);
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`); // giving all elem. parents of which 'idForm' and have atribute name
    }
    addHandler(fnProcessor){
        this.#formElement.addEventListener('submit', event =>{
            event.preventDefault();
            const data = Array.from(this.#inputElements)
            .reduce((obj, element)=>{
                obj[element.name] = element.value;     // value is a user entry  (job of qerySelectorAll ??)
                return obj;
            },{})
            const message = fnProcessor(data);
            if(!message){
                this.#formElement.reset(); // everything OK
            }else {
                // TODO show alert inside this.#alertElement
            }
        })
    }
}