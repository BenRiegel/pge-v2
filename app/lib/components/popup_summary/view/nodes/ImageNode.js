//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/image.scss';


//exports ----------------------------------------------------------------------

export default class ImageNode extends DomNode{
  constructor(){
    super('img', 'project-image');
  }
  resize(){
    const MAX_IMAGE_WIDTH = 200;
    const MAX_IMAGE_HEIGHT = 125;
    var ratio = this.node.naturalWidth / this.node.naturalHeight;
    if (ratio > (MAX_IMAGE_WIDTH / MAX_IMAGE_HEIGHT)){
      var newWidth = MAX_IMAGE_WIDTH;
      var newHeight = newWidth / ratio;
    } else {
      var newHeight = MAX_IMAGE_HEIGHT;
      var newWidth = ratio * newHeight;
    }
    this.setStyle('width', `${newWidth}px`);
    this.setStyle('height', `${newHeight}px`);
  }
}
