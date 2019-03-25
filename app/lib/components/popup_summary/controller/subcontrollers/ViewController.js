//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryViewController(view, dispatcher, model, popupModel){

  var { nodes, subcomponents } = view;
  var { root, content, closeButton, title, author, image, text, readMore } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
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
    if (model.props.content.hasChanged){
      loader.show();
      await waitAtLeast(500, async() => {
        updateTitle();
        updateAuthor();
        updateText();
        await updateImageSrc();
        updateImageSize();
      });
      loader.hide();
    }
  }

  var onFadeInAndShow = async function(){
    root.setVisibility('visible');
    await loadContent();
    await adjustContentHeight();
    await content.transitionOpacity('1');
  }

  var hide = function(){
    content.setOpacity('0');
    root.setVisibility('hidden');
    resetContentHeight();
  }

  var onFadeOutAndHide = async function(){
    await content.transitionOpacity('0');
    root.setVisibility('hidden');
    resetContentHeight();
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'fadeInAndShow', onFadeInAndShow);
  dispatcher.setListener('view', 'hide', hide);
  dispatcher.setListener('view', 'fadeOutAndHide', onFadeOutAndHide);

}
