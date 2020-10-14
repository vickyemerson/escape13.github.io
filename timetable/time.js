const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const times = ['8.30 - 9.10', '9.15 - 9.55', '10.15 - 10.55', '11.15 - 11.55', '12.15 - 12.55', '13.15 - 13.55', '14.05 - 14.45', '14.50 - 15.25', '15.30 - 16.10', '16.15 - 16.55'];
const start = [510, 555, 615, 675, 735, 795, 845, 890, 930, 975];
const end = [550, 595, 655, 715, 775, 835, 885, 925, 970, 1015];
const subjects = [
    [],
    ['Физика', 'ОБЖ', 'Математика', 'Математика', 'Физ-ра', 'Физ-ра', 'Английский'],
    ['Родная Литература', 'Литература', 'Информатика', 'Информатика', 'Общество', 'Общество'],
    ['История', 'История', 'Английский', 'Английский', 'Химия', 'Родной'],
    ['Физика', 'Физика', 'СОЧ', 'Математика', 'Математика', 'Биология', 'Литература'],
    ['Информатика', 'Информатика', 'СОЧ', 'Математика', 'Математика', 'Физика', 'Русский'],
    ['Литература', 'Хореография', 'СОЧ', 'Математика', 'Математика', 'Физика', 'Физика']
];
const lessonStart = [0, 0, 0, 0, 0, 0, 0];

let container = document.getElementById('timetable');
let timer = document.getElementById('timer');

let alwaystoday = new Date();

function update_status() {
    if (weekday_init == alwaystoday.getDay()) {
        highlightCurrentLesson(weekday_init);
        highlightCurrentBreak(weekday_init);
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
            container.innerHTML += `<div class="subject" id="subject${i}"><hr><h3>${subjects[dayOfWeek][i]}</h3><p>${times[i + lessonStart[dayOfWeek]]}</p><hr id="midbreak1"></div>`;
            midbreak = 1;
        } else if (i == subjects[dayOfWeek].length - 1) {
            container.innerHTML += `<div class="subject" id="subject${i}"><h3>${subjects[dayOfWeek][i]}</h3><p>${times[i + lessonStart[dayOfWeek]]}</p></div>`;
        } else {
            midbreak++;
            container.innerHTML += `<div class="subject" id="subject${i}"><h3>${subjects[dayOfWeek][i]}</h3><p>${times[i + lessonStart[dayOfWeek]]}</p><hr id="midbreak${midbreak}"></div>`;
        }
    }
}

function highlightCurrentLesson(dayOfWeek) {
    for (let i = 0; i < subjects[dayOfWeek].length; ++i) {
        let td = new Date();
        hours = td.getHours();
        mins = td.getMinutes();
        let timeToMins = hours * 60 + mins;
        if (timeToMins >= start[i + lessonStart[dayOfWeek]] && timeToMins < end[i + lessonStart[dayOfWeek]]) {
            let currentLesson = document.getElementById(`subject${i}`);
            if (i == 0) {
                currentLesson.innerHTML = `<hr><h3 style="color: blue">${subjects[dayOfWeek][i]}</h3><p>${times[i + lessonStart[dayOfWeek]]}</p><hr>`;
            } else if (i == subjects[dayOfWeek].length - 1) {
                currentLesson.innerHTML = `<h3 style="color: blue">${subjects[dayOfWeek][i]}</h3><p>${times[i + lessonStart[dayOfWeek]]}</p>`;
            } else {
                currentLesson.innerHTML = `<h3 style="color: blue">${subjects[dayOfWeek][i]}</h3><p>${times[i + lessonStart[dayOfWeek]]}</p><hr>`;
            }
        }
    }
}

function highlightCurrentBreak(dayOfWeek) {
    for (let i = 0; i < subjects[dayOfWeek].length - 1; ++i) {
        hours = alwaystoday.getHours();
        mins = alwaystoday.getMinutes();
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
    let lessonsEnd = end[subjects[dayweek].length - 1];
    let lessonsStart = start[lessonStart[dayweek]];
    if (today.getHours() * 60 + today.getMinutes() >= lessonsStart && today.getHours() * 60 + today.getMinutes() < lessonsEnd) {
        for (let i = 0; i < subjects[dayweek].length; i++) {
            let currentTime = new Date();
            if (currentTime.getHours() * 60 + currentTime.getMinutes() >= start[i + lessonStart[dayweek]] && currentTime.getHours() * 60 + currentTime.getMinutes() < end[i + lessonStart[dayweek]]) {
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
    for (let i = 0; i < subjects[dayweek].length - 1; i++) {
        if (today.getHours() * 60 + today.getMinutes() >= end[i + lessonStart[dayweek]] && today.getHours() * 60 + today.getMinutes() < start[i + 1 + lessonStart[dayweek]]) {
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

var today_init = new Date();
var weekday_init = today_init.getDay();
var hours_init = today_init.getHours();
var mins_init = today_init.getMinutes();

let timetomin_init = hours_init * 60 + mins_init;
let lessonsFinished = false;
if (weekday_init === 0) {
    weekday_init = 1;
} else {
    if (timetomin_init >= end[subjects[weekday_init].length - 1 + lessonStart[weekday_init]]) {
        weekday_init++;
        if (weekday_init === 7) weekday_init = 1;
        lessonsFinished = true;
    }
}


update(weekday_init);

if (alwaystoday.getDay() != 0 && !lessonsFinished) highlightCurrentLesson(weekday_init);
if (alwaystoday.getDay() != 0 && !lessonsFinished) highlightCurrentBreak(weekday_init);

timeToEndLesson();
timeToStartLesson();

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 37) {
        weekday_init--;
        if (weekday_init === 0) weekday = 6;
        update(weekday_init);
        let today = new Date();
        if (weekday_init === today.getDay()) {
            highlightCurrentLesson(weekday_init);
            highlightCurrentBreak(weekday_init);
        }
    }
    if (e.keyCode === 39) {
        weekday_init++;
        if (weekday_init === 7) weekday_init = 1;
        update(weekday_init);
        let today = new Date();
        if (weekday_init === today.getDay()) {
            highlightCurrentLesson(weekday_init);
            highlightCurrentBreak(weekday_init);
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
        console.log(weekday_init);
        weekday_init++;
        if (weekday_init === 7) weekday_init = 1;
        update(weekday_init);
        let today = new Date();
        if (weekday_init === today.getDay()) {
            highlightCurrentLesson(weekday_init);
            highlightCurrentBreak(weekday_init);
        }
    }
    
    if (touchendX >= touchstartX && ((touchendX - touchstartX) / (Math.abs(touchstartY - touchendY))) >= 1) {
        weekday_init--;
        if (weekday_init === 0) weekday_init = 6;
        update(weekday_init);
        let today = new Date();
        if (weekday_init === today.getDay()) {
            highlightCurrentLesson(weekday_init);
            highlightCurrentBreak(weekday_init);
        }
    }
}
