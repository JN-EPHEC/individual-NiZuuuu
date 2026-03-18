export function calculateShipping(
  distance: number,
  weight: number,
  type: 'standard' | 'express'
): number {
  if (distance < 0) {
    throw new Error("Invalid distance");
  }
  if (weight <= 0 || weight > 50) {
    throw new Error("Invalid weight");
  }

  let cost = 0;
  if (distance <= 50) {
    cost = 10;
  } else if (distance <= 500) {
    cost = 25;
  } else {
    cost = 50;
  }


  if (weight >= 10) {
    cost = cost * 1.5;
  }

  if (type === 'express') {
    cost = cost * 2;
  }

  return cost;
}