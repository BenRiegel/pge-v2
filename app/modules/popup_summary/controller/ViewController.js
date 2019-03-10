//exports ----------------------------------------------------------------------

export default function PopupSummaryViewController(view, state, popupState){

  var { nodes, subcomponents } = view;
  var { root, content, title, author, image, text, readMore } = nodes;
  var { loader, closeButton } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.rootNode);
  content.appendChildNode(title.node);
  content.appendChildNode(author.node);
  content.appendChildNode(image.node);
  content.appendChildNode(text.node);
  content.appendChildNode(readMore.node);

  //define state change reactions ----------------------------------------------

  var updateRootVisibility = function(){
    if (state.isActive){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateTitle = function(){
    title.innerHTML = state.content.projectName;
  };

  var updateAuthor = function(){
    var { university, year } = state.content;
    if (state.content.author){
      author.innerHTML = `by ${state.content.author}, ${university} University, ${year}`;
    } else {
      author.innerHTML = `written at ${university} University in ${year}`;
    }
  };

  var updateText = function(){
    text.innerHTML = state.content.introText + ' . . . ';
  };

  var loadImage = function(){
    return image.setSrc(state.content.introImageUrl);
  }

  var resizeImage = function(){
    image.resize();
  }

  var updateLoader = function(loaderIsActive){
    if (loaderIsActive){
      loader.show();
    } else {
      loader.hide();
    }
  }

  var updateReadMoreDomListener = function(isListening){
    readMore.isListening = isListening;
  }

  var updateContentHeight = function(){
    if (state.isActive){
      var offsetHeight = content.getProp('offsetHeight');
      var scrollHeight = content.getProp('scrollHeight');
      var deltaHeight = scrollHeight - offsetHeight;
      var transitionTime = Math.abs(3 * deltaHeight);
      return content.transitionHeight(scrollHeight, transitionTime);
    } else {
      content.setStyle('height', '');
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

  //load state change reactions ------------------------------------------------

  state.addListenerByType('content', 'loaderIsActive', updateLoader);
  state.addListenerByType('content', 'updateTitle', updateTitle);
  state.addListenerByType('content', 'updateAuthor', updateAuthor);
  state.addListenerByType('content', 'updateText', updateText);
  state.addListenerByType('content', 'updateImageSrc', loadImage);
  state.addListenerByType('content', 'updateImageSize', resizeImage);
  state.addListenerByType('isActive', 'contentOpacity', updateContentOpacity);
  state.addListenerByType('isActive', 'contentHeight', updateContentHeight);
  state.addListenerByType('isActive', 'rootVisibility', updateRootVisibility);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateContentOpacity();
  updateReadMoreDomListener(true);

  //public api -----------------------------------------------------------------

  this.updateReadMoreDomListener = updateReadMoreDomListener;

  this.enableDomEvents = function(){
    updateReadMoreDomListener(true);
    closeButton.enable();
  };

  this.disableDomEvents = function(){
    updateReadMoreDomListener(false);
    closeButton.disable();
  };

}
