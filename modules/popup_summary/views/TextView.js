export default function NewTextView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = 'project-text';

  //public api -----------------------------------------------------------------

  return {
    node,
    setContent(projectText){
      node.innerHTML = projectText;
    },
  }

}
