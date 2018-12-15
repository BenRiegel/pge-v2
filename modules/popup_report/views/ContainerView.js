export default function NewContainerView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'report-window';

  //public api -----------------------------------------------------------------

  return {
    node,
    show: function(){
      node.style.visibility = 'visible';
    },
    hide: function(){
      node.style.visibility = 'hidden';
    },
  }
}
