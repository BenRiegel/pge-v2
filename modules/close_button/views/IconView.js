export default function NewIconView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = 'fa fa-times';

  //public api -----------------------------------------------------------------

  return {
    node,
  }

}
