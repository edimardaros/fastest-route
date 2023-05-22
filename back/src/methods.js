const PriorityQueue = require('priorityqueuejs');
const axios = require('axios');
const apiUrl = 'https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f'


function getResult(graph, start, end) {
  const time = {};
  const predecessors = {};
  const pq = new PriorityQueue((a, b) => a[1] - b[1]);
  
  Object.keys(graph).forEach((vertex) => {
    time[vertex] = Infinity;
    predecessors[vertex] = null;
  });
  time[start] = 0;
  
  pq.enq([start, 0]);
  
  while (!pq.isEmpty()) {
    const [currentVertex, currentDistance] = pq.deq();
    
    if (currentDistance > time[currentVertex]) {
      continue;
    }
    
    const neighbors = graph[currentVertex];
    
    Object.keys(neighbors).forEach((neighbor) => {
      const weight = neighbors[neighbor];
      const distance = currentDistance + weight;
      
      if (distance < time[neighbor]) {
        time[neighbor] = distance;
        predecessors[neighbor] = currentVertex;
        pq.enq([neighbor, distance]);
      }
    });
  }

  const path = [];
  let currentVertex = end;

  while (currentVertex !== null) {
    path.unshift(currentVertex);
    currentVertex = predecessors[currentVertex];
  }
  
  // return time[end];
  // console.log({ distance: time[end], path })
  return { time: time[end], path };
}



async function getData() {
  // Request JSON data
  const response = await axios.get(apiUrl);
  const time = response.data;

  return time;
}

function getFullPath(pathToPick, pathToDelivery) {
  try {
    pathToDelivery.splice(0, 1);
    return pathToPick.concat(pathToDelivery);
  } catch (error) {
    console.error('Failed to get the Full Path.');
  }
}

function getTotalTime(timeToPick, timeToDelivery) {
  try {
    return timeToPick + timeToDelivery;
  } catch (error) {
    console.error('Failed to get the Total Time.');
  }
}

function checkPositionExists(from, pick, to) {
  var regex = /^[A-H][1-8]$/;
  console.log(from, pick, to)
  return regex.test(from) && regex.test(pick) && regex.test(to);
}

module.exports = { getData, getResult, getFullPath, getTotalTime, checkPositionExists }