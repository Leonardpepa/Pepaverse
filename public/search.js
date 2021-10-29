const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search");

const searchResult = document.querySelector(".search-result");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if(!searchInput.value) return;

    const users = await fetchUser(searchInput.value);
    console.log(users.result);
    updateList( await users.result);
});

searchInput.addEventListener("input", async (e) => {
    const users = await fetchUser(searchInput.value);
    console.log(users.result);
    updateList( await users.result);
});



const fetchUser = async (name) => {
    const res = await fetch("/users/search", {
        credentials: "include",
        method: "post",
        body: JSON.stringify({search: name}),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}


const updateList = (list) => {
    searchResult.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("list-group");

    list.forEach(element => {
        const a = document.createElement("a");
        a.classList.add("list-group-item");
        a.classList.add("list-group-action");
        a.href =`/profile/${element._id}`;
        a.textContent = element.name;
        ul.appendChild(a);
    });
    searchResult.appendChild(ul);
}


