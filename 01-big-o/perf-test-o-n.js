function count_nums(n) {
  let sum = 0;
  for(let i = 1; i <= n; ++i) {
      sum += i
  }
  return sum;
}

function count_nums_fast(n) {
  return n * (n + 1) / 2;
}

console.log(`These should match. Slow: ${count_nums(100)}; Fast: ${count_nums_fast(100)}`);

const time_count_nums = () => sample(count_nums);
const time_count_nums_fast = () => sample(count_nums_fast);

// Run a specified number of samples of n = some amount
function sample(fn) {
  const samples = 100_000;
  const n = 10_000_000;

  const results = [];

  for(let i = 0; i < samples; ++i) {
      const start = performance.now();
      fn(n);
      const end = performance.now();
      results.push(end - start);
  }

  return results;
}

function stats(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  const stddev = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
  return [mean, stddev];
}

const times = time_count_nums();
const [mean, stddev] = stats(times);

console.log(`Average run time of the slow algorithm is ${mean} with a standard deviation of ${stddev}`);

const times_fast = time_count_nums_fast();
const [mean_fast, stddev_fast] = stats(times_fast);

console.log(`Average run time of the FAST algorithm is ${mean_fast} with a standard deviation of ${stddev_fast}`);
