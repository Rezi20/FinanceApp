const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const saveBtn = document.getElementById("saveBtn");

const incomeList = document.getElementById("incomeList");
const editIndex = document.getElementById("editIndex");

const totalIncomeEl = document.getElementById("totalIncome");
const avgIncomeEl = document.getElementById("avgIncome");
const countIncomeEl = document.getElementById("countIncome");
const categoryList = document.getElementById("categoryList");

let rowsData = [];

/* MODAL */
openModal.onclick = () => {

    editIndex.value = "";

    saveBtn.textContent = "Add";

    modal.style.display = "flex";
};

window.onclick = (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }
};

/* SAVE */
saveBtn.onclick = () => {

    const description = document.getElementById("description").value;

    const amount = document.getElementById("amount").value;

    const category = document.getElementById("category").value;

    const date = document.getElementById("date").value;

    if (amount < 0) {

        alert("Amount cannot be negative.");

        return;
    }

    if (!description || !amount || !category || !date) return;

    const index = editIndex.value;

    if (index === "") {

        rowsData.push({
            description,
            amount,
            category,
            date
        });

    } else {

        rowsData[index] = {
            description,
            amount,
            category,
            date
        };
    }

    refreshAll();

    modal.style.display = "none";
};

/* CHARTS */
const ctx = document.getElementById("incomeChart");

const chart = new Chart(ctx, {

    data: {

        labels: [],

        datasets: [

            {
                type: "bar",
                data: [],
                backgroundColor: "#ffb26b",
                barThickness: 20
            },

            {
                type: "line",
                data: [],
                borderColor: "#4a90e2",
                backgroundColor: "rgba(74, 144, 226, 0.2)",
                fill: true,
                tension: 0.5,
                pointBackgroundColor: "#4a90e2",
                pointRadius: 4
            }

        ]
    }
});

const pieCtx = document.getElementById("incomePieChart");

const pieChart = new Chart(pieCtx, {

    type: "doughnut",

    data: {

        labels: [],

        datasets: [
            {
                data: [],

                backgroundColor: [
                    "#4a90e2",
                    "#ffb26b",
                    "#6fb1ff",
                    "#ffd1a6",
                    "#8cc4ff",
                    "#ffe3cc"
                ]
            }
        ]
    },

    options: {

        plugins: {

            tooltip: {

                callbacks: {

                    label: function(context) {

                        const data = context.dataset.data;

                        const total = data.reduce(
                            (a, b) => a + b,
                            0
                        );

                        const value = data[context.dataIndex];

                        const percent = (
                            (value / total) * 100
                        ).toFixed(1);

                        return `
                            ${context.label}: 
                            $${value} 
                            (${percent}%)
                        `;
                    }
                }
            }
        }
    }
});

/* TABLE */
function renderTable() {

    incomeList.innerHTML = "";

    rowsData.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.description}</td>
            <td>$${item.amount}</td>
            <td>${item.category}</td>
            <td>${item.date}</td>

            <td>
                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </td>
        `;

        row.querySelector(".delete-btn").onclick = () => {

            rowsData.splice(index, 1);

            refreshAll();
        };

        row.querySelector(".edit-btn").onclick = () => {

            document.getElementById("description").value =
                item.description;

            document.getElementById("amount").value =
                item.amount;

            document.getElementById("category").value =
                item.category;

            document.getElementById("date").value =
                item.date;

            editIndex.value = index;

            saveBtn.textContent = "Save Changes";

            modal.style.display = "flex";
        };

        incomeList.appendChild(row);
    });
}

function updateStats() {

    const total = rowsData.reduce(
        (s, i) => s + Number(i.amount),
        0
    );

    const count = rowsData.length;

    const avg = count ? total / count : 0;

    totalIncomeEl.textContent = `$${total.toFixed(2)}`;

    avgIncomeEl.textContent = `$${avg.toFixed(2)}`;

    countIncomeEl.textContent = count;
}

function updateChart() {

    const sorted = [...rowsData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    chart.data.labels = sorted.map(i => i.description);

    chart.data.datasets[0].data =
        sorted.map(i => +i.amount);

    chart.data.datasets[1].data =
        sorted.map(i => +i.amount);

    chart.update();
}

function updateCategoryBox() {

    const map = {};

    rowsData.forEach(i => {

        map[i.category] =
            (map[i.category] || 0) + Number(i.amount);
    });

    const sorted = Object.entries(map).sort(
        (a, b) => b[1] - a[1]
    );

    categoryList.innerHTML = "";

    sorted.forEach(([cat, total]) => {

        const row = document.createElement("div");

        row.className = "category-row";

        row.innerHTML = `
            <span>${cat}</span>
            <span>$${total.toFixed(2)}</span>
        `;

        categoryList.appendChild(row);
    });

    pieChart.data.labels = sorted.map(i => i[0]);

    pieChart.data.datasets[0].data =
        sorted.map(i => i[1]);

    pieChart.update();
}

function refreshAll() {

    renderTable();

    updateStats();

    updateChart();

    updateCategoryBox();
}

 /* MENU ACTIVE */
    document.querySelectorAll(".menu-item").forEach(item => {

    const current = window.location.pathname;
    const target = new URL(item.href, window.location.origin).pathname;

    if (current === target) {
        item.classList.add("active");
    }

});


