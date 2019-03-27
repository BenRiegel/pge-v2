//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryViewController(view, dispatcher, model, popupModel){

  var { nodes, subcomponents } = view;
  var { root, content, closeButton, title, author } = nodes;
  var { inlineContainer, image, text, readMore } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
  content.appendChildNode(title.node);
  content.appendChildNode(author.node);
  content.appendChildNode(inlineContainer.node);
  inlineContainer.appendChildNode(image.node);
  inlineContainer.appendChildNode(text.node);
  inlineContainer.appendChildNode(readMore.node);

  //define state change reactions ----------------------------------------------

  var updateTitle = function(){
    title.innerHTML = popupModel.content.projectName;
  };

  var updateAuthor = function(){
    var { university, year } = popupModel.content;
    if (popupModel.content.author){
      author.innerHTML = `by ${popupModel.content.author}, ${university} University, ${year}`;
    } else {
      author.innerHTML = `written at ${university} University in ${year}`;
    }
  };

  var updateText = function(){
    text.innerHTML = popupModel.content.introText + ' . . . ';
  };

  var updateImageSrc = function(){
    return image.setSrc(popupModel.content.introImageUrl);
  }

  var updateImageSize = function(){
    image.resize();
  }

  var updateRootVisibility = function(){
    if (popupModel.isOpen && !popupModel.isExpanded){
      root.setVisibility('visible');
    } else {
      root.setVisibility('hidden');
    }
  }

  var updateContentHeight = function(){
    if (popupModel.isOpen){
      var offsetHeight = content.getProp('offsetHeight');
      var scrollHeight = content.getProp('scrollHeight');
      var deltaHeight = scrollHeight - offsetHeight;
      var transitionTime = Math.abs(3 * deltaHeight);
      if (deltaHeight){
        return content.transitionHeight(scrollHeight, transitionTime);
      }
    } else {
      content.setStyle('height', '');
    }
  }

  var updateContentOpacity = function(){
    if (popupModel.isOpen){
      if (popupModel.isExpanded){
        return content.setOpacity('0', true);
      } else {
        return content.setOpacity('1', true);
      }
    } else {
      content.setOpacity('0', false);
    }
  }

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
        return waitAtLeast(500, async() => {
          updateTitle();
          updateAuthor();
          updateText();
          await updateImageSrc();
          updateImageSize();
        });
      }
    }
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'prepLoading', updateLoaderState);
  dispatcher.setListener('view', 'loading', updateContent);
  dispatcher.setListener('view', 'finishLoading', updateLoaderState);
  dispatcher.setListener('view', 'rootVisibility', updateRootVisibility);
  dispatcher.setListener('view', 'contentHeight', updateContentHeight);
  dispatcher.setListener('view', 'contentOpacity', updateContentOpacity);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateContentHeight();
  updateContentOpacity();

}
