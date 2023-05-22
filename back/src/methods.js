const PriorityQueue = require('priorityqueuejs');
const axios = require('axios');
const apiUrl = 'https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f'


// dijkstra based
function getResult(graph, start, end) {
  const distances = {};
  const pq = new PriorityQueue((a, b) => a[1] - b[1]);
  
  Object.keys(graph).forEach((vertex) => {
    distances[vertex] = Infinity;
  });
  distances[start] = 0;
  
  pq.enq([start, 0]);
  
  while (!pq.isEmpty()) {
    const [currentVertex, currentDistance] = pq.deq();
    
    if (currentDistance > distances[currentVertex]) {
      continue;
    }
    
    const neighbors = graph[currentVertex];
    
    Object.keys(neighbors).forEach((neighbor) => {
      const weight = neighbors[neighbor];
      const distance = currentDistance + weight;
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enq([neighbor, distance]);
      }
    });
  }
  
  return distances[end];
}



async function getData() {
  // Request JSON data
  const response = await axios.get(apiUrl);
  const time = response.data;

  return time;
}


module.exports = { getResult, getData }