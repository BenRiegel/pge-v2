export default function NewTitleView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'project-title';

  //public api -----------------------------------------------------------------

  return {
    node,
    setContent(titleText){
      node.innerHTML = titleText;
    },
  }

}
