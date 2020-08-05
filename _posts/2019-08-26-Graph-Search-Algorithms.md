In this post, I will explain breadth first search and depth first search in a simple and lucid way, along with their
implementation in C++.

Problem statement - Given a graph with V vertices and E edges, perform graph traversal (BFS and DFS) and print the order
in which the nodes are visited.

Solution -

### Breadth First Search ###

I will assume you already know the theory behind it and will try to explain how to code it from scratch.

We will need the following containers -
- An adjacency list to store the graph, for this we can use a vector of vectors.
- A boolean container which keeps track of nodes we have visited to avoid endless loop in case of cycles. For this we can use a vector of bool.
- A queue data structure which adds nodes which we need to visit.

The concept is simple. We start from the source node (given by the user), add it to the queue, mark it as visited, and
perform the following until the queue is empty -

- Store the node in front of queue in a variable, say x, since we need to process the adjacency list of this node.
- Pop the queue.
- Process the adjacency list of this node (x in our case) and see if the nodes directly reachable are -
    - Visited, then we move to the next node in the adjacency list of x.
    - Not visited, then we mark this node as visited and push it in the queue.

That's it. Simple enough. Now, here is the code -

```C++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<vector<int> > adjList;
vector<bool> visited;

int main(){

	int V; // Number of vertices
	cout << "Enter number of vertices\n";
	cin >> V;
	int E; // Number of edges
	cout << "Enter number of edges\n";
	cin >> E;

	adjList.resize(V);
	visited.resize(V, 0);

	for(int i = 0; i < E; ++i){
		int v1, v2;
		cin >> v1 >> v2;
		adjList[v1].push_back(v2);
	}

	queue<int> q;

	int source;
	cout << "Enter source vertex for performing dfs\n";
	cin >> source;

	q.push(source);
	visited[source] = 1;
	while(!q.empty()){
		int u = q.front();
		cout << "Visiting node --> " << u << endl;
		q.pop();
		for(auto x: adjList[u]) if(!visited[x]){
			q.push(x);
			visited[x] = 1;
		}
	}

	for(auto x:visited) cout << x << endl;
}
```
### Depth First Search ###

Again, hope you know the theory. I will provide a very short DFS code which doesn't use a stack. This uses the power of
recursion.

We will need the following containers -
- An adjacency list to store the graph.
- A boolean container to mark visited nodes.

Start the DFS from source node, mark it as visited, and for every node in its adjacency list, say x, recursively call DFS(x).

Here is the code -

```C++
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int> > adjList;
vector<bool> visited;

void dfs(int u){
	cout << "Visiting node --> " << u << endl;
	visited[u] = 1;
	for(auto x:adjList[u]){
		if(!visited[x]) dfs(x);
	}
}

int main(){

	int V; // Number of vertices
	cout << "Enter number of vertices\n";
	cin >> V;
	int E; // Number of edges
	cout << "Enter number of edges\n";
	cin >> E;

	adjList.resize(V);
	visited.resize(V, 0);

	for(int i = 0; i < E; ++i){
		int v1, v2;
		cin >> v1 >> v2;
		adjList[v1].push_back(v2);
	}

	int source;
	cout << "Enter source vertex for performing dfs\n";
	cin >> source;

	dfs(source);
}
```

That's it, the two most common graph search algorithms. Scrutanize the code if you don't understand it in one go. Try it
with some cases of your own, with a random graph.
