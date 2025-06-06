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
    let id = 0;
    for (const quote of quotesDecode) {
      let card = document.createElement("li");
      card.classList.add("card");
      card.style.width = "18rem";
      quoteList.insertAdjacentElement("beforeend", card);

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      card.insertAdjacentElement("beforeend", cardBody);

      let title = document.createElement("h2");
      title.classList.add("card-title");
      title.innerHTML = quote.text;
      cardBody.insertAdjacentElement("beforeend", title);

      let author = document.createElement("p");
      author.classList.add("card-text");
      author.classList.add("fst-italic");
      author.innerHTML = quote.author;
      cardBody.insertAdjacentElement("beforeend", author);

      let type = document.createElement("p");
      type.innerHTML = quote.type;
      cardBody.insertAdjacentElement("beforeend", type);

      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn");
      deleteBtn.classList.add("btn-danger");
      deleteBtn.innerHTML = "Supprimer";
      deleteBtn.addEventListener("click", () => {
        console.log("delete");
        card.remove();
      });
      cardBody.insertAdjacentElement("beforeend", deleteBtn);
      id++;
    }
  }
}
