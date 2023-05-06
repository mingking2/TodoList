const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const selectDate = document.getElementById('select_date');


export const settingDate = (data) => {
    const clickedDate = data;
    selectDate.innerHTML = clickedDate;
}

// 새로운 todo 추가
const addTodo = () => {
    if (newTodoInput.value.trim() === '') {
        alert("No Data");
        return;
    }
    const todoListItems = todoList.querySelectorAll('.todo-item');
    const selectedDate = selectDate.textContent.trim();
    let todoItem = null;

    Array.from({length: todoListItems.length},(_,i) => {
        const todoText = todoListItems[i].querySelector('span');
        if (todoText.textContent.startsWith(selectedDate)) {
            todoItem = todoListItems[i];
            console.log(todoItem);
        }
    });

    if (!todoItem) {
        todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        const todoText = document.createElement('span');
        todoText.textContent = selectedDate + '\n';
        todoText.style.whiteSpace = 'pre-wrap'; // 개행 문자 적용
        todoItem.appendChild(todoText);
        todoList.appendChild(todoItem);

        // 삭제 버튼 생성 코드 추가
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteTodo);
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    }

    // 입력한 내용을 추가
    const newTodoText = document.createElement('span');
    newTodoText.textContent = '- ' + newTodoInput.value.trim() + '\n';
    newTodoText.style.whiteSpace = 'pre-wrap'; // 개행 문자 적용

    todoItem.querySelector('span').appendChild(newTodoText);
    newTodoInput.value = '';
    console.log(todoList);
};



// todo 삭제
const deleteTodo = (event) => {
    const todoItem = event.target.parentNode;
    todoList.removeChild(todoItem);
}


document.getElementById('add-todo').addEventListener('click', function () {
    if (selectDate.innerHTML != "") {
        addTodo();
    } else {
        alert("날짜를 선택하세요");
        newTodoInput.value = "";
    }
});