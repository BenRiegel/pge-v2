//module code block ------------------------------------------------------------

var projectsReceived = new Promise(async resolve => {
  var response = await fetch('./app/assets/data/projects.json');
  var projects = await response.json();
  resolve(projects);
});


//exports ----------------------------------------------------------------------

export { projectsReceived };

export async function getProjectData(index){
  var projects = await projectsReceived;
  return projects[index];
}
