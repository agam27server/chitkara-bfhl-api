function generateFibonacci(n) {
  if (n < 0) return [];
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  const fib = [0, 1];
  
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  
  return fib;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  
  return true;
}

function filterPrimes(arr) {
  return arr.filter(num => isPrime(num));
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  
  return a;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

function calculateHCF(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return Math.abs(arr[0]);
  
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = gcd(result, arr[i]);
  }
  
  return result;
}

function calculateLCM(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return Math.abs(arr[0]);
  
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }
  
  return result;
}

module.exports = {
  generateFibonacci,
  filterPrimes,
  calculateHCF,
  calculateLCM
};
