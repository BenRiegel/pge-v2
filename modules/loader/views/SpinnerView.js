export default function NewSpinnerView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'spinner';

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
