let previous = document.getElementById("previous");
let next = document.getElementById("next");

let currentProject = 0;
let totalProjects = 2;

previous.onclick = () => {
    currentProject--;
    if (currentProject < 0) {
        currentProject = totalProjects - 1;
    }
}

next.onclick = () => {
    currentProject++;
    if (currentProject > totalProjects - 1) {
        currentProject = 0;
    }
}