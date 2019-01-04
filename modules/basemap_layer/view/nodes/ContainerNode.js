//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(state, eventsEmitter){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'basemap-layer');

  /*container.setEventListener('click', evt => {
    var graphicId = evt.target.dataset.id;
    eventsEmitter.onGraphicClick(graphicId);
  });*/

  //define state change reactions ----------------------------------------------

  /*var updateListener = function(){
    if (state.isEnabled){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }*/

  //load reactions -------------------------------------------------------------

  //state.addListener('isEnabled', 'basemapLayerContainer', 'listener', updateListener);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    //updateListener();
  };

}
