
export default class FormHandler {  //handler - takes all values from the user entries, 
    //forms  an object and calls a method of a controller, getting a message, 
    // if a message empty - OK if not then alert. The processor will  take a logic. 
    // all these fields for DOM
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm);
        this.#alertElement = document.getElementById(idAlert);
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`); // giving all elem. 
        // parents of which 'idForm' and have atribute name
        // and creating an itereable object
    }
    addHandler(fnProcessor)  {
        this.#formElement.addEventListener('submit', async event => {
            event.preventDefault();
            const data = Array.from(this.#inputElements)  // creating an aray of iterables. 
                .reduce((obj, element) => {  
                    obj[element.name] = element.value;     // value is a user entry  (job of qerySelectorAll ??)
                    return obj;
                }, {})
            const message = await fnProcessor(data);
            if (!message) {      // !'' == true               
                this.#formElement.reset(); // everything OK
                this.#alertElement.innerHTML = '';
            } else {     // !string == false (else 'message' is a string returnned from cb) 
                // TODO show alert inside this.#alertElement 
                const alert =                      // - 'message' is a string
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                       <strong> Error! </strong> ${message}.   
                       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <div>`;
                this.#alertElement.innerHTML = alert;
            }
        })
    }
    fillOptions(idOptions, options){
        document.getElementById(idOptions).innerHTML += `${getOptions(options)}` // to  add  -- Select lecturer/course  name --

    }
    show(){
        this.#formElement.hidden = false;        
    }
    hide(){
        this.#formElement.hidden = true;
    }
}
function getOptions(opts){
    return opts.map(o=> `<option value="${o}"> ${o} </option>`).join('');
}
