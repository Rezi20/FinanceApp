    
    /* MENU ACTIVE */
    document.querySelectorAll(".menu-item").forEach(item => {

    const current = window.location.pathname;
    const target = new URL(item.href, window.location.origin).pathname;

    if (current === target) {
        item.classList.add("active");
    }

});