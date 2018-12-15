export default function NewIconContainerView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'icon-container';

  //public api -----------------------------------------------------------------

  return {
    node,
    showBorder: function(){
      node.classList.add('border');
    },
    hideBorder: function(){
      node.classList.remove('border');
    },
  }
}
