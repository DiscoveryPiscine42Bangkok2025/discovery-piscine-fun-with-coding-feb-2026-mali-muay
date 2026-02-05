$(document).ready(function() {
    const $ftList = $('#ft_list');

    function loadTodo() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(row => row.startsWith('todo='));
        if (todoCookie) {
            const data = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
            data.forEach(text => addTodo(text, false));
        }
    }

    function saveTodo() {
        const tasks = [];
        $('.todo-item').each(function() {
            tasks.push($(this).text());
        });
        
        const d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000));
        document.cookie = "todo=" + encodeURIComponent(JSON.stringify(tasks)) + "; expires=" + d.toUTCString() + "; path=/";
    }

    function addTodo(text, isNew) {
        const $div = $('<div></div>').addClass('todo-item').text(text);

        $div.click(function() {
            if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
                $(this).remove();
                saveTodo();
            }
        });

        if (isNew) {
            $ftList.prepend($div);
            saveTodo();
        } else {
            $ftList.append($div);
        }
    }

    $('#new_btn').click(function() {
        const task = prompt("เพิ่มรายการสิ่งที่ต้องทำ:");
        if (task && task.trim() !== "") {
            addTodo(task, true);
        }
    });

    loadTodo();
});