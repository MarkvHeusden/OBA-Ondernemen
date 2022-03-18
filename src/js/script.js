function getBooks(type) {
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
    const query = 'ondernemen';
    const key = 'ffbc1ededa6f23371bc40df1864843be';
    const detail = 'Default';
    const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;
    const url2 = `${cors}http://obaliquid.staging.aquabrowser.nl/onderwijs/api/v1/search/?q=${query}+NOT+lom.lifecycle.contribute.publisher%3Dwikipedia&authorization=a57b7bbd1cde2f6fb7ce5b3f2d1d96e0&output=json`

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
          showBook(data, type);
      })
      .catch(err => {
        console.warn(err);
      });
}

function showBook(data, type) {
  const mainEl = document.querySelector('main');
  const books = data.results;
  let markup = "";

  if (type === 'random') {
    const randomBook = books[Math.floor(Math.random() * books.length)];

    markup = `
    <article class="book">
        <div class="book-cover">
            <img src="${randomBook.coverimages[1]}" alt="" />
        </div>
        <section class="book-details">
            <h1>${randomBook.titles[0]}</h1>
            <p>${randomBook.authors[0]}</p>
            <h2>Samenvatting</h2>
            <p>${randomBook.summaries ? randomBook.summaries[0] : 'Geen samenvatting gevonden'}</p>
        </section>
    </article> `;
  } else {
    books.forEach((book) => {
     markup += `
          <article class="book all-books">
            <div class="book-cover">
                <img src="${book.coverimages[1]}" alt="" />
            </div>
            <section class="book-details">
                <h1>${book.titles[0]}</h1>
                <p>${book.authors[0]}</p>
                <h2>Samenvatting</h2>
                <p>${book.summaries ? book.summaries[0] : 'Geen samenvatting gevonden'}</p>
            </section>
          </article> `;
    })
  }

  mainEl.innerHTML = markup;

  const booksEl = document.querySelectorAll('.book');
  booksEl.forEach((book) => {
    book.addEventListener('click', function() {
      book.classList.toggle('book-open')
    })
  });
}

function openCloseBook(book) {
  book.classlist.toggle('book-open');
}

const randomButtonEl = document.querySelector('button');
randomButtonEl.addEventListener('click', function() {
  getBooks('random')
});

const allButtonEl = document.querySelector('button:last-of-type');
allButtonEl.addEventListener('click', function() {
  getBooks('all')
});