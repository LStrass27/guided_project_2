let nameH1;
let producerSpan;
let directorSpan;
let charactersDiv;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    producerSpan = document.querySelector('span#producer');
    directorSpan = document.querySelector('span#director');
    charactersUl = document.querySelector('#characters>ul');

    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    console.log(id);

    getFilm(id);
  });

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
        film.characters = await fetchCharacters(id)
        console.log(film)
    }
    catch (ex) {
        console.error(`Error reading film ${id} data.`, ex.message);
    }

    renderFilm(film);
  
}

async function fetchFilm(id) {
    let fetchURL = `http://localhost:9001/api/films/${id}`;
    return await fetch(fetchURL)
      .then(res => res.json())
  }

async function fetchCharacters(id) {
    const url = `http://localhost:9001/api/films/${id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    nameH1.textContent = film?.title;
    producerSpan.textContent = film?.producer;
    directorSpan.textContent = film?.director;
    const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
  }



