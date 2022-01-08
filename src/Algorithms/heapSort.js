export default function heapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  return animations;
}

function heapSort(arr, animations) {
  let lastParentNode = Math.floor((arr.length / 2) - 1);
  let lastChild = arr.length - 1;
  
  while (lastParentNode >= 0) {
    maxHeapify(arr, arr.length, lastParentNode, animations);
   lastParentNode--;
  }
  
  while (lastChild >= 0) {
    // Highlights the bounds
    animations.push([0, lastChild]);
    animations.push([0, lastChild]);
    // We push the value at pivotIndex in the original array with the value at index end in the current array to be swapped in conjunction with the 
    // below animations push sequence.
    animations.push([lastChild, arr[0]]);

    // Highlights the bounds
    animations.push([0, lastChild]);
    animations.push([0, lastChild]);
    // We push the value at index end in the original array with the value at the pivotIndex in the current array to be swapped in conjunction with the 
    // above animations push sequence.
    animations.push([0, arr[lastChild]]);

   swap(arr, 0, lastChild);
   maxHeapify(arr, lastChild, 0, animations);
   lastChild--;
  }
   return arr;
 }

 // creates a max heap from an unsorted array
function maxHeapify(arr, length, parentIndex, animations) {
  let largest = parentIndex;
  let left = parentIndex * 2 + 1;
  let right = left + 1;
  
  if (left < length && arr[left] > arr[largest]) {
   largest = left;
  }
  
  if (right < length && arr[right] > arr[largest]) {
   largest = right;
  }
  
  if (largest !== parentIndex) {

  // Highlights the bounds
  animations.push([parentIndex, largest]);
  animations.push([parentIndex, largest]);
  // We push the value at pivotIndex in the original array with the value at index end in the current array to be swapped in conjunction with the 
  // below animations push sequence.
  animations.push([parentIndex, arr[largest]]);

  // Highlights the bounds
  animations.push([left, right]);
  animations.push([left, right]);
  // We push the value at index end in the original array with the value at the pivotIndex in the current array to be swapped in conjunction with the 
  // above animations push sequence.
  animations.push([largest, arr[parentIndex]]);

   swap(arr, parentIndex, largest);
   maxHeapify(arr, length, largest, animations); 
  }
  
  return arr;
 }
 
 function swap(arr, pivotIndex, end) {
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
}
