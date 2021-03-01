let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(){
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(toysArray => {
    toysArray.forEach(toy => {
      renderToy(toy)
    })
  })
}

function renderToy(toy) {
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `<h2>${toy.name}</h2>
    <img src= ${toy.image} class="toy-avatar"> 
    <p>${toy.likes} likes</p>
    <button class="like-btn"> Like <3 </button>`

  const toys = document.querySelector('div#toy-collection')
  toys.append(div)
}

const form = document.querySelector('form.add-toy-form')
form.addEventListener("submit", function(event) {
  event.preventDefault()
  const name = event.target[0].value
  const image = event.target[1].value
  const toy = {
    name: name, 
    image: image,
    likes: 0
  }
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy),
  })
    .then(response => response.json())
    .then(oneToy => { renderToy(oneToy)})
    .catch((error) => {console.error("Error:", error);})

  event.target.reset()
})

const addLikes = document.querySelector("")

renderToys() 
