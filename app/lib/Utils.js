export function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}

export async function wait(time){
  await new Promise( resolve => {
    setTimeout(resolve, time);
  });
}

export async function waitAtLeast(minTime, p){
  await Promise.all( [wait(minTime), p] );
}

export function getDistance(p1, p2){
  return Math.sqrt( (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y) );
}

export function easeInOut(frameNum, numFrames){
  var rad = frameNum / numFrames * Math.PI;
  var percent = (1 - Math.cos(rad)) / 2;
  return percent;
}

export function getTargetNode(node, className){
  while (node){
    if (node.classList && node.classList.contains(className)){
      return node;
    }
    node = node.parentNode;
  }
  return null;
};
