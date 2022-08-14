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
