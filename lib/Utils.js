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

export function getAve(array, f){
  var sum = 0;
  for (var element of array){
    sum += f(element);
  }
  return sum / array.length;
}
