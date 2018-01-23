const express = require("express");
const fs = require("fs");
const path = require("path");

const Node = require("./models/Node");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/api/get_data", (req, res) => {
  const data = convertCSVtoArray();
  const tree = createTree(data);
  res.json(tree);
});

const convertCSVtoArray = () => {
  const data = fs
    .readFileSync(path.join(__dirname, "..", "sampledata.csv"))
    .toString();
  const array = data.split(/,|\n/);
  const tempArray = [];
  for (let i = 4; i < array.length - 1; i += 4) {
    tempArray.push({
      id: array[i],
      name: array[i + 1],
      parent_id: array[i + 2],
      amount: array[i + 3]
    });
  }
  return { data: tempArray };
};

const createTree = ({ data }) => {
  const map = new Map();
  const _root = new Node(0, "_root", 0, 0);

  data.forEach(item => {
    /*
        its a root child element
        *assumption[3]
    */
    if (item.id === item.parent_id) {
      _root.addChild(
        new Node(
          item.id,
          item.name,
          item.parent_id,
          parseFloat(item.amount),
          _root.changeTotal
        )
      );
      map.set(item.id, `${item.id}`);
      return;
    }

    /* 
        gets the string that represents the path to the parent
        *assumption[1]
    */
    const parentPath = map.get(item.parent_id);
    addChild(parentPath, _root, item);

    // update the map to show the new path for added item
    map.set(item.id, `${parentPath},${item.id}`);
  });

  return { express: _root };
};

const addChild = (path, parent, child) => {
  // if the string is empty, then we add the child to the parent
  if (path === "") {
    parent.addChild(
      new Node(
        child.id,
        child.name,
        child.parent_id,
        parseFloat(child.amount),
        parent.changeTotal
      )
    );
    return;
  } else {
    //if there isnt a comma, its on the last iteration so we pass it ""
    if (path.indexOf(",") === -1) {
      addChild("", parent.children.filter(c => c.id === path)[0], child);
    } else {
      // remove the current index and pass the new path
      const index = path.substr(0, path.indexOf(","));
      const new_path = path.substr(path.indexOf(",") + 1, path.length);
      addChild(new_path, parent.children.filter(c => c.id === index)[0], child);
    }
  }
};

app.listen(port, () => console.log(`Listening on port ${port}`));
