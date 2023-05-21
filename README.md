# TodoList
캘린더 기능 구현 및 ToDoList 추가

## Languages
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

## REST API
[![json-server](https://img.shields.io/badge/json--server-v0.16.3-orange)](https://github.com/typicode/json-server)

## WebSite URL
배포는 못할듯 ㅋㅋ

## 조건
1. 모듈 번들러 사용 (Parcel, Webpack)
2. 가짜 API Server (데이터 저장)
3. 달력, 투두리스트

## 피드백

<details>
<summary>2023-04-09 피드백</summary>
<div markdown="1">
 
1. Today Calender
    - Timer 변수 지정
    - 기능을 함수로 구현
    - init.js에서 한 번에 불러오기
    - js 파일 분리
2. Calender with TodoList
    - date 재할당 방식말고 const로 선언하고 생각해보기
    - page 이동 통합
    - 함수 분리 → 함수는 한가지의 기능만 수행하도록
 
</div>
</details>

<details>
<summary>2023-05-01 피드백</summary>
<div markdown="1">
 
1. 오늘 날짜만 표시되게 수정 
2. moveMonth 메서드 분리 → 새로운 js파일
3. 날짜 출력 전역에서 끌어와서 사용
4. 오늘 날짜는 따로 구현
5. 년도가 바뀌고 투데이 버튼을 눌렀을 때 오류
6. for문 쓰지말고 forEach 문으로 교체
 
</div>
</details>
 
<details>
<summary>2023-05-07 피드백</summary>
<div markdown="1">

1. 함수가 함수를 너무 많이 호출한다. (하나의 함수는 하나의 역할만)
2. TodoList 기능이 너무 부실하다.
    - 할 일 추가하면 캘린더 해당 날짜에 표기, 날짜 누르면 할 일 목록 출력
    - 할 일 목록 전체 출력 금지 -> 너무 더러움
    - 할 일 추가할 때 개별 삭제 기능으로 변경
    - 할 일 각각의 체크리스트 기능 추가
3. Local Storage 사용 / 파일 저장
    - DB 대신 쓰는 것
    - [https://www.daleseo.com/js-web-storage/](https://www.daleseo.com/js-web-storage/)
4. javascript 식별자 규칙
    1. `생성자함수는 파스칼 표기법을 사용합니다` → js파일명도
    2. `변수와 인스턴스, 함수, 메서드의 이름은 카멜표기법을 사용합니다`
    
    ▶  파스칼 표기법 설명
    
    첫번째를 대문자로하면서 단어가 이어지는 부분을 대문자로 합니다. 카멜표기법과 다른점은 첫번째 문자를 대문자로 한다는 것입니다. 보통 생성자함수 외에는 카멜표기법을 사용합니다.
    
    GoToSchool
    
    HeLoveKorea
    
    ▶ 카멜표기법
    
    첫번째를 소문자로하면서 단어가 이어지는 부분을 대문자로 합니다. 인스턴스와 함수, 메서드에 사용하고 있습니다.
    
    goToSchool
    
    heLoveKorea
    
    - 출처 : [https://copll.tistory.com/122](https://copll.tistory.com/122)

</div>
</details>


<details>
<summary>2023-05-21 피드백</summary>
<div markdown="1">
 
1. 과연 두구두구
 
</div>
</details>


