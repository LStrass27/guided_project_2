const baseUrl = `http://localhost:9001/api`;
let nameH1;
let filmsUl;
let charactersUl;


addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
  
    charactersUl = document.querySelector('#characters>ul')
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
  });

async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id)
        planet.characters = await fetchCharacters(id)
        planet.films = await fetchFilms(id)
    }
    catch (ex) {
        console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);

}

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
}

async function fetchFilms(id) {
    const url = `${baseUrl}/planets/${id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
}

async function fetchCharacters(id) {
    const url = `${baseUrl}/planets/${id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  
    nameH1.textContent = planet?.name;
   
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");

    const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
}
  