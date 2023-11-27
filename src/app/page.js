"use client";

import React, { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ value: '', weight: '' });
  const [result, setResult] = useState(null);
  const [totalWeight, setTotalWeight] = useState(null);
  const [enteredWeight, setEnteredWeight] = useState('');
  const [listofIndexes, setListofIndexes] = useState([]);


  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ value: '', weight: '' });
  };

  const handleInputChange = (key, value) => {
    setNewItem((prevItem) => ({ ...prevItem, [key]: value }));
  };

//   const handleAddWeight = ()=> {
//     setWeight(newWeight)

//   }
//  const handleWeightChange = (value)=> {
//   setNewWeight(value)
//   }
const handleAddWeight = () => {
  if (isPositiveInteger(enteredWeight)) {
    setEnteredWeight(enteredWeight);
  }
  setTotalWeight("Knapsack maximum weight " + enteredWeight);
  // console.log();

};
  const isPositiveInteger = (value) => {
    return /^\d$/.test(value) && parseInt(value) > 0;
  };

  const handleCalculate = () => {
    function max(a, b) 
    { 
          return (a > b) ? a : b; 
    } 

    console.log('Items:', items);
    var N = items.length;
    var W = parseInt(enteredWeight);
    console.log(W);
    console.log(N);
    // items.map((item)=>{console.log(item);});
    // console.log(items[0]);
    
    // console.log(items[N-1]);
    // var P = new Array(N+1).map(() => new Array(W+1));
    let P = new Array(N + 1);
        for( let i=0;i<P.length;i++)
        {
            P[i]=new Array(W+1);
            for(let j=0;j<W+1;j++)
            {
                P[i][j]=-1;
            }
        }
  
    // console.log(P);
    for( let i = 0; i <= N; i++)
    {
      for (let j = 0; j <= W; j++) 
      {
        if (i == 0 || j == 0 ) {
          P[i][j] = 0;
        } else if (i > 0 && j < items[i-1].weight) {
          P[i][j] = P[i - 1][j];
        } else {
          // console.log(parseInt(items[i-1].value));
          P[i][j] = parseInt(max(P[i-1][j], P[i-1][j - parseInt(items[i-1].weight)] + parseInt(items[i-1].value)));
          // console.log(P[i][j]);
        }
        
      }
    }
    // console.log(P);
    let listOfTakenItems = []
    let i = N;
    let j = W;
    while (i > 0 && j > 0) {
      if (P[i][j] == P[i-1][j]) { //element i not taken
        i--;
      } else { //element i taken, then move to case i-1, j - wi
        listOfTakenItems.push(i);
        console.log(i-1);
        j = j - parseInt(items[i-1].weight);
        i --;
      }
    }
console.log(P[N][W]);
    console.log(listOfTakenItems);
    setListofIndexes(listOfTakenItems);
    if (P[N][W] > 0 ) {
    setResult('Maximum gain you can have : ' + P[N][W] + " And the items that you should take are : " + listOfTakenItems);
      
    } else {
      setResult('Maximum gain you can have : 0, and you can take any item');
    }
  };

  return (
    <div className="container mx-auto max-w-screen-md p-8">
    <h1 className="text-3xl font-bold mb-4">Knapsack problem Using Dynamic Programing</h1>
    <div className='flex flex-col'>
    <p className="text-xl font-bold mb-4">Knapsack Maximum Weight : </p>
    <div className="mb-4">
        <label htmlFor="enteredWeight" className="mr-2 font-bold">
          Enter Weight:
        </label>
        <input
          type="text"
          id="enteredWeight"
          value={enteredWeight}
          onChange={(e) => setEnteredWeight(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={handleAddWeight} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Add Weight
        </button>
        {/* {enteredWeight && (
          <div className="mt-2">
            Entered Weight: {enteredWeight} <span>(Click 'Add Weight' to confirm)</span>
          </div>
        )} */}
        {/* {totalWeight && <p className="mt-4">Maximum knapsack weight: {enteredWeight}</p>} */}
        {totalWeight && <p className="mt-4">{totalWeight}</p>}
      </div>
    </div>

      <p className="text-xl font-bold mb-4">List of Items</p>
      <div>
        
        {items.map((item, index) => (
          <div key={index}
          className={`flex items-center space-x-4 mb-4 ${listofIndexes.includes(index+1) ? 'bg-yellow-200' : ''}`}
           >
            <div className="text-xl font-bold mr-2">{index + 1}.</div>
            <input
              type="text"
              value={item.value}
              readOnly
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={item.weight}
              readOnly
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-xl font-bold mr-2">{items.length + 1}.</div>
          <input
            type="text"
            placeholder="Value"
            value={newItem.value}
            onChange={(e) =>  handleInputChange('value', e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Weight"
            value={newItem.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <button
        onClick={handleAddItem}
        className="bg-green-500 text-white px-4 py-2 rounded"
        // disabled={!isPositiveInteger(newItem.value) || !isPositiveInteger(newItem.weight)}
      >
        Add Item
      </button>
      <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
        Calculate
      </button>
      {result && <p className="mt-4 font-bold text-2xl ">Result: {result}</p>}
    </div>
  );
}
