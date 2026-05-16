const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const expenseList = document.getElementById("expenseList");
const closeBtn = document.getElementById("closeBtn");
const limitInput = document.getElementById("limitInput");
const saveLimitBtn = document.getElementById("saveLimitBtn");

let currentCategory = null;

/* DATA */
const data = [

    {
        category: "Travel",
        total: 450,
        limit: 800,
        expenses: [
            { name: "Flight", amount: 300 },
            { name: "Hotel", amount: 150 }
        ]
    },

    {
        category: "Gym & Fitness",
        total: 200,
        limit: 400,
        expenses: [
            { name: "Gym", amount: 50 },
            { name: "Supplements", amount: 80 },
            { name: "Doctor", amount: 70 }
        ]
    },

    {
        category: "Food",
        total: 320,
        limit: 500,
        expenses: [
            { name: "Groceries", amount: 120 },
            { name: "Restaurant", amount: 200 }
        ]
    },

    {
        category: "Technology",
        total: 600,
        limit: 1000,
        expenses: [
            { name: "Laptop", amount: 500 },
            { name: "Apps", amount: 100 }
        ]
    },

    {
        category: "Bills",
        total: 280,
        limit: 350,
        expenses: [
            { name: "Electricity", amount: 120 },
            { name: "Internet", amount: 80 },
            { name: "Water", amount: 80 }
        ]
    },

    {
        category: "Entertainment",
        total: 150,
        limit: 300,
        expenses: [
            { name: "Cinema", amount: 40 },
            { name: "Games", amount: 60 },
            { name: "Streaming", amount: 50 }
        ]
    },

    {
        category: "Transport",
        total: 180,
        limit: 400,
        expenses: [
            { name: "Fuel", amount: 100 },
            { name: "Taxi", amount: 50 },
            { name: "Bus Card", amount: 30 }
        ]
    },

    {
        category: "Shopping",
        total: 350,
        limit: 700,
        expenses: [
            { name: "Clothes", amount: 200 },
            { name: "Shoes", amount: 100 },
            { name: "Accessories", amount: 50 }
        ]
    },

    {
        category: "Health and Medical",
        total: 260,
        limit: 500,
        expenses: [
            { name: "Medicine", amount: 90 },
            { name: "Clinic Visit", amount: 120 },
            { name: "Vitamins", amount: 50 }
        ]
    }

];

/* RENDER */
function render() {

    grid.innerHTML = "";

    data.forEach(cat => {

        let percent = (cat.total / cat.limit) * 100;

        if (percent > 100) {
            percent = 100;
        }

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="title">
                <span>${cat.category}</span>
                <span>$${cat.total}</span>
            </div>

            <div class="bar-bg">
                <div class="bar-fill" style="width:${percent}%"></div>
            </div>

            <div style="
                margin-top:10px;
                font-size:13px;
                color:#666;
                display:flex;
                justify-content:space-between;
            ">
                <span>Limit: $${cat.limit}</span>
                <span>${Math.round(percent)}%</span>
            </div>
        `;

        card.onclick = () => openModal(cat);

        grid.appendChild(card);
    });
}

/* OPEN MODAL */
function openModal(cat) {

    currentCategory = cat;

    modalTitle.textContent = cat.category + " Expenses";

    expenseList.innerHTML = "";

    limitInput.value = cat.limit;

    cat.expenses.forEach(e => {

        const row = document.createElement("div");

        row.className = "expense";

        row.innerHTML = `
            <span>${e.name}</span>
            <span>$${e.amount}</span>
        `;

        expenseList.appendChild(row);
    });

    modal.style.display = "flex";
}

/* SAVE LIMIT */
saveLimitBtn.onclick = () => {

    const newLimit = Number(limitInput.value);

    if (!currentCategory || isNaN(newLimit) || newLimit <= 0) {
        return;
    }

    currentCategory.limit = newLimit;

    render();

    modal.style.display = "none";
};

/* CLOSE */
closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }
};

render();

/* ACTIVE MENU */
const menuItems = document.querySelectorAll(".menu-item");

const currentPage = window.location.pathname.split("/").pop();

menuItems.forEach(item => {

    const itemPage = item.getAttribute("href");

    if (itemPage === currentPage) {
        item.classList.add("active");
    } else {
        item.classList.remove("active");
    }
});