let previous = document.getElementById("previous");
let next = document.getElementById("next");
let image = document.getElementById("project-image");
let title = document.getElementById("project-title");
let description = document.getElementById("project-description");

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

let currentProject = 0;

let images = ['research.jpeg', 'assembly-simulation.png', 'panelbuilder.png'];
let titles = ['<a href="https://github.com/escape13/research" target="_blank">Research on Numerical Methods</a>', '<a href="https://github.com/escape13/assembly-simulation" target="_blank">Assembly Simulation</a>', '<a href="https://github.com/escape13/PanelBuilder" target="_blank">PanelBuilder</a>'];
let descriptions = ['Comparative analysis of Euler, Euler-Richardson, Verlet and Runge-Kutta methods. A testing model was developed and the system was simulated, then produced relative error functions were approximated with linear regression. <a href="https://github.com/escape13/research/blob/master/analysis_eng.pdf" target="_blank">Click here to read.</a>',
"A simulation of an assembly system that I proposed while working at ICL Techno. Instead of assembling computers consecutively, every member of the brigade assembles individually. With 6 people in the brigade, 232 seconds for full assembly, and 5 seconds for handover, the proposed system's efficiency is better by 28%.",
"An add-on for Blender 3D. Modeling paneled surfaces made easy. Developed while working in SouyzKhimPromProekt as a 3D artist. The petrochemical facility I was modeling had many similar paneled structures, so I wrote this add-on to automate the proccess of paneled surfaces generation."
];

let totalProjects = titles.length;

function update(index) {
    image.src = `src/images/${images[index]}`;
    title.innerHTML = titles[index];
    description.innerHTML = descriptions[index];
}

previous.onclick = () => {
    currentProject--;
    if (currentProject < 0) {
        currentProject = totalProjects - 1;
    }
    update(currentProject);
}

next.onclick = () => {
    currentProject++;
    if (currentProject > totalProjects - 1) {
        currentProject = 0;
    }
    update(currentProject);
}

function nextKeyboard() {
    currentProject++;
    if (currentProject > totalProjects - 1) {
        currentProject = 0;
    }
    update(currentProject);
}

document.onkeypress = nextKeyboard;