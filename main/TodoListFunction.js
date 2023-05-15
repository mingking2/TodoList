const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const selectDate = document.getElementById('select_date');


export const settingDate = (data) => {
    if (data === null) {
        selectDate.innerHTML = "날짜를 선택하세요";
    } else {
        const clickedDate = data;
        selectDate.innerHTML = clickedDate;
    }
}

// 새로운 todo 추가
const addTodo = () => {
    const todoListItems = todoList.querySelectorAll('.todo-item');
    const selectedDate = selectDate.textContent.trim(); // 공백제거
    const day = selectedDate.split('-')[2];
    let todoItem = null;

    Array.from({ length: todoListItems.length }, (_, i) => {
        const todoText = todoListItems[i].querySelector('span');
        if (todoText.textContent.startsWith(selectedDate)) {    // 뭐로 시작하는지
            todoItem = todoListItems[i];
            //console.log(todoItem);
        }
    });

    if (!todoItem) {
        todoItem = document.createElement('li');
        todoItem.setAttribute('id',day);
        todoItem.classList.add('todo-item');
        const todoText = document.createElement('span');
        todoText.setAttribute('id',selectedDate);
        todoText.textContent = selectedDate + '\n';
        todoText.style.whiteSpace = 'pre-wrap'; // 개행 문자 적용
        todoItem.appendChild(todoText);
        todoList.appendChild(todoItem);
    }

    // 입력한 내용을 추가
    const newTodoText = document.createElement('span');
    newTodoText.textContent = '- ' + newTodoInput.value.trim() + '\n';
    newTodoText.style.whiteSpace = 'pre-wrap';
    todoItem.querySelector('span').appendChild(newTodoText);


    // 삭제 버튼 생성 코드 추가
    const newDeleteButton = document.createElement('button');
    newDeleteButton.textContent = 'Delete';
    newDeleteButton.addEventListener('click', deleteTodo);
    newTodoText.appendChild(newDeleteButton);
    todoItem.style.display = 'none';
    newTodoInput.value = '';
    console.log("저장되었습니다.");


};



// todo 삭제 
const deleteTodo = (event) => {
  const todoText = event.target.parentNode;
  const todoItem = todoText.parentNode;
  todoItem.removeChild(todoText);
}



document.getElementById('add-todo').addEventListener('click', function () {
    if (selectDate.innerHTML === "날짜를 선택하세요") {
        alert("날짜를 선택하세요");
    } else if (newTodoInput.value.trim() === '') {
        alert("입력된 데이터가 없어용");
    } else {
        addTodo();
    }
});