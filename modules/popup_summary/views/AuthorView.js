export default function NewAuthorView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'project-author';

  //public api -----------------------------------------------------------------

  return {
    node,
    setContent(authorText){
      node.innerHTML = authorText;
    },
  }

}
