const items = document.querySelectorAll(".menu-item");
const current = window.location.pathname.split("/").pop();

items.forEach(i => {
    if (i.getAttribute("href") === current) {
        i.classList.add("active");
    }
});