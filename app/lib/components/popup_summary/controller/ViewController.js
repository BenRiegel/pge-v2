//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryViewController(view, popupModel, popupViewState){

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

  var adjustContentHeight = function(){
    var offsetHeight = content.getProp('offsetHeight');
    var scrollHeight = content.getProp('scrollHeight');
    var deltaHeight = scrollHeight - offsetHeight;
    var transitionTime = Math.abs(3 * deltaHeight);
    return content.transitionHeight(scrollHeight, transitionTime);
  }

  var resetContentHeight = function(){
    content.setStyle('height', '');
  }

  var loadContent = async function(){
    if (!view.state.contentHasLoaded){
      loader.show();
      await waitAtLeast(500, async() => {
        updateTitle();
        updateAuthor();
        updateText();
        await updateImageSrc();
        updateImageSize();
      });
      loader.hide();
      view.state.set('contentHasLoaded', true);
    }
  }

  var resetContentHasLoaded = function(){
    view.state.set('contentHasLoaded', false);
  }

  var updateReadMoreListener = function(value){
    readMore.isListening = (!popupViewState.actionInProgress && !popupViewState.userDisabled);
  }

  //load state change reactions ------------------------------------------------

  popupModel.addListener('content', resetContentHasLoaded);
  popupViewState.addListener('userDisabled', updateReadMoreListener);
  popupViewState.addListener('actionInProgress', updateReadMoreListener);

  //init -----------------------------------------------------------------------

  updateReadMoreListener();

  //public api -----------------------------------------------------------------

  this.show = async function(){
    root.setVisibility('visible');
    await loadContent();
    await adjustContentHeight();
    await content.transitionOpacity('1');
  }

  this.hide = function(){
    content.setOpacity('0');
    root.setVisibility('hidden');
    resetContentHeight();
  }

  this.fadeOutAndHide = async function(){
    await content.transitionOpacity('0');
    root.setVisibility('hidden');
    resetContentHeight();
  }

}
