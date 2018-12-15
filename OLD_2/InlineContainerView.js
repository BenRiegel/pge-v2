export default function NewInlineContainerView(){

  //private code block ---------------------------------------------------------

  var element = document.createElement('div');
  element.className = 'project-inline-container';

  //public api -----------------------------------------------------------------

  return {
    rootNode: element,
  }

}
