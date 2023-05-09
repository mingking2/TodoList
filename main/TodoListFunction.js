const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');   
const selectDate = document.getElementById('select_date');


export const settingDate = (data) => {
    if(data === null) {
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
    let todoItem = null;

    Array.from({length: todoListItems.length},(_,i) => {
        const todoText = todoListItems[i].querySelector('span');
        if (todoText.textContent.startsWith(selectedDate)) {    // 뭐로 시작하는지
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
    const todoItem = event.target.parentNode; // 삭제할 부모노드(delete 버튼 상위에있는 todo-item) 찾기
    todoList.removeChild(todoItem);ㅌ``
}


document.getElementById('add-todo').addEventListener('click', function () {
    if (selectDate.innerHTML === "날짜를 선택하세요") {
        alert("날짜를 선택하세요");
    } else if(newTodoInput.value.trim() === '') {
        alert("입력된 데이터가 없어용");
    } else {
        addTodo();
    }
});