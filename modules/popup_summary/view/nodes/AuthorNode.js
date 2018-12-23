//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function AuthorNode(){

  //create dom element ---------------------------------------------------------

  var author = new DomElement('div', 'project-author');

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    var project = popupState.projectData;
    if (project.author){
      author.innerHTML = `by ${project.author}, ${project.university} University, ${project.year}`;
    } else {
      author.innerHTML = `written at ${project.university} University in ${project.year}`;
    }
  }

  //load reactions -------------------------------------------------------------

  // popupState.addListener('projectData', 'text', 'content', updateContent)

  //public api -----------------------------------------------------------------

  this.node = author.node;

  this.setContent = function(authorText){
    author.innerHTML = authorText;
  }

  this.render = function(){
    updateContent();
  };

}
