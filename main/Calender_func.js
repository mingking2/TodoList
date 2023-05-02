import { init } from "./FullCalender.js";

const date_move = new Date();
const currentMonth_move = date_move.getMonth();

const moveMonth = (loc) => {
    date_move.setDate(1); // 해당 월의 첫번째 날짜로 설정
    if (loc === 0) {
        date_move.setMonth(currentMonth_move);
        date_move.setFullYear(new Date().getFullYear()); // 현재 연도로 설정
      } else {
        date_move.setMonth(date_move.getMonth() + loc);
      }
    // setyear 추가
    init(date_move);
}

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