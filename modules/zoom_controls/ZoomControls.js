//imports ----------------------------------------------------------------------

import NewContainerView from './views/ContainerView.js';
import NewEventsController from './controllers/EventsController.js';


//exports ----------------------------------------------------------------------

export default function NewZoomControls(){

  //private code block ---------------------------------------------------------

  var state = {
    isEnabled: undefined,
  }

  var view = {
    container: NewContainerView(),
  }

  var controller = {
    events: NewEventsController(state, view),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.node,
    addListener: controller.events.addListener,
    enable(){
      state.isEnabled = true;
    },
    disable(){
      state.isEnabled = false;
    },
  }

}
