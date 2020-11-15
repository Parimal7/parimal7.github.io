---
layout: post
title: Codeforces-Round-682-Review
subtitle: Codeforces Pupil tries Div2 round
tags: [algorithms]
---

# Table of Contents

1.  [Problem A](#org522b82a)
2.  [Problem B](#org58dd4af)
3.  [Problem C](#org3491810)

My rating on Codeforces has always been really low and I would like to change that. My last contest was 9 months ago,
where I finally reached green! (xD) Starting today, I will be giving more contests and try to write a small review
on how it went.


<a id="org522b82a"></a>

# [Problem A](https://codeforces.com/contest/1438/problem/A)

With some observation, you can easily tell that if we have the same numbers in an array, the sum will always be divisible by its size.
So the solution was to output any number (I picked 7) n times.

    #include <bits/stdc++.h>
    using namespace std;
    int main() {
      int n;
      cin >> n;
      while(n--) {
        int t;
        cin >> t;
        while(t--) cout << 7 << " ";
        cout << endl;
      }
    }


<a id="org58dd4af"></a>

# [Problem B](https://codeforces.com/contest/1438/problem/B)

In this problem I got a bit lucky. First observation was if numbers in the array were distinct, then it will never be possible to meet
the required condition. I coded the solution keeping this in mind and it worked. 

    #include <bits/stdc++.h>
    using namespace std;
    int main() {
      int t;
      cin >> t;
      while(t--) {
        int n;
        cin >> n;
        int arr[n];
        bool flag = false;
        unordered_map<int, int> umap;
        for(int i = 0; i < n; ++i)  {
          cin >> arr[i];
          if(umap.find(arr[i]) != umap.end()) flag = true;
          umap[arr[i]]++;
        }
        if(flag) cout<< "YES\n";
        else {
          cout<< "NO\n";
        }
        // 2 5 3 4
        // 4 32 8 16
      }
    }


<a id="org3491810"></a>

# [Problem C](https://codeforces.com/contest/1438/problem/C)

The only thing to observe here is the fact that same numbers should not be adjacent. This means the square should look like
a chess board with white and black boxes. The easiest way to do this is place odd numbers at specific grid and even at other 
grids.

At this point it was annoucned the round will be unrated and I did not bother solving any more (also D was probably out of my reach anyway).

