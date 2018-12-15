export default function NewBodyView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'popup-body';

  //public api -----------------------------------------------------------------

  return {
    node,
  }

}
