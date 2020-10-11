const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const times = ['8.30 - 9.10', '9.15 - 9.55', '10.15 - 10.55', '11.15 - 11.55', '12.15 - 12.55', '13.15 - 13.55', '14.05 - 14.45'];
const numLessons = [0, 7, 6, 6, 7, 7, 7];
const start = [510, 555, 615, 675, 735, 795, 845];
const end = [550, 595, 655, 715, 775, 835, 885];
const subjects = [
    [],
    ['Физика', 'ОБЖ', 'Математика', 'Математика', 'Физ-ра', 'Физ-ра', 'Английский'],
    ['Родная Литература', 'Литература', 'Информатика', 'Информатика', 'Общество', 'Общество'],
    ['История', 'История', 'Английский', 'Английский', 'Химия', 'Родной'],
    ['Физика', 'Физика', 'СОЧ', 'Математика', 'Математика', 'Биология', 'Литература'],
    ['Информатика', 'Информатика', 'СОЧ', 'Математика', 'Математика', 'Физика', 'Русский'],
    ['Литература', 'Хореография', 'СОЧ', 'Математика', 'Математика', 'Физика', 'Физика']
];

let container = document.getElementById('timetable');
let timer = document.getElementById('timer');

let alwaystoday = new Date();

function update_status() {
    if (weekday == alwaystoday.getDay()) {
        highlightCurrentLesson(weekday);
        highlightCurrentBreak(weekday);
    }
    timeToStartLesson();
    timeToEndLesson();
}
setInterval(update_status, 1000);

function update(dayOfWeek) {
    container.innerHTML = `<h1>${days[dayOfWeek]}</h1>`;
    let midbreak;
    for (let i = 0; i < subjects[dayOfWeek].length; i++) {
        if (i == 0) {
            container.innerHTML += `<div class="subject" id="subject${i}"><hr><h3>${subjects[dayOfWeek][i]}</h3><p>${times[i]}</p><hr id="midbreak1"></div>`;
            midbreak = 1;
        } else if (i == subjects[dayOfWeek].length - 1) {
            container.innerHTML += `<div class="subject" id="subject${i}"><h3>${subjects[dayOfWeek][i]}</h3><p>${times[i]}</p></div>`;
        } else {
            midbreak++;
            container.innerHTML += `<div class="subject" id="subject${i}"><h3>${subjects[dayOfWeek][i]}</h3><p>${times[i]}</p><hr id="midbreak${midbreak}"></div>`;
        }
    }
}

let highlightCurrentLesson = weekday => {
    for (let i = 0; i < numLessons[weekday]; ++i) {
        hours = today.getHours();
        mins = today.getMinutes();
        let timeToMins = hours * 60 + mins;
        if (timeToMins >= start[i] && timeToMins < end[i]) {
            let currentLesson = document.getElementById(`subject${i}`);
            if (i == 0) {
                currentLesson.innerHTML = `<hr><h3 style="color: blue">${subjects[weekday][i]}</h3><p>${times[i]}</p><hr>`;
            } else if (i == subjects[weekday].length - 1) {
                currentLesson.innerHTML = `<h3 style="color: blue">${subjects[weekday][i]}</h3><p>${times[i]}</p>`;
            } else {
                currentLesson.innerHTML = `<h3 style="color: blue">${subjects[weekday][i]}</h3><p>${times[i]}</p><hr>`;
            }
        }
    }
}

let highlightCurrentBreak = weekday => {
    for (let i = 0; i < numLessons[weekday] - 1; ++i) {
        hours = today.getHours();
        mins = today.getMinutes();
        let timeToMins = hours * 60 + mins;
        if (timeToMins >= end[i] && timeToMins < start[i + 1]) {
            let hr = document.getElementById(`midbreak${i + 1}`);
            hr.style.color = 'blue';
            hr.style.backgroundColor = 'blue';
            hr.style.height = '2px';
        }
    }
}

// time left to end of the lesson
function timeToEndLesson() {
    today = new Date();
    let dayweek = today.getDay();
    let lessonsEnd = numLessons[dayweek] === 6 ? 835 : 885;
    if (today.getHours() * 60 + today.getMinutes() >= 510 && today.getHours() * 60 + today.getMinutes() < lessonsEnd) {
        for (let i = 0; i < numLessons[dayweek]; i++) {
            let currentTime = new Date();
            if (currentTime.getHours() * 60 + currentTime.getMinutes() >= start[i] && currentTime.getHours() * 60 + currentTime.getMinutes() < end[i]) {
                timer.style.display = "block";
                timer.innerHTML = "До конца урока: <br><br> ";
                let hours = currentTime.getHours();
                let mins = currentTime.getMinutes();
                let seconds = currentTime.getSeconds();
                let timeSeconds = hours * 3600 + mins * 60 + seconds;
                let difference = end[i] * 60 - timeSeconds;
                let minsLeft = Math.floor(difference / 60);
                let secondsLeft = difference % 60;
                if (minsLeft < 10) {
                    timer.innerHTML += `0${minsLeft} `;
                } else {
                    timer.innerHTML += `${minsLeft} `;
                }
                
                if (secondsLeft < 10) {
                    timer.innerHTML += `: 0${secondsLeft}`;
                } else {
                    timer.innerHTML += `: ${secondsLeft}`;
                }
                if (minsLeft == 0 && secondsLeft == 1) document.location.reload();
            }    
        }
    }
}

// time left to the start of the lesson
function timeToStartLesson() {
    today = new Date();
    let dayweek = today.getDay();
    for (let i = 0; i < numLessons[dayweek] - 1; i++) {
        if (today.getHours() * 60 + today.getMinutes() >= end[i] && today.getHours() * 60 + today.getMinutes() < start[i + 1]) {
            timer.style.display = "block";
            timer.innerHTML = "До начала урока: <br><br>"
            let hours = today.getHours();
            let mins = today.getMinutes();
            let seconds = today.getSeconds();
            let timeSeconds = hours * 3600 + mins * 60 + seconds;
            let difference = start[i + 1] * 60 - timeSeconds;
            let minsLeft = Math.floor(difference / 60);
            let secondsLeft = difference % 60;
            if (minsLeft < 10) {
                timer.innerHTML += `0${minsLeft} `;
            } else {
                timer.innerHTML += `${minsLeft} `;
            }
                
            if (secondsLeft < 10) {
                timer.innerHTML += `: 0${secondsLeft}`;
            } else {
                timer.innerHTML += `: ${secondsLeft}`;
            }
            if (minsLeft == 0 && secondsLeft == 1) document.location.reload();
        }
    }
}

// initial load

var today = new Date();
var weekday = today.getDay();
if (weekday === 0) {
    weekday = 1;
}
var hours = today.getHours();
var mins = today.getMinutes();
if ((weekday === 2 || weekday === 3) && (hours * 60 + mins > 835)) {
    weekday++;
} else if (hours * 60 + mins >= 885 && weekday - 1 != 0) {
    weekday++;
}

update(weekday);

today = new Date();
weekday = today.getDay();

if (weekday != 0) highlightCurrentLesson(weekday);
if (weekday != 0) highlightCurrentBreak(weekday);

timeToEndLesson();
timeToStartLesson();
if (weekday === 0) weekday = 1;
// interaction

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 37) {
        weekday--;
        if (weekday === 0) weekday = 6;
        update(weekday);
        let today = new Date();
        if (weekday === today.getDay()) {
            highlightCurrentLesson(weekday);
            highlightCurrentBreak(weekday);
        }
    }
    if (e.keyCode === 39) {
        weekday++;
        if (weekday === 7) weekday = 1;
        update(weekday);
        let today = new Date();
        if (weekday === today.getDay()) {
            highlightCurrentLesson(weekday);
            highlightCurrentBreak(weekday);
        }
    }
}

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementById('navigation');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX <= touchstartX && ((touchstartX - touchendX) / (Math.abs(touchstartY - touchendY))) >= 1) {
        console.log(weekday);
        weekday++;
        if (weekday === 7) weekday = 1;
        update(weekday);
        let today = new Date();
        if (weekday === today.getDay()) {
            highlightCurrentLesson(weekday);
            highlightCurrentBreak(weekday);
        }
    }
    
    if (touchendX >= touchstartX && ((touchendX - touchstartX) / (Math.abs(touchstartY - touchendY))) >= 1) {
        weekday--;
        if (weekday === 0) weekday = 6;
        update(weekday);
        let today = new Date();
        if (weekday === today.getDay()) {
            highlightCurrentLesson(weekday);
            highlightCurrentBreak(weekday);
        }
    }
}



