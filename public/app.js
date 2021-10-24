const form = document.querySelector(".update-form");
const btn = document.querySelector(".edit");
btn.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
});
