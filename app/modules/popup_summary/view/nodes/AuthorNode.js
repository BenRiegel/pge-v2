//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function AuthorNode(popupState){

  //create dom element ---------------------------------------------------------

  var author = new DomElement('div', 'project-author');

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    if (popupState.projectData){
      var project = popupState.projectData;
      if (project.author){
        author.innerHTML = `by ${project.author}, ${project.university} University, ${project.year}`;
      } else {
        author.innerHTML = `written at ${project.university} University in ${project.year}`;
      }
    }
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('projectData', 'author', 'content', updateContent)

  //public api -----------------------------------------------------------------

  this.node = author.node;

  this.render = function(){
    updateContent();
  };

}
