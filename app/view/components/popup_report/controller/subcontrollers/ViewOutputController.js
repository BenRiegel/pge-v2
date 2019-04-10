export default function PopupReportViewOutputController(view, model){

  var { nodes, subcomponents } = view;
  var { root, content, iframe, reportWindow } = nodes;
  var { loader } = subcomponents;

  //define helper functions ----------------------------------------------------

  var updateContent = async function(){
    if (model.props.content.hasChanged){
      loader.activate();
      await iframe.setSrc(model.content);
      loader.terminate(false);
    }
  };

  var setPosition = function(dimensions){
    reportWindow.setStyle('left', `${dimensions.left}px`);
    reportWindow.setStyle('top', `${dimensions.top}px`);
    reportWindow.setStyle('width', `${dimensions.width}px`);
    reportWindow.setStyle('height', `${dimensions.height}px`);
  };

  var transitionPosition = async function(dimensions){
    reportWindow.addClass('transition-dimensions');
    reportWindow.loadTransitionListener('left');
    reportWindow.loadTransitionListener('top');
    reportWindow.loadTransitionListener('width');
    reportWindow.loadTransitionListener('height');
    reportWindow.setStyle('left', `${dimensions.left}px`);
    reportWindow.setStyle('top', `${dimensions.top}px`);
    reportWindow.setStyle('width', `${dimensions.width}px`);
    reportWindow.setStyle('height', `${dimensions.height}px`);
    var p1 = reportWindow.transitionComplete('left');
    var p2 = reportWindow.transitionComplete('top');
    var p3 = reportWindow.transitionComplete('width');
    var p4 = reportWindow.transitionComplete('height');
    await Promise.all( [p1, p2, p3, p4] );
    reportWindow.removeClass('transition-dimensions');
  };

  var rectifyDimensions = function(dimensions){
    var { width, height } = dimensions;
    var leftRootOffset = root.getProp('offsetLeft');
    var topRootOffset = root.getProp('offsetTop');
    var left = dimensions.left - leftRootOffset;
    var top = dimensions.top - topRootOffset;
    return { width, height, left, top };
  }

  var getExpandedDimensions = function(){
    var left = '0';
    var top = '0';
    var { width, height } = root.getDimensions();
    return { left, top, width, height };
  };

  //init -----------------------------------------------------------------------

  content.setStyle('opacity', '0');
  content.setStyle('visibility', 'hidden');
  reportWindow.setStyle('opacity', '0');
  reportWindow.setStyle('visibility', 'hidden');

  //public api -----------------------------------------------------------------

  this.setPosition = function(dimensions){
    var rectifiedDimensions = rectifyDimensions(dimensions);
    setPosition(rectifiedDimensions);
  };

  this.open = function(){
    reportWindow.setStyle('visibility', 'visible');
    return reportWindow.transitionStyle('opacity', '1');
  };

  this.expand = async function(){
    reportWindow.updateBoxShadowStyling('visible');
    var expandedDimensions = getExpandedDimensions();
    await transitionPosition(expandedDimensions);
  };

  this.contract = async function(dimensions){
    var rectifiedDimensions = rectifyDimensions(dimensions);
    await content.transitionStyle('opacity', '0');
    await transitionPosition(rectifiedDimensions);
    reportWindow.updateBoxShadowStyling('hidden');
  };

  this.loadContent = async function(){
    await updateContent();
    content.setStyle('visibility', 'visible');
    await content.transitionStyle('opacity', '1');
  };

  this.contractAndClose = function(){
    reportWindow.setStyle('opacity', '0');
    reportWindow.setStyle('visibility', 'hidden');
    content.setStyle('opacity', '0');
    content.setStyle('visibility', 'hidden');
  };

  this.close = async function(){
    await reportWindow.transitionStyle('opacity', '0');
    reportWindow.setStyle('visibility', 'hidden');
    content.setStyle('opacity', '0');
    content.setStyle('visibility', 'hidden');
  };

}
