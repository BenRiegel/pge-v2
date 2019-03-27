export default function PopupViewController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root, popup, arrow, content } = nodes;
  var { summary, report } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(popup.node);
  popup.appendChildNode(content.node);
  content.appendChildNode(summary.rootNode);
  content.appendChildNode(report.rootNode);
  popup.appendChildNode(arrow.node);

  //define view reactions ------------------------------------------------------

  var updatePopupVisibility = function(){
    if (model.isOpen){
      popup.setVisibility('visible');
    } else {
      popup.setVisibility('hidden');
    }
  }

  var updateArrowVisibility = function(){
    if (model.isOpen && !model.isExpanded){
      arrow.setVisibility('visible');
    } else {
      arrow.setVisibility('hidden');
    }
  }

  var updatePopupZIndex = function(){
    if (model.isExpanded){
      popup.setZIndex('expanded');
    } else {
      popup.setZIndex('contracted');
    }
  }

  var updatePopupRight = function(){
    if (model.isOpen){
      popup.setStyle('right', 'auto');
    } else {
      popup.setStyle('right', '');
    }
  }

  var updatePopupLeft = function(isTransitioning){
    if (model.isOpen){
      if (model.isExpanded){
        return popup.setStyle('left', '0px', isTransitioning);
      } else {
        var rootRect = root.node.getBoundingClientRect();
        var summaryRect = summary.rootNode.getBoundingClientRect();
        var arrowRect = arrow.node.getBoundingClientRect();
        var left = rootRect.width / 2 - summaryRect.width - arrowRect.width;
        return popup.setStyle('left', `${left}px`, isTransitioning);
      }
    } else {
      popup.setStyle('left', '');
    }
  }

  var updatePopupHeight = function(isTransitioning){
    if (model.isOpen){
      if (model.isExpanded){
        var rootRect = root.node.getBoundingClientRect();
        return popup.setStyle('height', `${rootRect.height}px`, isTransitioning);
      } else {
        var summaryRect = summary.rootNode.getBoundingClientRect();
        return popup.setStyle('height', `${summaryRect.height}px`, isTransitioning);
      }
    } else {
      popup.setStyle('height', '');
    }
  }

  var updatePopupWidth = function(isTransitioning){
    if (model.isOpen){
      if (model.isExpanded){
        var rootRect = root.node.getBoundingClientRect();
        var arrowRect = arrow.node.getBoundingClientRect();
        var width = rootRect.width + arrowRect.width;
        return popup.setStyle('width', `${width}px`, isTransitioning);
      } else {
        var summaryRect = summary.rootNode.getBoundingClientRect();
        return popup.setStyle('width', `${summaryRect.width}px`, isTransitioning);
      }
    } else {
      popup.setStyle('width', '');
    }
  }

  var updatePopupDimensions = function(isTransitioning){
    updatePopupRight();
    var p1 = updatePopupWidth(isTransitioning);
    var p2 = updatePopupHeight(isTransitioning);
    var p3 = updatePopupLeft(isTransitioning);
    if (isTransitioning){
      return Promise.all([p1, p2,p3]);
    }
  }

  //define event reactions -----------------------------------------------------

  var onSetContent = function(){
    if (model.props.content.hasChanged){
      summary.update('resetLoadingStatus');
      report.update('resetLoadingStatus');
    }
  }

  var onOpen = async function(){
    updateArrowVisibility();
    updatePopupVisibility();
    summary.update('rootVisibility');
    await summary.loadContent();
    await summary.updateAsync('contentHeight');
    await summary.updateAsync('contentOpacity');
    updatePopupDimensions(false);
  }

  var onClose = function(){
    updatePopupVisibility();
    updateArrowVisibility();
    summary.update('rootVisibility');
    summary.update('contentHeight');
    summary.update('contentOpacity');
    updatePopupDimensions(false);
  }

  var onExpand = async function(){
    await summary.updateAsync('contentOpacity');
    summary.update('rootVisibility');
    updateArrowVisibility();
    updatePopupZIndex();
    await updatePopupDimensions(true);
    report.update('rootVisibility');
    await report.loadContent();
    await report.updateAsync('contentOpacity');
  }

  var onContract = async function(){
    await report.updateAsync('contentOpacity');
    report.update('rootVisibility');
    await updatePopupDimensions(true);
    updatePopupZIndex();
    updateArrowVisibility();
    summary.update('rootVisibility');
    await summary.updateAsync('contentOpacity');
  }

  var onContractAndClose = function(){
    updatePopupVisibility();
    updatePopupDimensions(false);
    updateArrowVisibility();
    updatePopupZIndex();
    summary.update('rootVisibility');
    summary.update('contentHeight');
    summary.update('contentOpacity');
    report.update('contentOpacity');
    report.update('rootVisibility');
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('view', 'setContent', onSetContent);
  dispatcher.setListener('view', 'open', onOpen);
  dispatcher.setListener('view', 'close', onClose);
  dispatcher.setListener('view', 'contract', onContract);
  dispatcher.setListener('view', 'expand', onExpand);
  dispatcher.setListener('view', 'contractAndClose', onContractAndClose);

  //init -----------------------------------------------------------------------

  updatePopupVisibility();
  updateArrowVisibility();
  updatePopupZIndex();

}
