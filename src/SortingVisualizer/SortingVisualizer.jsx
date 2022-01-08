// import { min } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import { nanoid } from 'nanoid';
import './SortingVisualizer.css';
import mergeSortAnimations from '../Algorithms/mergeSort.js';
import quickSortAnimations from '../Algorithms/quickSort.js';
import bubbleSortAnimations from '../Algorithms/bubbleSort.js';
import heapSortAnimations from '../Algorithms/heapSort.js'

// This is the default color of the array bars that indicates an unsorted array.
const DEFAULT_COLOR = 'turquoise';

// This is the main color of the array bars that indicates a sorted array.
const PRIMARY_COLOR = 'salmon';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'blue';

export default class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  // resets the array based on the range of the slider.
  resetArray() {
    const sizeOfArray = document.getElementById('size').value;
    const NUMBER_OF_ARRAY_BARS = sizeOfArray;
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(getRandomInt(10, 1000));
    }
    this.setState({array: newArray});
  }

  mergeSort() {
    const animations = mergeSortAnimations(this.state.array);
    this.animate(animations);
  }

  quickSort() {
    const animations = quickSortAnimations(this.state.array);
    this.animate(animations);
  }

  heapSort() {
    const animations = heapSortAnimations(this.state.array);
    this.animate(animations);
  }

  bubbleSort() {
    const animations = bubbleSortAnimations(this.state.array);
    this.animate(animations);
  }

  animate(animations) {
    // We need to take the current value of the slider, then minus it by the max bound + 1, because the further right the slider is, the slower the 
    // sorting speed is. This is unintuitive, because users will expect a maxed out slider to be the fastest possible speed in milliseconds.
    const inverseSpeed = document.getElementById('speed').value;
    const speedOfArray = document.getElementById('speed').getAttribute('max');
    const ANIMATION_SPEED_MS = Math.abs((parseInt(speedOfArray) + 1)-inverseSpeed);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('arrayBars');

      // isColorChange is truthy for the first two arrays of a three part array animation. The third part is a setTimeout invocation to overwrite
      // at the indexed value of the original array.
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;

        // Dictates the color for the first two arrays of the three part array animation.
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIndex, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const inputArray = this.state.array;
    return(
      <>
        <div className='toolbar'> Comparison Sorting Algorithms
          <div className='algorithmButtons'>
          <button onClick={() => this.resetArray()}>Generate New Array</button>  
          <span>Size<input type='range' min='50' max='200' step='10' id='size' onChange={() => this.resetArray()}></input></span>
          <span>Speed<input type='range' min='1' max='10' step='1' id='speed'></input></span>
          <button onClick={() => this.mergeSort()}>mergeSort</button>  
          <button onClick={() => this.quickSort()}>quickSort</button>  
          <button onClick={() => this.heapSort()}>heapSort</button>  
          <button onClick={() => this.bubbleSort()}>bubbleSort</button>
          </div>
        </div>

        <div className='arrayContainer'>
        {inputArray.map((value) => (
          <div 
          // Nanoid generates short, non-sequential url-friendly unique IDs
          key={nanoid()}
          className='arrayBars'
          style={{height: `${value}px`, backgroundColor: DEFAULT_COLOR}}>
          </div>
        ))}
        </div>
      </>
    );
  }
}

// Returns a random number between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
