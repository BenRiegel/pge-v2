//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';
import RootNode from './nodes/RootNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(){

  //public api -----------------------------------------------------------------

  this.state = new ComponentModel({
    isOpen: false,
  });

  this.nodes = {
    root: new RootNode(),
  };

  this.subcomponents = [];

}
