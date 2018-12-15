export default function NewLabelContainerView(isIndented){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'label';

  //public api -----------------------------------------------------------------

  return {
    node,
    showIndent: function(){
      if (isIndented){
        node.classList.remove('indent-right');
        node.classList.add('indent-left');
      }
    },
    hideIndent: function(){
      if (isIndented){
        node.classList.remove('indent-left');
        node.classList.add('indent-right');
      }
    },
  }
}
