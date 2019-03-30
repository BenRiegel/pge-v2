//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeInput{
  constructor(){
    super('div', 'basemap-layer');
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }
  mouseMoveHandler(evt){
    this.notify('mousemove', evt.clientX, evt.clientY);
  }
  mouseDownHandler(evt){
    this.setStyle('cursor', 'move');
    this.node.addEventListener('mousemove', this.mouseMoveHandler);
    this.notify('mousedown', evt.clientX, evt.clientY);
  }
  /*mouseOutHandler(evt){
    console.log('mouse out');
    this.setStyle('cursor', 'default');
    this.node.removeEventListener('mousemove', this.mouseMoveHandler);
    this.notify('mouseout', evt.clientX, evt.clientY);
  }*/
  mouseUpHandler(evt){
    this.setStyle('cursor', 'default');
    this.node.removeEventListener('mousemove', this.mouseMoveHandler);
    this.notify('mouseup', evt.clientX, evt.clientY);
  }
}
