const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search");
const searchresults = document.querySelector(".search-results");

//https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up
let typingTimer; //timer identifier
let doneTypingInterval = 350;

searchForm.addEventListener("keyup", (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(displayUsers, doneTypingInterval);
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
});

const displayUsers = async () => {
  
  if (!searchInput.value) {
    return;
  }

  const users = await fetchUser(searchInput.value);
  updateList(await users);
};

searchInput.addEventListener("input", async (e) => {
  clearTimeout(typingTimer);
});

searchInput.addEventListener("focusout", (e) => {
  setTimeout(() => {
    updateList([]);
  }, 800);
});

const fetchUser = async (name) => {
  const res = await fetch("/users/search", {
    credentials: "include",
    method: "post",
    body: JSON.stringify({ search: name }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const updateList = (list) => {
  searchresults.innerHTML = "";

  list.forEach((user) => {
    const div = document.createElement("div");
    div.classList.add("list-group-item");
    div.classList.add("d-flex");
    div.classList.add("justify-content-start");
    div.classList.add("align-items-center");

    const aimg = document.createElement("a");
    aimg.innerHTML = `<img class="img-thumbnail m-1" style="border-radius: 50%; max-width: 35px;" src="${user.profileUrl}" alt="Users profile">`;
    aimg.href = "/profile/" + user._id;

    const aname = document.createElement("a");
    aname.classList.add("m-1");
    aname.textContent = user.name;
    aname.href = "/profile/" + user._id;

    div.appendChild(aimg);
    div.appendChild(aname);

    searchresults.appendChild(div);
  });
};
