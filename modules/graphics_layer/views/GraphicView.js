export default function NewView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'graphic';

  //public api -----------------------------------------------------------------

  return {
    node,
    show: function(){
      node.style.visibility = 'visible';
    },
    hide: function(){
      node.style.visibility = 'hidden';
    },
    setScreenPosition: function(x, y){
      node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
    },
    setWidth: function(width){
      node.style.width = `${width}px`;
    },
    setHeight: function(height){
      node.style.width = `${height}px`;
    },
    setNumber: function(num){
      node.innerHTML = num;
    },
    setKey: function(key){
      node.dataset.key = key;
    },
    setType: function(type){
      node.dataset.type = type;
    },
  };
}
