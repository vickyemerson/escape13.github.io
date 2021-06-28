let previous = document.getElementById("previous");
let next = document.getElementById("next");
let image = document.getElementById("project-image");
let title = document.getElementById("project-title");
let description = document.getElementById("project-description");
let dots = document.getElementById("dots");

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

let currentProject = 0;

let images = ['research.jpeg', 'assembly-simulation.png', 'panelbuilder.png', 'timetable.png'];
let titles = ['<a href="https://github.com/vickyemerson/research" target="_blank">Research on Numerical Methods</a>', '<a href="https://github.com/vickyemerson/assembly-simulation" target="_blank">Assembly Simulation</a>', '<a href="https://github.com/vickyemerson/PanelBuilder" target="_blank">PanelBuilder</a>', '<a href="https://github.com/lobachnet/lobachnet.github.io" target="_blank">TimeTable</a>'];
let descriptions = ['Comparative analysis of Euler, Euler-Richardson, Verlet and Runge-Kutta methods. <a href="https://github.com/vickyemerson/research/blob/master/analysis_eng.pdf" target="_blank">Click here to read.</a>',
"A simulation of an assembly system that I proposed while working at ICL Techno. Instead of assembling computers consecutively, every member of the brigade assembles individually. With 6 people in the brigade, 232 seconds for full assembly, and 5 seconds for handover, the proposed system's efficiency is better by 28%.",
"An add-on for Blender 3D. Modeling paneled surfaces made easy. Developed while working at SouyzKhimPromProekt as a 3D artist. The petrochemical facility I was modeling had many similar paneled structures, so I wrote this add-on to automate the proccess of paneled surfaces generation.",
"A timetable website for my school. It automatically opens the needed day whenever you go on the webiste, shows the current lesson and time until the ending, and breaks and time until the start of the next lesson. You can add your class to favorites/bookmarks to access it ASAP."
];

let totalProjects = titles.length;

for (let i = 0; i < totalProjects; ++i) {
    dots.innerHTML += `<div id="dot${i + 1}" class="dot"></div>`;
}

function calculateLength() {
    return 15 * totalProjects + (totalProjects - 1) * 6;
}

let galleryWidth = document.getElementById("project-container").offsetWidth;
dots.style.position = "relative";
dots.style.left = `${(galleryWidth - calculateLength()) / 2}px`;

let dot_elements = []
for (let i = 0; i < totalProjects; ++i) {
    let tmp = document.getElementById(`dot${i + 1}`);
    dot_elements.push(tmp);
}

dot_elements[0].style.backgroundColor = "lime";

function update_status() {
    let galleryWidth = document.getElementById("project-container").offsetWidth;
    dots.style.position = "relative";
    dots.style.left = `${(galleryWidth - calculateLength()) / 2}px`;
    let galleryHeight = document.getElementById("outer-project").offsetHeight;
    let projectHeight = document.getElementById("project").offsetHeight;
    for (let i = 0; i < totalProjects; ++i) {
        dot_elements[i].style.top = `${galleryHeight - projectHeight - 40}px`
    }
}
setInterval(update_status, 100);

function update(index, current_index) {
    image.src = `src/images/${images[index]}`;
    title.innerHTML = titles[index];
    description.innerHTML = descriptions[index];
    dot_elements[current_index].style.backgroundColor = "black";
    dot_elements[index].style.backgroundColor = "lime";
}

previous.onclick = () => {
    let current_index = currentProject;
    currentProject--;
        if (currentProject < 0) {
            currentProject = totalProjects - 1;
        }
        update(currentProject, current_index);
        update_status();
}

next.onclick = () => {
    let current_index = currentProject;
    currentProject++;
        if (currentProject > totalProjects - 1) {
            currentProject = 0;
        }
        update(currentProject, current_index);
        update_status();
} 

for (let i = 0; i < totalProjects; ++i) {
    dot_elements[i].onclick = () => {
        let current_index = currentProject;
        currentProject = i;
        update(currentProject, current_index);
        update_status();
    }
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    let current_index = currentProject;
    if (e.keyCode === 37) {
        currentProject--;
        if (currentProject < 0) {
            currentProject = totalProjects - 1;
        }
        update(currentProject, current_index);
        update_status();
    } else if (e.keyCode === 39) {
        currentProject++;
        if (currentProject > totalProjects - 1) {
            currentProject = 0;
        }
        update(currentProject, current_index);
        update_status();
    } else {
        currentProject++;
        if (currentProject > totalProjects - 1) {
            currentProject = 0;
        }
        update(currentProject, current_index);
        update_status();
    }
}

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementById('project-container');

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
    let current_index = currentProject
    if (touchendX <= touchstartX && ((touchstartX - touchendX) / (Math.abs(touchstartY - touchendY))) >= 1.6) {
        currentProject++;
        if (currentProject > totalProjects - 1) {
            currentProject = 0;
        }
        update(currentProject, current_index);
        update_status();
    }
    
    if (touchendX >= touchstartX && ((touchendX - touchstartX) / (Math.abs(touchstartY - touchendY))) >= 1.6) {
        currentProject--;
        if (currentProject < 0) {
            currentProject = totalProjects - 1;
        }
        update(currentProject, current_index);
        update_status();
    }
}