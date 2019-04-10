//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function BasemapTile(props){

  //private code block ---------------------------------------------------------

  var view = new View();
  var controller = new Controller(props, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.renderView = function(info){
    return controller.renderView(info);
  };

}
