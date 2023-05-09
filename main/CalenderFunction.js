import { init } from "./FullCalender.js";
import { settingDate } from "./TodoListFunction.js";

const date_move = new Date();
const currentMonth_move = date_move.getMonth();

const prev_btn = document.querySelector('.go-prev');
const today_btn = document.querySelector('.go-today');
const next_btn = document.querySelector('.go-next');

prev_btn.addEventListener('click', () => {
    moveMonth(-1);
});

today_btn.addEventListener('click', () => {
    moveMonth(0);
});

next_btn.addEventListener('click', () => {
    moveMonth(1);
});

const moveMonth = (loc) => {
    date_move.setDate(1); // 해당 월의 첫번째 날짜로 설정
    settingDate(null);
    if (loc === 0) {
        date_move.setMonth(currentMonth_move);
        date_move.setFullYear(new Date().getFullYear()); // 현재 연도로 설정
    } else {
        date_move.setMonth(date_move.getMonth() + loc);
    }
    // setyear 추가
    init(date_move);
}


export const showToday = (viewYear, viewMonth) => {
    const today = new Date();
    const thisDates = document.querySelectorAll(".this");
    if (thisDates.length > 0) {
        if (today.getFullYear() === viewYear && today.getMonth() === viewMonth) {
            Array.from({ length: thisDates.length }, (_, i) => {
                if (today.getDate() == thisDates[i].textContent.match(/\d+/g)) {
                    thisDates[i].id = "today";
                }
            });
        }
    }
}

export const Pointer = () => {
    let activeCell = null;  // 현재 선택된 셀을 저장하는 변수

    const cells = document.querySelectorAll(".date");

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            const spanThis = cell.querySelector("span.this");
            if (spanThis) {
                // 현재 셀에 active 클래스가 있는지 확인
                const isActive = cell.classList.contains("active");

                // active 클래스가 없으면 추가하고 있으면 삭제
                if (!isActive) {
                     // 기존에 선택된 셀이 있다면 active 클래스 제거
                     if (activeCell) {
                        activeCell.classList.remove("active");
                    }
                    // 현재 선택된 셀을 저장하고 active 클래스 추가
                    activeCell = cell;
                    cell.classList.add("active");

                    // 선택한 날짜 출력
                    const click_data = spanThis.dataset.date;
                    console.log("선택한 날짜: ", click_data);

                    // 클릭한 날짜를 settingDate 함수로 전달
                    settingDate(click_data);
                } else {
                    activeCell = null;
                    cell.classList.remove("active");
                    settingDate(null);
                }

            }
        });
    });
}

