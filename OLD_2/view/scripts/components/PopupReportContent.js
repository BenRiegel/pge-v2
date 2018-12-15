//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../lib/ViewUtils.js';
import NodeInstance from '../lib/NodeInstance.js';
import '../../stylesheets/popup_report_content.scss';


//exports ----------------------------------------------------------------------

export default function NewPopupReportContent(closeAction, contractAction){

  var projectUrl;

  //view -----------------------------------------------------------------------
  /*  super(`<div class='report-content'>
             <div class='report-contract-button'>
               <span class="fa fa-compress"></span>
              </div>
              <div class='report-close-button'>
                <span class="fa fa-times"></span>
              </div>
              <iframe class='project-iframe'></iframe>
           </div>`);*/

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
    loadContent: async function(){
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

    updateContent: function(content){
      projectUrl = content.url;
    },

    resetOpacity: function(){
      container.setStyle('opacity', '0');
    },

    fadeIn: async function(isAnimating){
      if (isAnimating){
        await new Promise(resolve => {
          setTimeout(resolve, 0);
        })
        container.rootNode.style.transition = 'opacity 0.75s';
        await container.transitionSetStyle('opacity', '1');
        container.rootNode.style.transition = '';
      } else {
        container.setStyle('opacity', '1');
      }
    },

    fadeDown: async function(isAnimating){
      if (isAnimating){
        var node = container.rootNode;
        node.style.transition = 'opacity 0.75s';
        await container.transitionSetStyle('opacity', '0');
        node.style.transition = '';
      } else {
        container.setStyle('opacity', '0');
      }
    }
  }

}
