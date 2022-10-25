const add = document.querySelector('.add_todo');


//adds a empty todo to the screen
const todo = (text) =>{

    const todo1 = document.createElement('div');
    todo1.classList.add('container');
    let htmldata;

    if(text!='')
    {
        htmldata = `
        <div class="todo_class">
                    <button class="reset" id="reset">
                        <i class="fa-solid fa-rotate"></i>
                    </button>
                    <button class="delete" id="delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="tick" id="tick">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <textarea class="storage" id="ta-todo" style="text-decoration: line-through;">${text}</textarea>
        </div>
        `;
    }
    else
    {
        htmldata = `
        <div class="todo_class">
                    <button class="reset" id="reset">
                        <i class="fa-solid fa-rotate"></i>
                    </button>
                    <button class="delete" id="delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="tick" id="tick">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <textarea class="storage" id="ta-todo"></textarea>
        </div>
        `;
    }

    todo1.insertAdjacentHTML('afterbegin',htmldata);
    document.body.appendChild(todo1);

    todo1.querySelector('.reset').addEventListener('click',()=>{
        const reset = todo1.querySelector('#ta-todo');
        reset.value="";
        todo1.querySelector('.storage').style.textDecoration = "none";
        todo1.querySelector('#ta-todo').writeOnly = "true";
        storage();
    });

    todo1.querySelector('.delete').addEventListener('click',() => {
        todo1.remove();
        storage();
    });

    todo1.querySelector('.tick').addEventListener('click',() => {
        const ele = todo1.querySelector('.storage');
        ele.style.textDecoration = "line-through"; 
        todo1.querySelector('#ta-todo').readOnly = "true";
        storage();
    });

    todo1.querySelector('.storage').addEventListener('change',(event) => {
        if(event.target.value != '') storage();
    });

    if(text!='')
    {
        const res = todo1.querySelector('.storage');
        res.readOnly = "true";
    }

}

//For Enter Key
document.body.addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        todo(text='');
    }
});

//For Button
add.addEventListener('click',() => {
    todo(text='');
})

//storage of TODO to local system
const storage = () =>{
    const TA = document.querySelectorAll('.storage');
    const data = [];
    console.log(TA);
    TA.forEach((note) => {
        return data.push(note.value);
    });
    console.log(data);
    localStorage.setItem('todos',JSON.stringify(data));
}

//Retrieve Data from Storage
const todos = JSON.parse(localStorage.getItem('todos'));

if(todos)
{
    todos.forEach((note) => todo(note));
}

todo(text = '');