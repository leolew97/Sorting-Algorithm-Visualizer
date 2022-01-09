// returns an array of arrays that contains the animations
export default function mergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  // comparator array does the comparisons, while main array is going to end up being the fully sorted array. If we had one array, we could swap values,
  // but that means we would have higher space complexity, since we're going to keep track of the slices of an array (aka mini arrays). Instead, we have
  // two arrays (one main array, and one comparison array) so we can keep track of the indices instead of mini arrays. This results in a better space
  // complexity.
  const comparatorArray = array.slice();
  mergeSort(array, 0, array.length - 1, comparatorArray, animations);
  return animations;
}

// return the merge sort algorithm
function mergeSort(
  mainArray,
  startIndex,
  endIndex,
  comparatorArray,
  animations
) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(comparatorArray, startIndex, middleIndex, mainArray, animations);
  mergeSort(comparatorArray, middleIndex + 1, endIndex, mainArray, animations);
  merge(mainArray, startIndex, middleIndex, endIndex, comparatorArray, animations);
}

function merge(mainArray, startIndex, middleIndex, endIndex, comparatorArray,animations) {
  // i is going to keep track of the index in the mainArray
  let i = startIndex;

  // j is going to keep track of the index in the comparatorArray
  let j = startIndex;
  let k = middleIndex + 1;

  // runs while there are comparisons to be made in the first half and second half of the comparatorArray
  while (j <= middleIndex && k <= endIndex) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([j, k]);
    // These are the values that we're comparing; we push them a second time to revert their color.
    animations.push([j, k]);

    // Checks to see which indexed value is smaller; smaller value is replaced in the mainArray, and the animations array shows which value is replaced.
    if (comparatorArray[j] <= comparatorArray[k]) {
      // We overwrite the value at index i in the original array with the value at index j in the comparatorArray.         
      animations.push([i, comparatorArray[j]]);
      mainArray[i++] = comparatorArray[j++];
    } else {
      // We overwrite the value at index i in the original array with the value at index k in the comparatorArray.         
      animations.push([i, comparatorArray[k]]);
      mainArray[i++] = comparatorArray[k++];
    }
  }

  // runs while there are still comparisons to be made in the first half
  while (j <= middleIndex) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second time to revert their color.    
    animations.push([j, j]);
    // We overwrite the value at index i in the original array with the value at index j in the comparatorArray.    
    animations.push([i, comparatorArray[j]]);
    mainArray[i++] = comparatorArray[j++];
  }

  // runs while there are still comparisons to be made in the second half
  while (k <= endIndex) {
    // These are the values that we're comparing; we push them once to change their color.  
    animations.push([k, k]);
    // These are the values that we're comparing; we push them a second time to revert their color.    
    animations.push([k, k]);
    // We overwrite the value at index i in the original array with the value at index k in the comparatorArray.       
    animations.push([i, comparatorArray[k]]);
    mainArray[i++] = comparatorArray[k++];
  }
}
