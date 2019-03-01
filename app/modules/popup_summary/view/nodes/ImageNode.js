//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/image.scss';


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

export default function ImageNode(popupState, summaryState){

  //create dom element ---------------------------------------------------------

  var image = new DomElement('img', 'project-image');

  image.resize = function(){
    var [width, height] = calculateRescaledDimensions(this.node);
    this.setStyle('width', `${width}px`);
    this.setStyle('height', `${height}px`);
  }

  //define state change reactions ----------------------------------------------

  var updateContent = async function(){
    await new Promise(resolve => {
      var contentLoaded = evt => {
        image.removeEventListener('load', contentLoaded);
        image.resize();
        resolve();
      }
      image.addEventListener('load', contentLoaded);
      image.src = popupState.projectData.introImageUrl;
    });
  };

  //load reactions -------------------------------------------------------------

  popupState.addListener('projectData', 'image - content', updateContent);

  //public api -----------------------------------------------------------------

  return image;

}
