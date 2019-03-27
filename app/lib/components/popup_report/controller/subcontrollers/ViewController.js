export default function PopupReportViewController(view, dispatcher, model, popupModel){

  var { nodes, subcomponents } = view;
  var { root, content, closeButton, contractButton, iframe } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
  content.appendChildNode(contractButton.node);
  content.appendChildNode(iframe.node);

  //define state change reactions ----------------------------------------------

  var updateLoaderState = function(){
    if (model.props.loadingStatus.hasChanged){
      if (model.loadingStatus === 'prepping'){
        loader.activate();
      } else if (model.loadingStatus === 'done'){
        loader.terminate(false);
      }
    }
  }

  var updateContent = function(){
    if (model.props.loadingStatus.hasChanged){
      if (model.loadingStatus === 'loading'){
        return iframe.setSrc(popupModel.content.url);
      }
    }
  }

  var updateRootVisibility = function(){
    if (popupModel.isOpen && popupModel.isExpanded){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateContentOpacity = function(){
    if (popupModel.isOpen){
      if (popupModel.isExpanded){
        return content.setOpacity('1', true);
      } else {
        return content.setOpacity('0', true);
      }
    } else {
      content.setOpacity('0', false);
    }
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'prepLoading', updateLoaderState);
  dispatcher.setListener('view', 'loading', updateContent);
  dispatcher.setListener('view', 'finishLoading', updateLoaderState);
  dispatcher.setListener('view', 'rootVisibility', updateRootVisibility);
  dispatcher.setListener('view', 'contentOpacity', updateContentOpacity);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateContentOpacity();

}
