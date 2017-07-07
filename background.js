/*** 
  EVENT LISTENERS 
 ***/
chrome.omnibox.onInputEntered.addListener(function(text) {
    console.log("entered text: " + text);
    if(text) {
        var command = parseCommand(text);
        console.log(command);
        
        if(command == "add") {
            var modifier = parseAddModifier(text);
            var folderName = parseAddFolder(text);

            getFolder(folderName, function(folder) {
                getTabs(modifier, function(tabs) {
                        console.log(tabs[0].title);
                        for (var i=0; i<tabs.length; i++) {
                            addTabToFolder(tabs[i], folder);
                        }
                });
            });
        } else if(command == "remove") {
           var folderName = parseFolder(text) 
        } else if(command == "open") {
            //
        } else {
            console.log("invalid command: " + command);
        }
    }
});

/***
  COMMAND PARSING
  ***/

//parses and returns the command from string entered to the omnibox
function parseCommand(str) {
    var command = str.split(" ")[0];
    return command;
}

function parseAddModifier(str) {
    var params = str.split(" ");
    var modifier = "";
    
    if(params.length >= 2) {
        modifier = params[1];
    }
    return modifier;
}

function parseAddFolder(str) {
    var params = str.split(" ");
    var folder = "";
    if(params.length >=3) {
        folder = params[2];
    }
    return folder;
}

//adds the tab to the folder node
function addTabToFolder(tab, folder) {
    console.log(tab);
    console.log(folder);
    chrome.bookmarks.create({"parentId":folder.id,
                            "index":0,
                            "title":tab.title,
                            "url": tab.url});
}

//calls callback on a bookmark node cooresponding to the folder name or path given
function getFolder(folder, callback) {
    console.log(createNode);
    findNode(folder, createNode, function(node) {
        if(node==null) {
            createFolder(folder, callback);
        } else {
            callback(node);
        }
    });
}    

function nullNode(title, parent_node, callback) {
    console.log("node with title: " + title + " does not exist");
    callback(null);
}

function createNode(title, parent_node, callback) {
    console.log("creating node: "+title);
    chrome.bookmarks.create({"parentId":parent_node.id, "index":0, "title":title}, callback);
}

//findNode(path, callback) helper function that finds the path starting from root node. for ease of use
// path - string with names of nodes/folders delimited by "." ex.) folder1.folder2.folder3.bookmark
// callback should take a node corresponding to the path
function findNode(path, no_node_cont, callback) {
    chrome.bookmarks.get("1", function(nodes) {
        findNode_r(path.split("."), nodes[0], no_node_cont, callback);
    });
}
    
//findNode-r(path, node, callback) function that recursively searches for node in tree starting from root node
function findNode_r(path, node, no_node_cont, callback) {
    console.log("findNode_r");
    //base case where path is empty
    console.log("path: "+path);
    if(path.length == 0) {
        console.log("a");
        callback(node);
    } else if(node==null) {
        console.log("b");
        callback(null);
    } else {
        var p = path[0];
        chrome.bookmarks.getChildren(node.id, function(nodes) {
            var nextNode = null;
            for(var i=0; i<nodes.length; i++) {
                if(nodes[i].title == p) {
                    nextNode = nodes[i];
                }
            }
            console.log(nextNode);

            if(nextNode==null) {
                console.log("starting continuation");
                no_node_cont(p, node, function(new_node) {
                    console.log(new_node + " returned from cont");
                    findNode_r(path.slice(1), new_node, no_node_cont, callback);
                });
            } else {
                findNode_r(path.slice(1), nextNode, no_node_cont, callback);
            }
        });
    }
}

//creates a folder and passes the BookmarkTreeNode to the callback function
function createFolder(folder, callback) {
    console.log("creating folder: " + folder);
    chrome.bookmarks.create({"parentId":"1", "index":0, "title":folder}, function(result) {
        callback(result);
    });
}

//gets tabs specified by the modifier "", "window", or "all"
function getTabs(modifier, callback) {
    var queryInfo = {}; //default is all
    if(modifier == "window") {
        queryInfo["currentWindow"] = true;
    } else if (modifier == "this") {
        queryInfo["active"] = true;
        queryInfo["currentWindow"] = true;
    }
    console.log(queryInfo);

    chrome.tabs.query(queryInfo, callback);
}
