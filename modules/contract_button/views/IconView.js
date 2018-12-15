export default function NewIconView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = 'fa fa-compress';

  //public api -----------------------------------------------------------------

  return {
    node,
  }

}
