//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';
import { addChildrenTo } from '../../../lib/ViewUtils.js';
import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewContentView(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var closeAction = function(){
    emitter.broadcast('closeAction');
  }

  var contractAction = function(){
    emitter.broadcast('contractAction');
  }

  var closeButtonIcon = new NodeInstance('span');
  closeButtonIcon.className = 'fa fa-times';
  var closeButton = new NodeInstance('div');
  closeButton.className = 'report-close-button';
  closeButton.onClick = closeAction;
  addChildrenTo(closeButton, [closeButtonIcon]);
  var contractButtonIcon = new NodeInstance('span');
  contractButtonIcon.className = 'fa fa-compress';
  var contractButton = new NodeInstance('div');
  contractButton.className = 'report-contract-button';
  contractButton.onClick = contractAction;
  addChildrenTo(contractButton, [contractButtonIcon]);
  var iframe = new NodeInstance('iframe');
  iframe.className = 'project-iframe';
  var container = new NodeInstance('div');
  container.className = 'report-content';
  addChildrenTo(container, [closeButton, contractButton, iframe]);

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    addListener: emitter.addListener,
    loadContent: async function(projectUrl){
      var node = iframe.rootNode;
      await new Promise( resolve => {
        var contentLoaded = evt => {
          node.removeEventListener('load', contentLoaded);
          resolve();
        }
        node.addEventListener('load', contentLoaded);
        node.src = projectUrl;
      });
    },
    setTransparent: function(){
      container.setStyle('opacity', '0');
    },
    setOpaque: function(){
      container.setStyle('opacity', '1');
    },
    transitionFadeUp: async function(){
      container.rootNode.style.transition = 'opacity 0.75s';
      //container.rootNode.style.transitionProperty = 'opacity';
      await container.transitionSetStyle('opacity', '1');
      container.rootNode.style.transition = '';
    },
    transitionFadeDown: async function(){
      container.rootNode.style.transition = 'opacity 0.75s';
      container.setStyle('opacity', '1');
      //container.rootNode.style.transitionProperty = 'opacity';
      await container.transitionSetStyle('opacity', '0');
      container.rootNode.style.transition = '';
    },
  }
}
