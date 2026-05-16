let income = [];
let expenses = [];
let goals = [];
let editIndex = -1;

/* SAVE */
function saveGoal(){

    const goal = {
        name: document.getElementById("goalName").value,
        target: Number(document.getElementById("goalAmount").value),
        start: document.getElementById("goalStart").value,
        end: document.getElementById("goalEnd").value,
        category: document.getElementById("goalCategory").value
    };

    if (goal.target < 0) {
        alert("Error: Amount cannot be below 0");
        return;
    }

    if(!goal.name || !goal.target) return;

    if(editIndex >= 0){

        goals[editIndex] = goal;
        editIndex = -1;

        document.getElementById("goalBtn").innerText = "Create Goal";

    } else {

        goals.push(goal);
    }

    clearInputs();
    renderGoals();
}

/* RENDER */
function renderGoals(){

    const container = document.getElementById("goalList");

    container.innerHTML = "";

    const totalIncome = income.reduce((s,i)=>s+Number(i.amount),0);

    const totalExpense = expenses.reduce((s,e)=>s+Number(e.amount),0);

    const savings = totalIncome - totalExpense;

    goals.forEach((g,index)=>{

        const progress = g.target
            ? Math.min((savings / g.target) * 100,100)
            : 0;

        const div = document.createElement("div");

        div.className = "goal-card";

        div.innerHTML = `
            <div class="goal-top">

                <div class="goal-name">${g.name}</div>

                <div class="goal-percent">
                    ${progress.toFixed(1)}%
                </div>

            </div>

            <div class="progress-bar">
                <div class="progress-fill" style="width:${progress}%"></div>
            </div>

            <div class="goal-details">

                <div class="goal-item">
                    <span>Target</span>
                    <strong>$${g.target}</strong>
                </div>

                <div class="goal-item">
                    <span>Category</span>
                    <strong>${g.category || "-"}</strong>
                </div>

                <div class="goal-item">
                    <span>Start</span>
                    <strong>${g.start || "-"}</strong>
                </div>

                <div class="goal-item">
                    <span>End</span>
                    <strong>${g.end || "-"}</strong>
                </div>

            </div>

            <div class="goal-actions">

                <button class="action-btn edit-btn" onclick="editGoal(${index})">
                    Edit
                </button>

                <button class="action-btn delete-btn" onclick="deleteGoal(${index})">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(div);
    });
}

/* EDIT */
function editGoal(index){

    const g = goals[index];

    document.getElementById("goalName").value = g.name;
    document.getElementById("goalAmount").value = g.target;
    document.getElementById("goalStart").value = g.start;
    document.getElementById("goalEnd").value = g.end;
    document.getElementById("goalCategory").value = g.category;

    editIndex = index;

    document.getElementById("goalBtn").innerText = "Update Goal";
}

/* DELETE */
function deleteGoal(index){

    goals.splice(index,1);

    renderGoals();
}

/* CLEAR */
function clearInputs(){

    document.getElementById("goalName").value = "";
    document.getElementById("goalAmount").value = "";
    document.getElementById("goalStart").value = "";
    document.getElementById("goalEnd").value = "";
    document.getElementById("goalCategory").value = "";
}

/* INIT */
function init(){

    renderGoals();

    document.getElementById("userName").innerText = "Your Name";

    document.getElementById("userEmail").innerText = "you@email.com";
}

init();

/* ACTIVE MENU */
    document.querySelectorAll(".menu-item").forEach(item => {

    const current = window.location.pathname;
    const target = new URL(item.href, window.location.origin).pathname;

    if (current === target) {
        item.classList.add("active");
    }

});


/* Name & Email from Local storage, showing in Dashboard menu */
const email = localStorage.getItem("userEmail");
document.getElementById("userEmail").innerText = email;

const name = localStorage.getItem("userName");
document.getElementById("userName").innerText = name;

/* Name & Email from Local storage, showing in Dashboard menu */