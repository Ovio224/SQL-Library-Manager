  // show only the first 10 books
  function showBooks (list, page) {
    const books = document.querySelectorAll('tr');
    let pageFirstIndex = 10 * page;
    let pageLastIndex = 10 * (page + 1) - 1;
    for (let i = 0; i < list.length; i++) {
      let listIndex = Array.prototype.indexOf.call(books, list[i]);

      if (listIndex >= pageFirstIndex && listIndex <= pageLastIndex) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }
  }
  // append pagination func
const appendPages = list => {
  const pagediv = document.querySelector('body');
  const pagesNeeded = Math.floor(list.length / 10);
  const div = document.createElement("div");
  div.className = "pagination";
  pagediv.appendChild(div);
  const ul = document.createElement("ul");
  div.appendChild(ul);
  // looping through the pagination links
  for (let i = 0; i <= pagesNeeded; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    const a = document.createElement("A");
    a.href = "#";
    let j = i;
    a.textContent = j + 1;
    li.appendChild(a);
    if (a.textContent === "1")
      //make a default setting for the first link to be active
      a.className = "active";
    div.addEventListener("click", e => {
      // Adding functionality for the pagination links
      if (e.target.textContent == i + 1) {
        // by adding the event listener to the div directly and checking if the pagination's link text is equal to 'i +1'
        showBooks(list, i); // displaying the books according to which page is being clicked
        e.target.className = "active";
      } else {
        a.className = "inactive";
      }
    });
  }
};
// search feature comparing the index of the search value to the index of all the letters in a book
function searchFunc() {
  if(document.querySelector('ul')){
    var booksVisible = document.querySelectorAll(
      '.tbody > tr:not([style*="display:none"]):not([style*="display: none"])'
  );
    document.querySelector('body').removeChild(document.querySelectorAll('.pagination')[0]);
    appendPages(booksVisible);
  }
  const search = document.querySelector('input');
  const names = document.querySelectorAll('tbody > tr');
  search.value = search.value.toLowerCase();
  const books = document.querySelectorAll('tbody > tr');
  for (let i = 0; i < books.length; i++) {
    let li = books[i];
    if (li) {
      if (names[i].innerText.toLowerCase().indexOf(search.value) > -1) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    }
  }
}

 // only loads on the /books url
if(window.location.pathname === '/books') {
  document.addEventListener("DOMContentLoaded", function(event) {
    const books = document.querySelectorAll('tbody > tr');
    showBooks(books, 0);
    appendPages(books);

    // dynamically insert a search bar into the html
    const divSearch = document.createElement("div");
    divSearch.className = "student-search";
    document.querySelector(".page-header").appendChild(divSearch);
    const search = document.createElement("input");
    search.type = "text";
    search.placeholder = "Search for books...";
    divSearch.appendChild(search);
    const button = document.createElement("button");
    button.textContent = "Search";
    divSearch.appendChild(button);
    button.addEventListener("click", searchFunc);
  });
}
