---
layout: post
title: AtCoder Contest 186
subtitle: Notes on questions I could not solve [WIP]
tags: [competitive-programming]
---


# Table of Contents



Problems I could not solve -

1.  <https://atcoder.jp/contests/abc186/tasks/abc186_d>

Reason : Could not observe pattern => Sort the list then observe.

2.<https://atcoder.jp/contests/abc186/tasks/abc186_e>
Reason : Missing Concepts => Congruence Modulo, Solving Linear Congruences, Extended Euclid's Algorithm

Congruence Modulo is basically two integers which give the same answer when taken the mod of by some integer X.
For example, if A mod X = 1 and B mod X = 1, then we say A ≡ B mod X

There are N chairs, we are at S chair from start and can jump K chairs. To reach the first chair in x moves,
=> S + xK must be equal to 0.
=> S + xK = 0.
=> (S +xK) % N = 0
=> S + xK ≡ 0 % N (from congruence modulo concept)
=> Kx ≡ -S % N
=> **Kx ≡ (N-S) % N**
This is a linear congruence of the form Ax ≡ B % N which can be solved as follows ->

a. There is a solution iff B % gcd(A,N) = 0.
b. There are gcd(A,N) solutions seperated by N / gcd(A,N)

Let gcd(A,N) be g. Since g must divide A, B and N let, A' = A/g, B' = B/g, N' = N/g.
Now the equation becomes =>  A'x ≡ B' % N'
Since g was the gcd of A and N and we divided A and N by g, hence the gcd of A' and N' must be 1.
Hence, x = (A'' \* B') % N' where A'' is the inverse modulo of A' mod N'.

We can use the extended euclid's algorithm to find inverse modulo.
From extended euclid's algorithm, we can find integers x and y such that for integers a and b,
ax + by = gcd(a,b)

Let a = A' and b = N', and since gcd(A', N') = 1, we can write,
A'x + N'y = 1

We can say that, 
A'x + N'y ≡ 1 % N'
=> A'x ≡ 1 % N'

Which basically means that the x co-efficient returned by euclid's extended algorithm must be multiplied to our ans.

Hence, final ans = (B % N \* x) % N;

3.<https://atcoder.jp/contests/abc186/tasks/abc186_f>
Reason : Missing Concept => Fenwick Trees

TBF I do understand the logic on how to solve this, but can't wrap my head around on why and how to use fenwick trees
to arrive at the solution. Will try this later.

