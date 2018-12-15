export default function NewIconView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = 'icon fa';

  //public api -----------------------------------------------------------------

  return {
    node,
    show: function(){
      node.style.visibility = 'visible';
    },
    hide: function(){
      node.style.visibility = 'hidden';
    },
    displayArrow: function(){
      node.classList.remove('fa-check');
      node.classList.add('fa-sort-desc');
    },
    displayCheck: function(){
      node.classList.remove('fa-sort-desc');
      node.classList.add('fa-check');
    }
  }
}
