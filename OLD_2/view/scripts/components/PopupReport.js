//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../lib/ViewUtils.js';
import NodeInstance from '../lib/NodeInstance.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import NewPopupReportContent from './PopupReportContent.js';
import NewLoader from './Loader.js';
import '../../stylesheets/popup_report_container.scss';


//exports ----------------------------------------------------------------------

export default function NewPopupReport(closeAction, contractAction){

  //state ----------------------------------------------------------------------

  var windowIsLoaded;

  //view -----------------------------------------------------------------------

  var loader = NewLoader();
  var popupReportContent = NewPopupReportContent(closeAction, contractAction);
  var container = new NodeInstance('div');
  container.className = 'report-window';
  addChildrenTo(container, [loader, popupReportContent]);

  var loadContent = async function(){
    await waitAtLeast(500, async () => {
      await popupReportContent.loadContent();
    });
    loader.stopAnimation();
    loader.hideBackground();
    windowIsLoaded = true;
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    show: function(){
      container.setStyle('visibility', 'visible');
    },
    hide: function(){
      container.setStyle('visibility', 'hidden');
    },
    startLoading: function(){
      loader.activate();
      windowIsLoaded = false;
    },
    open: async function(isAnimating){
      popupReportContent.resetOpacity();
      container.setStyle('visibility', 'visible');
      if (windowIsLoaded === false){
        await loadContent();
      }
      await popupReportContent.fadeIn(isAnimating);
    },
    onIsExpandedChange: async function(isExpanded, isAnimating){
      if (isExpanded){
        await this.open(isAnimating);
      } else {
        await popupReportContent.fadeDown(isAnimating);
        this.hide();
      }
    },
    updateContent: popupReportContent.updateContent,
  }

}
