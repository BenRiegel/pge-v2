//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function IframeNode(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('iframe');
  node.className = 'project-iframe';

  //public api -----------------------------------------------------------------

  return {
    node,
    loadContent: async function(url){
      await new Promise( resolve => {
        var contentLoaded = evt => {
          node.removeEventListener('load', contentLoaded);
          resolve();
        }
        node.addEventListener('load', contentLoaded);
        node.src = url;
      });
    },
  }
}
