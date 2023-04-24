const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const currentDate = date.getDate();

const makeCalendar = () => {
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
    todaylast = TLDay;

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // 지난달 마지막 요일이 토요일이라면 그냥 첫번째인 월요일부터 채우면 되기때문에 반복문을 돌 필요가 없다.
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
            // unshift 메서드를 통해 배열에 앞쪽으로 계속 채워넣는다.
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    dates = prevDates.concat(thisDates, nextDates);

    // Dates 정리
    const firstDataIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDataIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';


        if (condition === 'this' && dates[i] === currentDate) {
            dates[i] = `<span class="${condition}" id="today">${date}</span>`;
        }
        else {
            dates[i] = `<span class="${condition}">${date}</span>`;
        }
    })
}



const renderCalendar = () => {
    dates.forEach((date, i) => {
        dates[i] = `<div class="date">${date}</div>`;
    })
    document.querySelector('.dates').innerHTML = dates.join('');
}

const moveMonth = (loc) => {
    date.setDate(1);
    loc === 0 ? date.setMonth(currentMonth) : date.setMonth(date.getMonth() + loc)
    init();
}

const init = () => {
    makeCalendar();
    renderCalendar();
}

init();
init();


