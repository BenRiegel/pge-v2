export default function PopupViewController(view){

  var { nodes, subcomponents } = view;
  var { root, popup, arrow, content } = nodes;
  var { summary, report } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(popup.node);
  popup.appendChildNode(content.node);
  content.appendChildNode(summary.rootNode);
  content.appendChildNode(report.rootNode);
  popup.appendChildNode(arrow.node);

  //define state change reactions ----------------------------------------------

  var setPopupDimensions = function(){
    var rootDimensions = root.node.getBoundingClientRect();
    var popupDimensions = popup.node.getBoundingClientRect();
    var arrowDimensions = arrow.node.getBoundingClientRect();
    popup.expandedDimensions = {
      height: `${rootDimensions.height}px`,
      width: `${rootDimensions.width + arrowDimensions.width}px`,
      left: '0px',
    };
    popup.contractedDimensions = {
      left: `${rootDimensions.width / 2 - popupDimensions.width}px`,
      height: `${popupDimensions.height}px`,
      width: `${popupDimensions.width}px`,
    }
    popup.setStyle('width', popup.contractedDimensions.width);
    popup.setStyle('height', popup.contractedDimensions.height);
    popup.setStyle('left', popup.contractedDimensions.left);
    popup.setStyle('right', 'auto');
  };

  var resetPopupDimensions = function(){
    popup.setStyle('height', '');
    popup.setStyle('width', '');
    popup.setStyle('left', '');
    popup.setStyle('right', '');
  }

  var expandDimensions = function(){
    var { height, width, left } = popup.expandedDimensions;
    return popup.transitionDimensions(height, width, left);
  }

  var contractDimensions = function(){
    var { height, width, left } = popup.contractedDimensions;
    return popup.transitionDimensions(height, width, left);
  }

  var open = async function(){
    view.state.set('actionInProgress', true);
    popup.setVisibility('visible');
    arrow.setVisibility('visible');
    await summary.fadeInAndShow();
    setPopupDimensions();
    view.state.set('actionInProgress', false);
    view.emitter.broadcast('open');
  }

  var close = function(){
    popup.setVisibility('hidden');
    arrow.setVisibility('hidden');
    popup.setZIndex('contracted');
    summary.hide();
    report.hide();
    resetPopupDimensions();
    view.emitter.broadcast('closed');
  }

  var expand = async function(){
    view.state.set('actionInProgress', true);
    await summary.fadeOutAndHide();
    popup.setZIndex('expanded');
    arrow.setVisibility('hidden');
    await expandDimensions();
    await report.fadeInAndShow();
    view.state.set('actionInProgress', false);
  }

  var contract = async function(){
    view.state.set('actionInProgress', true);
    await report.fadeOutAndHide();
    await contractDimensions();
    arrow.setVisibility('visible');
    popup.setZIndex('contracted');
    await summary.fadeInAndShow();
    view.state.set('actionInProgress', false);
  }

  var onActionInProgress = function(){
    if (view.state.actionInProgress){
      view.emitter.broadcast('actionStart');
    } else {
      view.emitter.broadcast('actionEnd');
    }
  }

  //load state change reactions ------------------------------------------------

  view.state.addListener('actionInProgress', onActionInProgress);
  summary.onReadMore = expand;
  summary.onClose = close;
  report.onContract = contract;
  report.onClose = close;

  //public api -----------------------------------------------------------------

  this.open = open;

  this.close = close;

}
