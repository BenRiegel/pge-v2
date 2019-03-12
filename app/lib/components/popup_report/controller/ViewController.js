export default function PopupReportViewController(view, state, popupState){

  var { nodes, subcomponents } = view;
  var { root, content, iframe } = nodes;
  var { loader, closeButton, contractButton } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.rootNode);
  content.appendChildNode(contractButton.rootNode);
  content.appendChildNode(iframe.node);

  //define state change reactions ----------------------------------------------

  var updateRootVisibility = function(){
    if (state.isActive){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var loadIframe = function(){
    return iframe.setSrc(state.content.url);
  }

  var updateLoader = function(loaderIsActive){
    if (loaderIsActive){
      loader.show();
    } else {
      loader.hide();
    }
  }

  var updateContentOpacity = function(){
    if (state.isActive){
      return content.transitionOpacity('1');
    } else {
      if (popupState.isOpen){
        return content.transitionOpacity('0');
      } else {
        content.setOpacity('0');
      }
    }
  };

  var updateDomEvents = function(isUpdating){
    if (isUpdating){
      contractButton.disable();
      closeButton.disable();
    } else {
      closeButton.enable();
      contractButton.enable();
    }
  }

  //load state change reactions ------------------------------------------------

  state.addListenerByType('isActive', 'contentOpacity', updateContentOpacity);
  state.addListenerByType('isActive', 'rootVisibility', updateRootVisibility);
  state.addListenerByType('isActive', 'viewIsUpdating', updateDomEvents);
  state.addListenerByType('content', 'loaderIsActive', updateLoader);
  state.addListenerByType('content', 'iframeContent', loadIframe);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateContentOpacity();

  //public api -----------------------------------------------------------------

  this.enableDomEvents = function(){
    closeButton.enable();
    contractButton.enable();
  };

  this.disableDomEvents = function(){
    closeButton.disable();
    contractButton.disable();
  };

}
