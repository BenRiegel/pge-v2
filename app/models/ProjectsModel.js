//module code block ------------------------------------------------------------

var projectsReceived = new Promise(async resolve => {
  var response = await fetch('./app/assets/data/projects.json');
  var projects = await response.json();
  resolve(projects);
});


//exports ----------------------------------------------------------------------

export async function getProjectData(index){
  var projects = await projectsReceived;
  return projects[index];
}

export async function getSelectedProjects(selectedTag){
  var projects = await projectsReceived;
  var selectedProjects = [];
  for (var project of projects){
    var isSelected = project.tags.includes(selectedTag);
    if (isSelected){
      selectedProjects.push(project);
    }
  }
  return selectedProjects;
}
