function toggleProjects(element) {
const icon = element.querySelector('.toggle-icon');
const projectList = element.parentElement.nextElementSibling;

if (projectList.style.display === 'none') {
projectList.style.display = 'block';
icon.textContent = '-';
} else {
projectList.style.display = 'none';
icon.textContent = '+';
}
}