const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const selectDate = document.getElementById('select_date');


let index=0;

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
        index = 0;
        todoItem = document.createElement('li');
        todoItem.setAttribute('id', day);
        todoItem.setAttribute('data-y', selectedDate.split('-')[0]);
        todoItem.setAttribute('data-m',selectedDate.split('-')[1]);
        todoItem.classList.add('todo-item');
        const todoText = document.createElement('span');
        todoText.setAttribute('id', selectedDate);
        todoText.textContent = selectedDate + '\n';
        todoText.style.whiteSpace = 'pre-wrap'; // 개행 문자 적용
        todoItem.appendChild(todoText);
        todoList.appendChild(todoItem);
    }

    // 입력한 내용을 추가
    const newTodoText = document.createElement('span');
    newTodoText.setAttribute('id',`${index}`);
    newTodoText.textContent = '- ' + newTodoInput.value.trim() + '\n';
    newTodoText.style.whiteSpace = 'pre-wrap';
    todoItem.querySelector('span').appendChild(newTodoText);

    // 로컬 스토리지에 데이터 저장
    const todoData = {
        selectedDate: selectedDate,
        index: index,
        todoText: newTodoInput.value.trim()
    };

    // 기존에 저장된 데이터 가져오기
    let storedData = localStorage.getItem('todoData');
    if (storedData) {
        storedData = JSON.parse(storedData);
    } else {
        storedData = [];
    }

    // 새로운 데이터 추가
    storedData.push(todoData);
    let del_index = index;

    // 데이터 저장
    localStorage.setItem('todoData', JSON.stringify(storedData));

    // 삭제 버튼 생성 코드 추가
    const newDeleteButton = document.createElement('button');
    newDeleteButton.textContent = 'Delete';
    newDeleteButton.setAttribute('id',index);
    newDeleteButton.addEventListener('click', (event) => {
        deleteTodo(event, day, del_index);
    });
    newTodoText.appendChild(newDeleteButton);
    //todoItem.style.display = 'none';
    newTodoInput.value = '';

    // 점 추가
    const thisDate = document.querySelector('.this[data-day="' + day + '"]');
    const yearMonth = document.querySelector('.year-month').textContent;
    const year = yearMonth.substring(0,3);
    const month = yearMonth[6];
    if (thisDate && year === selectedDate.substring(0,3) && month === selectedDate[5]) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        // dot.innerHTML="·";
        thisDate.parentNode.appendChild(dot);
    }

    index++;
    console.log("저장되었습니다.");
};



// todo 삭제 
const deleteTodo = (event, day, del_index) => { // 왜 되는건지 이해 안되는데 되긴함
    const todoText = event.target.parentNode;
    const todoItem = todoText.parentNode;
    const todoList = todoItem.parentNode;
    const todoUl = todoList.parentNode;
    todoItem.removeChild(todoText);

    // 삭제한 후에 할일 목록이 비었는지 확인하여 li 태그를 삭제
    if (todoItem.querySelectorAll('span').length === 0) {
        todoList.removeChild(todoItem);
        todoUl.removeChild(todoList);
    }

    // 로컬 스토리지에서 데이터 불러오기
    let storedData = localStorage.getItem('todoData');
    if (storedData) {
        storedData = JSON.parse(storedData);
    } else {
        storedData = [];
    }

    // 해당 날짜의 데이터 제거
    const updatedData = storedData.filter(data => {
        const yearMonth = document.querySelector('.year-month').textContent;
        const year = yearMonth.substring(0,4);
        const month = yearMonth[6];
        if(data.selectedDate.split('-')[2] === day && data.selectedDate.split('-')[0] === year && data.selectedDate.split('-')[1] === month) {
            if(data.index !== del_index) {
                return true;
            }
        } else {
            return true;
        }
    });
    console.log(updatedData);

    // 해당 날짜를 제거한 나머지 데이터 저장
    localStorage.setItem('todoData', JSON.stringify(updatedData));


    // 점 삭제
    const thisDate = document.querySelector(`.this[data-day="${day}"]`);
    if (thisDate) {
        const dot = thisDate.parentNode.querySelector('.dot');
        if (dot) {
            dot.parentNode.removeChild(dot);
        }
    }
}

// 로컬 스토리지에서 할일 항목을 가져와서 표시하는 함수
const loadTodoItems = () => {
    // 기존의 todo 아이템을 지웁니다.
    todoList.innerHTML = '';
  
    // 로컬 스토리지에서 저장된 todo 데이터를 가져옵니다.
    let storedData = localStorage.getItem('todoData');
    if (storedData) {
      storedData = JSON.parse(storedData);
    
      // 날짜별로 todo 아이템을 그룹화합니다.
      const groupedData = {};
      storedData.forEach(data => {
        const { selectedDate, index, todoText } = data;
        if (!groupedData[selectedDate]) {
          groupedData[selectedDate] = [];
        }
        groupedData[selectedDate].push({ index, todoText });
      });
  
      // 그룹화된 데이터를 기반으로 todo 아이템 엘리먼트를 생성합니다.
      for (const selectedDate in groupedData) {
        const day = selectedDate.split('-')[2];
        
        const todoItemElement = document.createElement('li');
        todoItemElement.setAttribute('id', day);
        todoItemElement.setAttribute('data-y', selectedDate.split('-')[0]);
        todoItemElement.setAttribute('data-m',selectedDate.split('-')[1]);
        todoItemElement.classList.add('todo-item');
  
        const todoTextElement = document.createElement('span');
        todoTextElement.setAttribute('id', selectedDate);
        todoTextElement.textContent = selectedDate + '\n';
        todoTextElement.style.whiteSpace = 'pre-wrap';
  
        groupedData[selectedDate].forEach(({ index, todoText }) => {
          const todoTextItem = document.createElement('span');
          todoTextItem.setAttribute('id', index);
          todoTextItem.textContent = '- ' + todoText + '\n';
          todoTextItem.style.whiteSpace = 'pre-wrap';
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.setAttribute('id', index);
          deleteButton.addEventListener('click', (event) => {
            deleteTodo(event, day, index);
          });
  
          todoTextItem.appendChild(deleteButton);
          todoTextElement.appendChild(todoTextItem);
          
        });
  
        todoItemElement.appendChild(todoTextElement);
        todoList.appendChild(todoItemElement);
        todoItemElement.style.display='none';

        
      }
    }
  };
  
  // 페이지가 로드될 때 loadTodoItems를 호출합니다.
  window.addEventListener('load', loadTodoItems);
  
  



document.getElementById('add-todo').addEventListener('click', function () {
    if (selectDate.innerHTML === "날짜를 선택하세요") {
        alert("날짜를 선택하세요");
    } else if (newTodoInput.value.trim() === '') {
        alert("입력된 데이터가 없어용");
    } else {
        addTodo();
    }
});