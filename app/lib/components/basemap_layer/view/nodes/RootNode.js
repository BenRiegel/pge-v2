//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


var differences;
var previousTime;



//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(){
    super('div', 'basemap-layer');
    this.initialCoords = {x:null, y:null};

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);

    this.node.addEventListener('mousedown', this.mouseDownHandler);
    this.node.addEventListener('mouseup', this.mouseUpHandler);
  }

  mouseMoveHandler(evt){
    var newTime = new Date().getTime();
    differences.push(newTime - previousTime);
    previousTime = newTime;
    evt.preventDefault();
    var deltaX = evt.clientX - this.initialCoords.x;
    var deltaY = evt.clientY - this.initialCoords.y;
    this.initialCoords.x = evt.clientX;
    this.initialCoords.y = evt.clientY;
    //negate so that pan to the right shifts viewpoint left
    //eventsEmitter.broadcast('userPanRequest', {x:-deltaX, y:-deltaY});
  //  console.log(deltaX, deltaY);
  }

  mouseDownHandler(evt){
    differences = [];
    previousTime = new Date().getTime();
    evt.preventDefault();
    console.log('mouse down');
    this.setStyle('cursor', 'move');
    this.initialCoords.x = evt.clientX;
    this.initialCoords.y = evt.clientY;
    this.node.addEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseOutHandler(evt){
    this.setStyle('cursor', 'default');
    this.node.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseUpHandler(){
    console.log(differences);
    this.setStyle('cursor', 'default');
    this.node.removeEventListener('mousemove', this.mouseMoveHandler);
  }
}


/*//exports ----------------------------------------------------------------------

export default function ContainerNode(mapViewpoint, state, eventsEmitter){

  //helper variables and functions ---------------------------------------------



  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'basemap-layer');

  container.setEventListener('mousedown', evt => {
    evt.preventDefault();
    container.setStyle('cursor', 'move');
    initialCoords.x = evt.clientX;
    initialCoords.y = evt.clientY;
    container.addEventListener('mousemove', mouseMoveEventHandler);
    eventsEmitter.broadcast('userPanStartRequest');
  });

  container.setEventListener('mouseup', () => {
    container.setStyle('cursor', 'default');
    container.removeEventListener('mousemove', mouseMoveEventHandler);
    eventsEmitter.broadcast('userPanEndRequest');
  });

  container.setEventListener('mouseout', evt => {
    container.setStyle('cursor', 'default');
    container.removeEventListener('mousemove', mouseMoveEventHandler);
    eventsEmitter.broadcast('userPanEndRequest');
  });

  //define state change reactions ----------------------------------------------

  var updateListener = function(){
    if (state.isEnabled){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('isEnabled', 'containerNode - isListening', updateListener);

  mapViewpoint.addListener('zoomHomeStart', async () => {
    await container.animateOpacity('transparent');
  });

  mapViewpoint.addListener('zoomHomeEnd', async () => {
    await container.animateOpacity('opaque');
  });

  //public api -----------------------------------------------------------------

  return container;

}*/
