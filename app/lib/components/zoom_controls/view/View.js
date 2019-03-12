//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';
import ZoomHomeButton from './subcomponents/ZoomHomeButton.js';
import ZoomInButton from './subcomponents/ZoomInButton.js';
import ZoomOutButton from './subcomponents/ZoomOutButton.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    homeButtonContainer: new ButtonContainerNode(),
    inOutButtonContainer: new ButtonContainerNode(),
  };

  this.subcomponents = {
    zoomHomeButton: new ZoomHomeButton(),
    zoomInButton: new ZoomInButton(),
    zoomOutButton: new ZoomOutButton(),
  }

}
