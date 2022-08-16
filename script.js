
var inputEl = document.getElementById("input-search").value;

var searchBtn = document.getElementById("search-btn");
var output = document.querySelector(".quote");
const quoteSearch = "https://breakingbadapi.com/api/quotes";
console.log(searchBtn);
var quote = 1;

function getQuote(event) {
  var quoteSearch = "https://breakingbadapi.com/api/quotes";
  fetch(quoteSearch)
    .then((response) => response.json())
    .then((data) => {
      output.innerHTML = "Quote: ' " + data[quote].quote + " '";
      quote++;
      console.log(quote);
    });
}

searchBtn.addEventListener("click", getQuote);

const form = document.querySelector("#searchForm");
const container = document.querySelector("#container");
const searchResult = document.querySelector("#searchResult");

const inputAPIString = localStorage.getItem('searchAPI');
const inputAPI = JSON.parse(inputAPIString) || [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  container.innerText = "";
  searchResult.innerText = "";
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  showInfo(res.data);
  form.elements.query.value = "";

  const oldInputAPI = JSON.parse(localStorage.getItem('searchAPI')) || [];
  const newAPISearch = [...oldInputAPI, searchTerm]

  localStorage.setItem('searchAPI', JSON.stringify(newAPISearch));
  if (res.data.length >= 1) {
    p = `Results for: '${searchTerm}'`;
    searchResult.append(p);
  } else if (!searchTerm) {
    p = "Invalid input";
    searchResult.append(p);
  } else {
    p = `No results found for: '${searchTerm}'`;
    searchResult.append(p);
 
  }
  

});

const showInfo = async (shows) => {
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

  for (let i = 0; i < shows.length; i++) {
    const cardMain = document.createElement("div");
    const cardBody = document.createElement("div");
    const titleName = document.createElement("h5");
    const summary = document.createElement("p");
    const image = document.createElement("img");
    const cardGridCol = document.createElement("div");

    try {
      image.src = await res.data[i].show.image.medium;
    } catch {
      image.src = "image.png";
    }

    titleName.innerText = await res.data[i].show.name;
    cardBody.append(titleName);

    summary.classList.add("summary");
    cardMain.classList.add("centre-element");
    titleName.classList.add("h5");
    searchResult.classList.add("search-result");
    summary.innerHTML = await res.data[i].show.summary;
    cardBody.append(summary);
    cardMain.append(image);
    cardMain.append(cardBody);
    cardGridCol.append(cardMain);
    container.append(cardGridCol);
  }
};



  

//Laura's modal.

//variables

var theModalBox = document.getElementsByClassName("modal-container");

var subscribeBtn = document.getElementById("open-modal-btn");

var closeModalBtn = document.getElementById("close-button");

//open modal

//listen for open click

subscribeBtn.addEventListener("click", getModal);
//listen for close click:

closeModalBtn.addEventListener("click", closeModal);

function getModal() {
  theModalBox[0].style.display = "block";
}

function closeModal() {
  theModalBox[0].style.display = "none";
}

