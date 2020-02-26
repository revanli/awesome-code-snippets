/**
 * 凑零钱问题，给你 k 中面值的硬币，面值分别为c1, c2, ..., ck
 * 每种银币的数量无限，给出一个总金额 amount , 问最少需要几枚硬币
 * 凑出这个金额，如果不能凑出返回 -1
 *
 * 备忘录消除重叠子问题
 */
function coinChange(coins, amount) {
  // 目标金额为n, 至少需要dp(n)个硬币凑出该金额
  // 备忘录
  let memo = {};
  function dp(n) {
    if (n == 0) {
      return 0;
    }
    if (n < 0) {
      return -1;
    }
    let res = +Infinity;
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i];
      let subproblem = dp(n - coin);
      if (subproblem == -1) continue;
      res = Math.min(res, 1 + subproblem);
    }
    memo[n] = res != Infinity ? res : -1;
    return memo[n];
  }
  return dp(amount);
}

// 自底向上求解，dp数组
function dpCoinChange(coins, amount) {
  let dp = Array(amount + 1).fill(amount + 1);
  // base case
  dp[0] = 0;
  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < coins.length; j++) {
      let coin = coins[j];
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}