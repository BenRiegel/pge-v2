//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryViewOutputController(view, dispatcher, popupModel){

  var { nodes, subcomponents } = view;
  var { root, arrow, content, contentContainer, closeButton, title, author } = nodes;
  var { inlineContainer, image, text, readMore } = nodes;
  var { loader } = subcomponents;

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

  var updateContent = async function(){
    if (!view.state.contentHasLoaded){
      loader.activate();
      await waitAtLeast(500, async() => {
        updateTitle();
        updateAuthor();
        updateText();
        await updateImageSrc();
        updateImageSize();
      });
      loader.terminate(false);
    }
  }

  var adjustContentHeight = function(){
    var offsetHeight = content.getProp('offsetHeight');
    var scrollHeight = content.getProp('scrollHeight');
    var deltaHeight = scrollHeight - offsetHeight;
    if (deltaHeight){
      var transitionTime = Math.abs(3 * deltaHeight);
      return content.transitionHeight(scrollHeight, transitionTime);
    }
  }

  var getDimensions = function(){
    var left = root.getProp('offsetLeft');
    var top = root.getProp('offsetTop');
    var { width, height } = content.getDimensions();
    return { left, top, width, height };
  }

  var onOpen = async function(){
    root.setStyle('visibility', 'visible');
    await updateContent();
    await adjustContentHeight();
    await content.setStyle('opacity', '1', true);
  }

  var onExpand = async function(){
    await content.setStyle('opacity', '0', true);
    arrow.setStyle('visibility', 'hidden');
  }

  var onContract = async function(){
    arrow.setStyle('visibility', '');
    await content.setStyle('opacity', '1', true);
  }

  var onClose = function(){
    root.setStyle('visibility', 'hidden');
    content.setStyle('opacity', '0');
    content.setStyle('height', '');
  }

  var onContractAndClose = function(){
    arrow.setStyle('visibility', '');
    root.setStyle('visibility', 'hidden');
    content.setStyle('opacity', '0');
    content.setStyle('height', '');
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('viewOutput', 'open', onOpen);
  dispatcher.setListener('viewOutput', 'close', onClose);
  dispatcher.setListener('viewOutput', 'updateOnExpand', onExpand);
  dispatcher.setListener('viewOutput', 'updateOnContract', onContract);
  dispatcher.setListener('viewOutput', 'contractAndClose', onContractAndClose);
  dispatcher.setListener('viewOutput', 'getDimensions', getDimensions);

  //init -----------------------------------------------------------------------

  root.setStyle('visibility', 'hidden');
  content.setStyle('opacity', '0');

}
