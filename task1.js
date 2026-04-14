// Add-task page script
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    if (addBtn) addBtn.addEventListener('click', addTask);
});

function addTask() {
    const taskName = document.getElementById('T_name').value.trim();
    const taskDesc = document.getElementById('T_desc').value.trim();
    const assDate = document.getElementById('assigned_date').value;
    const dueDate = document.getElementById('due_date').value;

    if (!taskName) {
        alert('Please enter a task name');
        return;
    }

    const leftTbody = document.getElementById('left_tbody');
    if (!leftTbody) return;

    const tr = document.createElement('tr');

    const tdName = document.createElement('td'); tdName.textContent = taskName;
    const tdDesc = document.createElement('td'); tdDesc.textContent = taskDesc;
    const tdFrom = document.createElement('td'); tdFrom.textContent = assDate;
    const tdTo = document.createElement('td'); tdTo.textContent = dueDate;
    const tdChk = document.createElement('td'); tdChk.className = 'chk-cell';

    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.addEventListener('change', handleCheck);
    tdChk.appendChild(chk);

    tr.appendChild(tdName);
    tr.appendChild(tdDesc);
    tr.appendChild(tdFrom);
    tr.appendChild(tdTo);
    tr.appendChild(tdChk);

    leftTbody.appendChild(tr);

    // clear form inputs for convenience (previous rows are preserved)
    document.getElementById('T_name').value = '';
    document.getElementById('T_desc').value = '';
    document.getElementById('assigned_date').value = '';
    document.getElementById('due_date').value = '';
}

function handleCheck(event) {
    const chk = event.target;
    const row = chk.closest('tr');
    if (!row) return;

    // read row data (first 4 cells)
    const cells = row.querySelectorAll('td');
    const name = cells[0] ? cells[0].textContent : '';
    const desc = cells[1] ? cells[1].textContent : '';
    const from = cells[2] ? cells[2].textContent : '';
    const to = cells[3] ? cells[3].textContent : '';

    // append to right table
    const rightTbody = document.getElementById('right_tbody');
    if (rightTbody) {
        const rtr = document.createElement('tr');
        const r1 = document.createElement('td'); r1.textContent = name;
        const r2 = document.createElement('td'); r2.textContent = desc;
        const r3 = document.createElement('td'); r3.textContent = from;
        const r4 = document.createElement('td'); r4.textContent = to;
        rtr.appendChild(r1);
        rtr.appendChild(r2);
        rtr.appendChild(r3);
        rtr.appendChild(r4);
        rightTbody.appendChild(rtr);
    }

    // remove original row from left table
    row.remove();
}