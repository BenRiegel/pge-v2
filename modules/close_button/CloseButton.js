//imports ----------------------------------------------------------------------

import NewContainerView from './views/ContainerView.js';
import NewIconView from './views/IconView.js';
import NewDomController from './controllers/DomController.js';


//exports ----------------------------------------------------------------------

export default function CloseButton(){

  //private code block ---------------------------------------------------------

  var view = {
    container: NewContainerView(),
    icon: NewIconView(),
  }

  var controller = {
    dom: NewDomController(view),
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.container.node,
    addListener: view.container.addListener,
  }

}
