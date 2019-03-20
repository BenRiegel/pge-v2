//imports ----------------------------------------------------------------------

import View from './view/View.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function BasemapTile(props, layerState){

  //private code block ---------------------------------------------------------

  var view = new View();
  var controller = {
    view: new ViewController(view, props, layerState),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.hasRendered = view.hasRendered;

  this.update = controller.view.update;

}
