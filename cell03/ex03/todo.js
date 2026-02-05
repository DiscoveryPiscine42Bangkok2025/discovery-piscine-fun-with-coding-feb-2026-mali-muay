const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

window.onload = function() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todo='));
    if (todoCookie) {
        const data = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        data.forEach(text => addTodo(text, false));
    }
};

newBtn.onclick = function() {
    const task = prompt("เพิ่มรายการสิ่งที่ต้องทำ:");
    if (task && task.trim() !== "") {
        addTodo(task, true);
    }
};

function addTodo(text, isNew) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.innerText = text;

    div.onclick = function() {
        if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
            div.remove();
            saveTodo();
        }
    };

    if (isNew) {
        ftList.insertBefore(div, ftList.firstChild);
        saveTodo();
    } else {
        ftList.appendChild(div);
    }
}

function saveTodo() {
    const tasks = [];
    const items = ftList.querySelectorAll('.todo-item');
    items.forEach(item => tasks.push(item.innerText));
    
    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    document.cookie = "todo=" + encodeURIComponent(JSON.stringify(tasks)) + "; expires=" + d.toUTCString() + "; path=/";
}