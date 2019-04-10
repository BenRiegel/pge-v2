export default function PopupViewOutputController(view, model){

  var { nodes, subcomponents } = view;
  var { root, arrow, templateContainer, content } = nodes;
  var { template, loader } = subcomponents;

  //helper functions -----------------------------------------------------------

  var adjustContentHeight = function(){
    var offsetHeight = content.getProp('offsetHeight');
    var scrollHeight = content.getProp('scrollHeight');
    var deltaHeight = scrollHeight - offsetHeight;
    if (deltaHeight){
      var transitionTime = Math.abs(3 * deltaHeight);
      return content.transitionHeight(scrollHeight, transitionTime);
    }
  };

  var loadTemplate = async function(){
    if (model.props.content.hasChanged){
      loader.activate();
      await template.load(model.content);
      loader.terminate(false);
    }
  };

  //init -----------------------------------------------------------------------

  root.setStyle('visibility', 'hidden');
  templateContainer.setStyle('opacity', '0');

  //public api -----------------------------------------------------------------

  this.open = async function(){
    root.setStyle('visibility', 'visible');
    await loadTemplate();
    await adjustContentHeight();
    await templateContainer.transitionStyle('opacity', '1');
  };

  this.close = function(){
    root.setStyle('visibility', 'hidden');
    content.setStyle('height', '');
    templateContainer.setStyle('opacity', '0');
  };

  this.hideArrow = function(){
    arrow.setStyle('visibility', 'hidden');
  };

  this.showArrow = function(){
    arrow.setStyle('visibility', '');
  };

  this.getDimensions = function(){
    var left = root.getProp('offsetLeft');
    var top = root.getProp('offsetTop');
    var { width, height } = content.getDimensions();
    return { left, top, width, height };
  };

}
