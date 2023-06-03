document.getElementById("run-btn").addEventListener("click", function() {
    // Get user input values
    const availableInput = document.getElementById("available-input").value;
    const maxInput = document.getElementById("max-input").value;
    const allocatedInput = document.getElementById("allocated-input").value;
  
    // Parse input values
    const available = availableInput.split(" ").map(Number);
    const max = maxInput.split("\n").map(row => row.split(" ").map(Number));
    const allocated = allocatedInput.split("\n").map(row => row.split(" ").map(Number));
  
    // Call Banker's algorithm function
    const result = bankersAlgorithm(available, max, allocated);
  
    // Update result text
    const resultText = document.getElementById("result");
    resultText.textContent = result ? "Safe state - All processes can be completed." : "Unsafe state - Deadlock may occur.";
  });
  
  function bankersAlgorithm(available, max, allocated) {
    const numProcesses = max.length;
    const numResources = available.length;
  
    // Initialize data structures
    const work = available.slice();
    const finish = Array(numProcesses).fill(false);
    const need = max.map((row, i) => row.map((val, j) => val - allocated[i][j]));
  
    // Check if all processes can be completed
    while (true) {
      let found = false;
  
      for (let i = 0; i < numProcesses; i++) {
        if (!finish[i] && need[i].every((val, j) => val <= work[j])) {
          // Allocate resources to process i
          for (let j = 0; j < numResources; j++) {
            work[j] += allocated[i][j];
          }
  
          finish[i] = true;
          found = true;
        }
      }
  
      if (!found) {
        break;
      }
    }
  
    return finish.every(Boolean);
  }
  