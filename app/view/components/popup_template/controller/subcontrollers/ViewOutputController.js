//imports ----------------------------------------------------------------------

import { waitAtLeast } from '../../../../../lib/utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplateViewOutputController(view){

  var { nodes } = view;
  var { title, author, image, text, readMore } = nodes;

  //helper functions -----------------------------------------------------------

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

  var updateReadMore = function(url){
    readMore.href = url;
  };

  var updateImageSize = function(){
    const MAX_IMAGE_WIDTH = 200;
    const MAX_IMAGE_HEIGHT = 125;
    var naturalWidth = image.getProp('naturalWidth');
    var naturalHeight = image.getProp('naturalHeight');
    var ratio = naturalWidth / naturalHeight;
    if (ratio > (MAX_IMAGE_WIDTH / MAX_IMAGE_HEIGHT)){
      var newWidth = MAX_IMAGE_WIDTH;
      var newHeight = newWidth / ratio;
    } else {
      var newHeight = MAX_IMAGE_HEIGHT;
      var newWidth = ratio * newHeight;
    }
    image.setStyle('width', `${newWidth}px`);
    image.setStyle('height', `${newHeight}px`);
  };

  //public api -----------------------------------------------------------------

  this.load = function(content){
    return waitAtLeast(500, async () => {
      updateTitle(content.projectName);
      updateAuthor(content.author, content.university, content.year);
      updateText(content.introText);
      updateReadMore(content.url);
      await updateImageSrc(content.introImageUrl);
      updateImageSize();
    });
  };

}
