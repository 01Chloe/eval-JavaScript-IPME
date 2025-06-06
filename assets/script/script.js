const form = document.querySelector("#quote-form");
const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const quoteType = document.querySelector("#quote-type");
const quoteList = document.querySelector("#quote-list");

class Quote {
  constructor(text, author, type) {
    this.text = text;
    this.author = author;
    this.type = type;
  }
}

let quotesInStorage = localStorage.getItem("quotes");
let quotesArray = JSON.parse(quotesInStorage);

if (quotesArray === null) {
  quotesArray = [];
}

let errorMsg = document.createElement("p");
form.insertAdjacentElement("afterend", errorMsg);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    quoteText.value !== "" &&
    quoteAuthor.value !== "" &&
    quoteType.value !== ""
  ) {
    createCard();
    quoteText.value = "";
    quoteAuthor.value = "";
    quoteType.value = "";
    errorMsg.innerHTML = "";
    errorMsg.classList.add("d-none");
  } else {
    errorMsg.classList.remove("d-none");
    errorMsg.classList.add("text-danger");
    errorMsg.innerHTML = "Tous les champs doivent être remplis";
  }
});

function createCard() {
  let text = quoteText.value;
  let author = quoteAuthor.value;
  let type = quoteType.value;
  let quote = new Quote(text, author, type);
  quotesArray.push(quote);
  let quotesEncode = JSON.stringify(quotesArray);
  localStorage.setItem("quotes", quotesEncode);
  displayQuote();
}

displayQuote();
function displayQuote() {
  quoteList.innerHTML = "";

  let quotesInStorage = localStorage.getItem("quotes");
  let quotesDecode = JSON.parse(quotesInStorage);

  if (quotesDecode) {
    console.log(quotesDecode);
    for (const quote of quotesDecode) {
      quoteList.insertAdjacentHTML(
        "beforeend",
        `
            <li class="card" style="width: 18rem;">
                <div class="card-body">
                    <h2 class="card-title">${quote.text}</h2>
                    <p class="card-text fst-italic">${quote.author}</p>
                    <p>${quote.type}</p>
                    <button class="btn btn-danger">Supprimer</button>
                </div>
            </li>
        `
      );
    }
  }
}
