const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log( await fetchUser(searchInput.value));
});

searchInput.addEventListener("input", async (e) => {
    const data = await fetchUser(searchInput.value);
    if(data.result){
        console.log(data.result);
    }
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

