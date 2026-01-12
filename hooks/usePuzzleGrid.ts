// You can put this inside the component file or separate
const generateGrid = (rows = 10, cols = 10) => {
  const pieces = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      pieces.push({
        id: `piece-${i}-${j}`,
        row: i,
        col: j,
        // Randomize the "fall" delay slightly for a natural crumbling effect
        fallDelay: (rows - i) * 0.05 + Math.random() * 0.1, 
        // Randomize the "rise" delay so it builds up organically
        riseDelay: Math.random() * 0.5
      });
    }
  }
  return pieces;
};