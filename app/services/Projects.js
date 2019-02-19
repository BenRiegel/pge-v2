//imports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../lib/WebMercator.js';

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

export async function getSelectedProjects(selectedTag){
  var projects = await projectsReceived;
  var selectedProjects = projects.filter( project => {
    return project.tags.includes(selectedTag);
  });
  for (var selectedProject of selectedProjects){
    selectedProject.worldCoords = latLonToWebMercator(selectedProject.geoCoords);
  }
  return selectedProjects;
}
