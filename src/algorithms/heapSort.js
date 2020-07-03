/*
Heap Sort
--------------

The items are sorted into a organized heap (a.k.a A Tree)
Ex. o
   / \
  o   o
 / \ / \
o  o o  o 
where each item has 2 children which are always smaller than 
it, the left child must also be bigger than the right one.
Therefore, the first item in the heap will always be the biggest
and once the tree is made it can be moved to the end. However, once
it is moved to the end the tree is now disorganized and must be 
remade. After it is remade the largest item is also moved to the 
end, and this process is repeated until the array is sorted
*/

async function heapSort() {
  //The last position in the array is saved in n for 
  //simplification purposes
  let n = arr.length - 1
  //The heap is created using a for loop
  for(let parentNode = n; parentNode >= 0; parentNode--) {
    //If the user stops the sort than return ASAP
    if (isStopped == true) {stopSort(); return}
    //The currentNode is swapped if it is smaller than its children
    await drown(parentNode)
  }
  //After the heap is made, the first bar is moved to the end
  //and the array is resorted
  while (n >= 0) {
    //If the user stops the sort than return ASAP
    if (isStopped == true) {stopSort(); return}
    //The first element (position 0) is swapped to the end
    await swap(0, n)
    //That element is removed from concern
    n--
    //The array is reorganized
    await drown(0)
  }
  //This function pushes the parentNode down if it is smaller than its children
  async function drown(parentNode) {
    //If the user stops the sort than return ASAP
    if (isStopped == true) return
    //The leftNode is found with this formula
    let leftNode = parentNode*2 + 1
    //The rightNode is found with this formula
    let rightNode = parentNode*2 + 2
    //The largest node is defaulted to the parent node
    let maxNode = parentNode;
    //If the leftNode is smaller than array's length 
    //and greater than the largest node, it is now the maxNode
    if (leftNode <= n){
      await comparison(leftNode, maxNode);
      if(arr[leftNode].height > arr[maxNode].height){
        maxNode = leftNode
      }
    }
    //If the rightNode is smaller than array's length 
    //and greater than the largest node, it is now the maxNode
    if(rightNode <= n) {
      await comparison(rightNode, maxNode);
      if (arr[rightNode].height > arr[maxNode].height){
        maxNode = rightNode
      }
    }
    //If the maxNode is not the parentNode 
    //than swap the parentNode with the largest found node
    if (maxNode > parentNode) {
      await swap(parentNode, maxNode)
      await drown(maxNode)
    }
  }

  //Once the array is sorted the results are checked to ensure accuracy
  check();
}