//imports ----------------------------------------------------------------------

import { latLonToWebMercatorXY } from '../lib/web_mapping/WebMercator.js';


//module code block ------------------------------------------------------------

var projectsReceived = new Promise(async resolve => {
  var response = await fetch('./app/data/projects.json');
  var projects = await response.json();
  resolve(projects);
});


//exports ----------------------------------------------------------------------

export async function getLocationsList(){
  var projectsList = await projectsReceived;
  var graphicPropsList = [];
  for (var project of projectsList){
    var attributes = Object.assign({}, project);
    delete attributes.id;
    delete attributes.geoCoords;
    delete attributes.tags;
    var graphicProps = {
      id: project.id,
      worldCoords: latLonToWebMercatorXY(project.geoCoords),
      tags: project.tags,
      hasSelectedTag: undefined,
      attributes,
    }
    graphicPropsList.push(graphicProps);
  }
  return graphicPropsList;
}
