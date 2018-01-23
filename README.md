# React with tree structure data

This is a simple app that reads values from a local csv file and constructs a tree like component to display the information.

## Getting started

1. Make sure that you have Node.js installed and Yarn.
2. Clone the repository and get into the root folder.
3. Install the packages using the command line with `yarn install && cd client && yarn install`.
4. To run the app, make sure youre in the root folder in the terminal type `yarn dev`.

## Project Solution description

The back end builds a tree structure (Linked nodes) using the data supplied in the csv. Each Node has the fields defined in the csv with the addition of children (array) and total_amount (the cumulative sum of all the children and the current node). To speed up the process of searching the tree a Map was used so that you could traverse the nodes and find the one that youre after faster than searching through the structure. This information is then passed to the client and the UI is rendered with react.

## Assumptions

* That the parent of an element is always declared before its children
* That an element with parent id equal to its own id is rooted at the top node
* That there would be more than one element with an id equal to that of its parent, i.e. parent_id === id

## Technologies used

* React from the front end 
* Node.js with Express for the server and the routing.


## Authors

* Strahinja Ajvaz

## License

This project is licensed under the MIT License