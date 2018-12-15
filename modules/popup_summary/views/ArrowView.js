export default function NewArrowView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'arrow';

  //public api -----------------------------------------------------------------

  return {
    node,
    display: function(){
      node.style.display = 'block';
    },
    setNoDisplay: function(){
      node.style.display = 'none';
    }
  }

}
