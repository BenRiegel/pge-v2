//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../../lib/ViewUtils.js';
import NodeInstance from '../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewLoader(){

  //view -----------------------------------------------------------------------

  var spinner = new NodeInstance('div');
  spinner.className = 'spinner';
  var background = new NodeInstance('div');
  background.className = 'loader-background';
  addChildrenTo(background, [spinner]);

  //public api -----------------------------------------------------------------

  return {
    rootNode : background.rootNode,
    activate: function(){
      spinner.setStyle('display', 'block');
      background.setStyle('opacity', '1');
      background.setStyle('display', 'flex');
    },
    terminate: async function(){
      spinner.setStyle('display', 'none');
      await background.transitionSetStyle('opacity', '0');
      background.setStyle('display', 'none');
    },
    stopAnimation(){
      spinner.setStyle('display', 'none');
    },
    hideBackground(){
      background.setStyle('opacity', '0');
      background.setStyle('display', 'none');
    }
  }

}
