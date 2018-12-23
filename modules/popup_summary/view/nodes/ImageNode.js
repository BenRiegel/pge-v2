//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//module code block ------------------------------------------------------------

var calculateRescaledDimensions = function( {naturalWidth, naturalHeight} ){
  const maxImageWidth = 200;
  const maxImageHeight = 125;
  var ratio = naturalWidth / naturalHeight;
  if (ratio > (maxImageWidth / maxImageHeight)){
    var newWidth = maxImageWidth;
    var newHeight = newWidth / ratio;
  } else {
    var newHeight = maxImageHeight;
    var newWidth = ratio * newHeight;
  }
  return [newWidth, newHeight];
};


//exports ----------------------------------------------------------------------

export default function ImageNode(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('img');
  node.className = 'project-image';

  //public api -----------------------------------------------------------------

  return {
    node,
    load: async function(imageUrl){
      await new Promise( resolve => {
        var contentLoaded = evt => {
          node.removeEventListener('load', contentLoaded);
          resolve();
        }
        node.addEventListener('load', contentLoaded);
        node.src = imageUrl;
      });
    },
    resize: function(){
      var [width, height] = calculateRescaledDimensions(node);
      node.style.height = `${height}px`;
      node.style.width = `${width}px`;
    },
  }

}
