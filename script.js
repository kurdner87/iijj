// selecting elements
const add = document.getElementById('firstBtn')
const titleInput = document.getElementById('noteTitle')
const bodyInput = document.getElementById('noteBody')
const container = document.getElementById('container')
const form = document.getElementById('form')
const modal = document.getElementById('modal')

// hide the form
form.style.display = 'none'

// hiding the modal
modal.style.display = 'none'


// open modl function
function openModal(type){
     modal.style.display = 'block'
     if(type === 'submit') {
        modal.innerHTML = 'Note added succesfully.'
        modal.style.backgroundColor = 'blue'
    }else{
        modal.innerHTML = 'Note deleted'
        modal.style.backgroundColor = 'red'
    }
    setTimeout(function(){
        modal.style.display = 'none'
    }, 2000)
}


// opening the form
add.addEventListener('click', function(){
    form.style.display = 'block'
    add.style.display = 'none'
})


// notes array 
let notesArray = []
try {
  notesArray = JSON.parse(localStorage.getItem('winnNotes')) || []
} catch {
  notesArray = [] 
}

// Display note function
function DisplayNote(){
     notesArray.forEach(function(singleNote){
         //  creating elements
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const paraOne = document.createElement('p')
    const paraTwo = document.createElement('p')
    const spanOne = document.createElement('span')
    const spanTwo = document.createElement('span')

    // Adding contents to the created elements
    h3.innerHTML = singleNote.title;
    paraOne.innerHTML = singleNote.body;
    spanOne.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
    spanTwo.innerHTML = '<i class="fa-regular fa-trash-can"></i>'

    // appending children
    paraTwo.appendChild(spanOne)
    paraTwo.appendChild(spanTwo)
    div.appendChild(h3)
    div.appendChild(paraOne)
    div.appendChild(paraTwo)
    container.appendChild(div)

    // edit functionality
    spanOne.addEventListener('click', function(){
        titleInput.value = h3.textContent;
        bodyInput.value = paraOne.textContent
        div.remove()
    })

    //Delete functionality
    spanTwo.addEventListener('click', function(){
        div.remove()
        openModal()
    })
     })
}

// showing notes on initail render
window.addEventListener('load', DisplayNote)

form.addEventListener('submit', function(e){
     e.preventDefault()

     if(titleInput.value == '' || bodyInput.value == ''){
        return
     }
     
    // updating the notes array
    notesArray.push({
        title : titleInput.value,
        body : bodyInput.value
    })

    // display the note
    DisplayNote()
   
    // setting notes array to the local storage
    localStorage.setItem('winnNotes', JSON.stringify(notesArray))
    console.log(notesArray);

    // clear the input fields
    titleInput.value = ""
    bodyInput.value = ''

    openModal('submit')

     
})