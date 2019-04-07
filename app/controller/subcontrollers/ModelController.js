//imports ----------------------------------------------------------------------

import model from '../../model/Model.js';


//module code block ------------------------------------------------------------

var loadTags = function(){
  return new Promise(async resolve => {
    var response = await fetch('./app/data/tags.json');
    model.tags = await response.json();
    resolve();
  });
};

var loadProjects = function(){
  return new Promise(async resolve => {
    var response = await fetch('./app/data/projects.json');
    model.projects = await response.json();
    resolve();
  });
};


//exports ----------------------------------------------------------------------

export function load(){
  var tagsLoaded = loadTags();
  var projectsLoaded = loadProjects();
  return Promise.all( [tagsLoaded, projectsLoaded] );
}
