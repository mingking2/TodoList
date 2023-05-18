import { showToday } from "./CalenderFunction.js";
import { Pointer } from "./CalenderFunction.js";


const date = new Date();

export const init = (date) => {
    makeCalender(date);
    Pointer();
}

const makeCalender = (date) => {
    /*새로운 Date객체를 생성할 때, 파라미터 date에 해당하는 부분에 0을 전달하게 되면, 지난달의 마지막 날의 Date 객체가 생성된다. */
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate(); // 지난달 마지막 날짜
    const PLDay = prevLast.getDay(); // 지난달 마지막 요일

    const TLDate = thisLast.getDate(); // 이번달 마지막 날짜
    const TLDay = thisLast.getDay(); // 이번달 마지막 요일


    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    // 0부터 TLDate까지의 숫자를 배열로 만들어준다. 
    // ... 은 배열의 각 요소를 분리하여 개별적인 값으로 만들어준다.
    // .keys()는 배열의 각 인덱스 번호를 차례대로 반환하여 사용자가 필요한 작업을 수행할 수 있도록 한다. 
    // slice(1)은 이 배열에서 첫번째 요소인 0을 제외하고 1부터 끝까지의 요소만을 남긴다.
    const nextDates = [];

    // 지난달 마지막 요일이 토요일이라면 그냥 첫번째인 월요일부터 채우면 되기때문에 반복문을 돌 필요가 없다.
    if (PLDay !== 6) {
        Array.from({ length: PLDay + 1 }, (_, i) => {
            prevDates.unshift(PLDate - i);
            // unshift 메서드를 통해 배열에 앞쪽으로 계속 채워넣는다.
        });
    }

    Array.from({ length: 6 - TLDay }, (_, i) => {
        nextDates.push(i + 1);
    });

    const dates = prevDates.concat(thisDates, nextDates);

    // Dates 정리
    const firstDataIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDataIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';

        dates[i] = `<span class="${condition}" data-date="${viewYear}-${viewMonth + 1}-${date}" data-day="${date}">${date}</span>`;
    })

    renderCalendar(dates);
    showToday(viewYear, viewMonth);
}

const renderCalendar = (dates) => {
    dates.forEach((date, i) => {
        dates[i] = `<div class="date">${date}</div>`;
    })
    document.querySelector('.dates').innerHTML = dates.join('');

    // 기존에 저장된 데이터 가져오기
    let storedData = localStorage.getItem('todoData');
    if (storedData) {
        storedData = JSON.parse(storedData);
        storedData.forEach((data) => {
            const day = data.selectedDate.split('-')[2];
            const thisDate = document.querySelector('.this[data-day="' + day + '"]');
            const yearMonth = document.querySelector('.year-month').textContent;
            const year = yearMonth.substring(0, 4);
            const month = yearMonth[6];
            if (thisDate && year === data.selectedDate.substring(0, 4) && month === data.selectedDate[5]) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                // dot.innerHTML="·";
                thisDate.parentNode.appendChild(dot);
            }
        })
    } else {
        storedData = [];
    }

}

init(date);