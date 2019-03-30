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
    if (popupModel.isExpanded){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateContentOpacity = function(){
    if (popupModel.isExpanded){
      return content.setOpacity('1', true);
    } else {
      return content.setOpacity('0', true);
    }
  }

  var onPosition = function(dimensions, isTransitioning){
    var p1 = root.setStyle('left', `${dimensions.left}px`, isTransitioning);
    var p2 = root.setStyle('top', `${dimensions.top}px`, isTransitioning);
    var p3 = root.setStyle('width', `${dimensions.width}px`, isTransitioning);
    var p4 = root.setStyle('height', `${dimensions.height}px`, isTransitioning);
    if (isTransitioning){
      return Promise.all( [p1, p2, p3, p4] );
    }
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'prepLoading', updateLoaderState);
  dispatcher.setListener('view', 'loading', updateContent);
  dispatcher.setListener('view', 'finishLoading', updateLoaderState);
  dispatcher.setListener('view', 'rootVisibility', updateRootVisibility);
  dispatcher.setListener('view', 'contentOpacity', updateContentOpacity);
  dispatcher.setListener('view', 'position', onPosition);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateContentOpacity();

}
