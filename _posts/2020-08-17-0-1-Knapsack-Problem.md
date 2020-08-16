---
layout: post
title: The 0-1 Knapsack Problem
subtitle: Using recursive memoization to better understand the classic problem.
tags: [algorithms]
---

Let us start by understanding the problem statement. Given a knapsack (a bag) with a maximum capacity W,
and a list of 'N' items with their weights and values, find the maximum total value we can fit in the knapsack.

Let's say we have a bag which can carry a total weight of 4 kg.

There are 3 stones, Stone A, Stone B and Stone C, with weights 4 kg, 5 kg and 1 kg, respectively.
Also let's say the stones have certain  value, say, 1$, 2$ and 3$ respectively.

So we have a little table here,

| Stone | Value | Weight |
| :---- | :---- | :----- |
|   A   |   1$  |  4 kg  |
|   B   |   2$  |  5 kg  |
|   C   |   3$  |  1 kg  |

Now let us try every possible way we can fill our bag.

If I put in stone A, the bag can not carry any more stones because it's maximum capaity was 4 kg. In this case,
since we cannot put in any more stones, the value we get is 1$.

I cannot put in stone B, since that exceeds the maximum capacity of the bag. Hence, this gives us no value.

If I put in stone C, the bag can still carry 4 kg - 1 kg = 3 kg of stones. The value I get is 3$, but the remaining capacity of bag
is 3 kg which is less than either stone A's or stone B's weight.

If this was not the case, say, stone A had a weight of 2 kg only, then we could have put in both stone A and stone C for a total value
of 4$. But in our case, the maximum value we get is by putting in stone C, which is 3$.

Now how to make our dumb machines perform this task, and that too for very large values of N?

When we were trying to fit in stones in our bag with the small example, there were a couple of observations -

- At every step, there are two possible choices. Either we take a stone, or we don't.
- The remaining capacity of the bag must never go below zero.

Let us start solving this problem in programming terms while keeping these two obervations in mind, which will help us write the code.

Suppose there is a knapsack which has a maximum capacity W, and N number of stones whose weights are stored in wt[N], and values in val[N].
So for the first stone, it's weight is wt[0] and value is val[0].

We need to every possible configuration, or in simple words, we should put in every stone, one by one, to check if we get the maximum possible value.

Let's give a skeleton to our function -

```C++
int solve(int* wt, int* val, int W, int index) {
 
}
```

- The return type of our function is int, because we will be returning the maximum possible value we can carry.
- The arguments are the weight array, the value array, the maximum capacity to check it never goes below zero, and index to track the current stone we are at.

We will start with index = N-1 or the very last element, and go right to left, till index reaches 0. This is because once index becomes less than 0, we will
know that we have scanned all the possible elements and there is nothing more to be done.

Our function returns the maximum possible value, and if there are no stones left, the max possible value returned would be zero. This, forms our base case.

```C++
int solve(int* wt, int* val, int W, int index) {
    if(index < 0) return 0;
}
```

Now, let's see the choices we have at each step and how to code it. This is the difficult part, and if one understands this, he/she/they can solve most of the
classic DP problems using recursion.

If at a given index, the remaining capacity of our knapsack is strictly less than the weight of stone at the index, our only option
is to skip this stone. That is,

```C++
int solve(int* wt, int* val, int W, int index) {
    if(index < 0) return 0;
    if (W - wt[index] < 0) {
        return solve(wt, val, W, index - 1);
    }
}
```

What we are doing is, if the given condition is true, we just skip this stone by calling our function with index - 1. No other change is needed here.
If you are confused, hold on till the end of the blog post.

If this is not the case, that is, the remaining capacity is more than the weight of current index, then we have two options.
We either pick this stone, or we don't pick this stone.

- If we pick the stone, we should reduce its weight from the remaining capacity, and add its value to the function call.
- If we skip the stone, just reduce the index.

We need to find the maximum of these two options.

In code, this would look like this:

```C++
int solve(int* wt, int* val, int W, int index) {
    if(index < 0) return 0;
    if (W - wt[index] < 0) {
        return solve(wt, val, W, index - 1);
    }
    else {
    	return max( val[index] + solve(wt, val, W - wt[index], index-1) , solve(wt, val, W, index-1) );
    } 
}
```

This is our final recursive function to solve the 0-1 knapsack problem for small values of N.

In the worst case, our function will call itself twice for every possible stone. This would lead to a time complexity of O(2^N).
To make this more efficient, we need to add caching.