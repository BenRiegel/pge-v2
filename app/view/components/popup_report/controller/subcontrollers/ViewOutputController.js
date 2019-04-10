export default function PopupReportViewOutputController(view, model){

  var { nodes, subcomponents } = view;
  var { content, iframe, reportWindow, expandedWindow } = nodes;
  var { loader } = subcomponents;

  //define state change reactions ----------------------------------------------

  var updateContent = async function(){
    if (model.props.content.hasChanged){
      loader.activate();
      await iframe.setSrc(model.content);
      loader.terminate(false);
    }
  }

  var updatePosition = function(dimensions, isTransitioning){
    var p1 = reportWindow.setStyle('left', `${dimensions.left}px`, isTransitioning);
    var p2 = reportWindow.setStyle('top', `${dimensions.top}px`, isTransitioning);
    var p3 = reportWindow.setStyle('width', `${dimensions.width}px`, isTransitioning);
    var p4 = reportWindow.setStyle('height', `${dimensions.height}px`, isTransitioning);
    if (isTransitioning){
      return Promise.all( [p1, p2, p3, p4] );
    }
  };

  var getExpandedDimensions = function(){
    var left = expandedWindow.getProp('offsetLeft');
    var top = expandedWindow.getProp('offsetTop');
    var { width, height } = expandedWindow.getDimensions();
    return { left, top, width, height };
  };

  //init -----------------------------------------------------------------------

  content.setStyle('opacity', '0');
  content.setStyle('visibility', 'hidden');
  reportWindow.setStyle('opacity', '0');
  reportWindow.setStyle('visibility', 'hidden');

  //public api -----------------------------------------------------------------

  this.showAt = function(dimensions){
    updatePosition(dimensions, false);
    reportWindow.setStyle('visibility', 'visible');
    return reportWindow.setStyle('opacity', '1', true);
  };

  this.expand = function(){
    var expandedDimensions = getExpandedDimensions();
    return updatePosition(expandedDimensions, true);
  };

  this.contract = async function(contractedDimensions){
    await content.setStyle('opacity', '0', true);
    await updatePosition(contractedDimensions, true);
  }

  this.open = async function(){
    await updateContent();
    content.setStyle('visibility', 'visible');
    await content.setStyle('opacity', '1', true);
  };

  this.fadeAndClose = async function(){
    await reportWindow.setStyle('opacity', '0', true);
    content.setStyle('opacity', '0');
    content.setStyle('visibility', 'hidden');
    reportWindow.setStyle('visibility', 'hidden');
  }

  this.close = function(){
    content.setStyle('opacity', '0');
    reportWindow.setStyle('opacity', '0');
    content.setStyle('visibility', 'hidden');
    reportWindow.setStyle('visibility', 'hidden');
  };

}
