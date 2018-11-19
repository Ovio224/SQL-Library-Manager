

const appendPages = list => {
  const pagediv = document.querySelector('.pagination');
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
        showStudents(list, i); // displaying the students according to which page is being clicked
        e.target.className = "active";
      } else {
        a.className = "inactive";
      }
    });
  }
};


// setInterval(() => {
//   appendPages(document.querySelectorAll('tr'));
// }, 1000);