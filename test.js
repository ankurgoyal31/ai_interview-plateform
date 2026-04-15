let res = await fetch("https://github.com/neenza/leetcode-problems.git");
let data = await res.json();
console.log(data.result.problems[0])