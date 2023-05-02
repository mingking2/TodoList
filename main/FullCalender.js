const date = new Date();

export const init = (date) => makeCalendar(date);

const makeCalendar = (date) => {
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
    const nextDates = [];

    // 지난달 마지막 요일이 토요일이라면 그냥 첫번째인 월요일부터 채우면 되기때문에 반복문을 돌 필요가 없다.
    if (PLDay !== 6) {
        Array.from({length: PLDay + 1 }, (_,i) => {
            prevDates.unshift(PLDate - i);
            // unshift 메서드를 통해 배열에 앞쪽으로 계속 채워넣는다.
        });
    }

    Array.from({length: 6-TLDay}, (_,i) => {
        nextDates.push(i+1);
    }); 

    // for (let i = 1; i < 7 - TLDay; i++) {
        
    // }

    const dates = prevDates.concat(thisDates, nextDates);

    // Dates 정리
    const firstDataIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDataIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';

        dates[i] = `<span class="${condition}">${date}</span>`;
        // 오늘은 따로 뺀다
    })

    renderCalendar(dates);
}

const renderCalendar = (dates) => {
    dates.forEach((date, i) => {
        dates[i] = `<div class="date">${date}</div>`;
    })
    document.querySelector('.dates').innerHTML = dates.join('');
}

init(date);