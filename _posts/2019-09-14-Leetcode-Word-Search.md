---
---


In this post I will explain the [Word Search](https://leetcode.com/problems/word-search/) problem from Leetcode. 

### Problem statement : ###

Given a 2D board and a word, find if the word exists in the grid. The word can be constructed from letters of sequentially 
adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used 
more than once.

### Solution : ###

This problem can be solved using Depth First Search. In normal DFS, we find adjacent nodes from the help of adjacency
list. Here we can declare 2 global array, directionX and directionY which stores the 4 possible locations where we can
go, that is right, left, up and down.

```C++
int directionX[4] = {1, 0, -1, 0};
int directionY[4] = {0, 1, 0, -1};
```

What we will do is, iterate through the given 2-D grid in row major form, check if the current character is the same as 
the first letter in given string, and if it is, call the DFS function on this character.

Our DFS function will check the neighbours of this character and check if we can find the next character of the given string.
We repeat this process till we either find the whole string, or till we reach the end of grid.

Our main function which solves this problem will look like this -

```C++
bool exist(vector<vector<char>>& board, string word) {
  for(int row = 0; row < board.size(); ++row) {
      for(int col = 0; col < board[row].size(); ++col) {
        if(board[row][col] == word[0] && dfs(board, word, row, col, 0)) return true;
      }
  }
  return false;
}
```

Next, we need to write a function so that we don't go out of the given grid -

```C++
bool isInsideGrid(int row, int col, vector<vector<char>>& board) {
  if(row >= 0 && row < board.size() && col >= 0 && col < board[row].size())
   	return true;
  return false;
}
```

The only thing left is to implement the DFS function. The prototype of this function should look something like this -

```C++
bool dfs(vector<vector<char>>& board, string word, int row, int col, int count) {
	// Code goes here
}
```

Here, count will keep track of the words matched till now. Once count is equal to length of the given word minus one,
we can stop the recursion.

One important thing to keep in mind is that the same letter cell cannot be used more than once. That is, we need to 
mark the letters we have already visited. An easy way to do this is just replace the visited letters with some
special character. I will use # in our code.

Keeping in mind all this, the DFS code looks something like this -

```C++
bool dfs(vector<vector<char>>& board, string word, int row, int col, int count) {
	char tmp = board[row][col];
  board[row][col] = '#';
//printBoard(board);
  if(count == word.length() - 1) return true;
  bool flag = false;
  for(int k = 0; k < 4; ++k) {
    int newRow = row + directionY[k];
   	int newCol = col + directionX[k];
   	if(isInsideGrid(newRow, newCol, board) && board[newRow][newCol] == word[count + 1]) {
   		flag = dfs(board, word, newRow, newCol, count+1);
   		if(flag) break;
   	}
  }
  board[row][col] = tmp;
  return flag;
}
```

There is a commented section with another function called printBoard. It will help us visualize how the search actually takes place. 

```C++
void printBoard(vector<vector<char>>& board) {
	for(int row = 0; row < board.size(); ++row) {
		for(int col = 0; col < board[row].size(); ++col) {
			cout << board[row][col] << " ";
		}
		cout << endl;
	}
	cout << "\n\n";
}
```

Now, let us look at some sample test case.

Suppose the given grid is -

board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

And the word we need to search for is "ABCCED". The full code with all the functions is given below, along with the
representaion of how the search is performed -

```C++
#include <bits/stdc++.h>
using namespace std;

int directionX[4] = {1, 0, -1, 0};
int directionY[4] = {0, 1, 0, -1};

bool isInsideGrid(int row, int col, vector<vector<char>>& board) {
  if(row >= 0 && row < board.size() && col >= 0 && col < board[row].size())
    return true;
  return false;
}
    
void printBoard(vector<vector<char>>& board) {
  for(int row = 0; row < board.size(); ++row) {
    for(int col = 0; col < board[row].size(); ++col) {
      cout << board[row][col] << " ";
    }
    cout << endl;
  }
  cout << "\n\n";
}

bool dfs(vector<vector<char>>& board, string word, int row, int col, int count) {
  char tmp = board[row][col];
    board[row][col] = '#';
  printBoard(board);
    if(count == word.length() - 1) return true;
    bool flag = false;
    for(int k = 0; k < 4; ++k) {
      int newRow = row + directionY[k];
      int newCol = col + directionX[k];
      if(isInsideGrid(newRow, newCol, board) && board[newRow][newCol] == word[count + 1]) {
        flag = dfs(board, word, newRow, newCol, count+1);
        if(flag) break;
      }
    }
    board[row][col] = tmp;
    return flag;
}


bool exist(vector<vector<char>>& board, string word) {
    bool flag = false;
    for(int row = 0; row < board.size(); ++row) {
        for(int col = 0; col < board[row].size(); ++col) {
          if(board[row][col] == word[0] && dfs(board, word, row, col, 0)) return true;
        }
    }
    return false;
}

int main() {

  vector<vector<char> > board = { 
                                  {'A','B','C','E'}, 
                                  {'S','F','C','S'}, 
                                  {'A','D','E','E'} 
                                };
  string word = "ABCCED";
  if(exist(board, word)) cout << "Found!\n";
  else cout << "Not found!\n";
}
```

![Representation of DFS]({{ site.baseurl }}/images/terminal.png "Representation of DFS")

That's it! Hope you liked this post.
