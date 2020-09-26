let previous = document.getElementById("previous");
let next = document.getElementById("next");
let image = document.getElementById("project-image");
let title = document.getElementById("project-title");
let description = document.getElementById("project-description");

let currentProject = 0;
let totalProjects = 2;

let images = ['research.jpeg', 'assembly-simulation.png'];
let titles = ['Research on Numerical Methods', 'Assembly Simulation'];
let descriptions = ["Comparative analysis of Euler, Euler-Richardson, Verlet and Runge-Kutta methods. A testing model was developed and the system was simulated, then produced relative error functions were approximated with linear regression.",
"A simulation of an assembly system that I proposed while working at ICL Techo. Instead of assembling computers consecutively, every member of the brigade assembles individually. With 6 people in the brigade, 232 seconds for full assembly, and 5 seconds for handover, the proposed system's efficiency is better by 28%."];

function update(index) {
    image.src = `src/images/${images[index]}`;
    title.innerHTML = titles[index];
    description.innerHTML = descriptions[index];
    if (index === 1) {
        image.style.height = "20vh";
    }
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