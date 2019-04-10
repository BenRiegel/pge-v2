//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../../../../lib/utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplateViewOutputController(view, model){

  var { nodes } = view;
  var { title, author, image, text, readMore } = nodes;

  //define state change reactions ----------------------------------------------

  var updateTitle = function(titleName){
    title.innerHTML = titleName;
  };

  var updateAuthor = function(authorName, university, year){
    if (authorName){
      author.innerHTML = `by ${authorName}, ${university} University, ${year}`;
    } else {
      author.innerHTML = `written at ${university} University in ${year}`;
    }
  };

  var updateText = function(textStr){
    text.innerHTML = textStr + ' . . . ';
  };

  var updateImageSrc = function(src){
    return image.setSrc(src);
  };

  var updateImageSize = function(){
    image.resize();
  };

  //public api -----------------------------------------------------------------

  this.load = function(content){
    return waitAtLeast(500, async () => {
      updateTitle(content.projectName);
      updateAuthor(content.author, content.university, content.year);
      updateText(content.introText);
      await updateImageSrc(content.introImageUrl);
      updateImageSize();
    });
  };

}

/*  var adjustContentHeight = function(){
    var offsetHeight = content.getProp('offsetHeight');
    var scrollHeight = content.getProp('scrollHeight');
    var deltaHeight = scrollHeight - offsetHeight;
    if (deltaHeight){
      var transitionTime = Math.abs(3 * deltaHeight);
      return content.transitionHeight(scrollHeight, transitionTime);
    }
  };*/

  /*  this.open = async function(){
      root.setStyle('visibility', 'visible');

      await adjustContentHeight();
      await content.setStyle('opacity', '1', true);
    };

    this.close = function(){
      root.setStyle('visibility', 'hidden');
      content.setStyle('opacity', '0');
      content.setStyle('height', '');
    };*/

  /*  this.getDimensions = function(){
      var left = root.getProp('offsetLeft');
      var top = root.getProp('offsetTop');
      var { width, height } = content.getDimensions();
      return { left, top, width, height };
    };*/
