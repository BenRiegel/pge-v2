//imports ----------------------------------------------------------------------

//import NewLocationState from './models/LocationState.js';
import NewContainerView from './views/ContainerView.js';
import NewGraphicView from './views/GraphicView.js';
import NewDomController from './controllers/DomController.js';
import NewEventsController from './controllers/EventsController.js';
import NewGraphicsController from './controllers/GraphicsController.js';


//exports ----------------------------------------------------------------------

export default function NewGraphicsLayer(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
    locations: {},
    graphics: [],
  }

  var view = {
    container: NewContainerView(),
    graphics: [],
  }

  var controller = {
    dom: NewDomController(view.container),
    events: NewEventsController(state, view.container),
    graphics: NewGraphicsController(state, view),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.node,
    addListener: controller.events.addListener,
    enable: function(){
      state.isEnabled = true;
    },
    disable: function(){
      state.isEnabled = false;
    },
    addGraphic: function( {key, worldCoords} ){
      state.locations.add( {key, worldCoords} );
      //state.locations[key] = NewLocationState(worldCoords, tags);
      //var graphicView = NewGraphicView();
      //view.graphics[key] = graphicView;
      //controller.dom.addGraphic(graphicView);
    },
    renderGraphics: function({pixelSize, pixelNum, leftMapCoord, topMapCoord}){
    //  controller.graphics.combine();
    //  controller.graphics.render();
    },
  }

}
