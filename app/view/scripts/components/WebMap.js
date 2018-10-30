//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../lib/ViewUtils.js';
import NodeInstance from '../lib/NodeInstance.js';
import NewLoader from './Loader.js';
import NewZoomControls from './ZoomControls.js';
import NewSelectMenu from './SelectMenu.js';
import NewPopup from './Popup.js';
import NewGraphicsLayer from './GraphicsLayer.js';
import NewBasemapLayer from './BasemapLayer.js';
import '../../stylesheets/web_map.scss';


//exports ----------------------------------------------------------------------

export default function NewWebmap( {width, height} ){

  //view -----------------------------------------------------------------------

  var menuOptionClickAction = async function(clickedOption){
    selectMenu.disable();
    selectMenu.setSelectedOption(clickedOption);
    await selectMenu.toggleOpenStatus();
    graphicsLayer.setSelectedTag(clickedOption);
    selectMenu.enable();
  };

  var zoomAction = async function(zoomType){
    var projectId = Math.floor(Math.random() * 3);
    popup.setContent(projectId);
    popup.open();
  };

  var closePopup = function(){
    popup.close();
  };

  var expandPopup = function(){
    popup.expand();
  };

  var contractPopup = function(){
    popup.contract();
  };

  var loader = NewLoader();
  var zoomControls = NewZoomControls(zoomAction);
  var selectMenu = NewSelectMenu(menuOptionClickAction);
  var popup = NewPopup(closePopup, expandPopup, contractPopup);
  var graphicsLayer = NewGraphicsLayer();
  var basemapLayer = NewBasemapLayer(width, height);
  var container = new NodeInstance('div');
  container.className = 'web-map';
  addChildrenTo(container, [loader, zoomControls, selectMenu, popup, graphicsLayer, basemapLayer]);

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    init: async function(){
      loader.activate();
      zoomControls.enable();
      selectMenu.enable();
      selectMenu.setSelectedOption('All Sites');
      selectMenu.close();
      popup.close();
      graphicsLayer.enable();
      graphicsLayer.setSelectedTag('All Sites');
      await new Promise( resolve => {
        setTimeout(resolve, 1000);
      });
      await loader.terminate();
    }
  }
}
