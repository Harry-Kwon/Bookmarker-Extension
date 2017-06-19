chrome.omnibox.onInputEntered.addListener(function(text) {
	console.log("entered text: " + text);
	var str = text;

	var modifier = parseModifier(str);
	var folderName = parseFolder(str);

	getFolder(folderName, function(folder) {
		getTabs(modifier, function(tabs) {
				console.log(tabs[0].title);
				for (var i=0; i<tabs.length; i++) {
					addTabToFolder(tabs[i], folder);
				}
		});
	});
});

function addTabToFolder(tab, folder) {
	console.log(tab);
	chrome.bookmarks.create({"parentId":folder.id,
							"index":0,
							"title":tab.title,
							"url": tab.url});
}

//parse string for folder name
function parseFolder(str) {
	var folder = ""
	if(str.indexOf(" ") != -1) {
		folder = str.slice(str.indexOf(" "));
	}
	console.log("folder: " + folder);
    return folder;
}


//parse string for modifier for current tab, window, or all
function parseModifier(str) {
    var modifier = "";
    if(str=="" || str.match('^this')) {
        modifier = "current";
    } else if(str.match('^win')) {
        modifier = "window";
    } else if(str.match('^all')) {
        modifier = "all";
    }
    console.log("modifier: " + modifier);
    return modifier;
}

function getFolder(folder, callback) {
	if(folder=="") {
		chrome.bookmarks.get("1", function(nodes) {
			callback(nodes[0]);
		});
	} else {
		createFolder(folder, callback);
	}
}

//creates a folder and passes the BookmarkTreeNode to the callback function
function createFolder(folder, callback) {
    chrome.bookmarks.create({"parentId":"1", "index":0, "title":folder}, function(result) {
        callback(result);
});
}

//gets tabs specified by the modifier "", "window", or "all"
function getTabs(modifier, callback) {
	var queryInfo = {}; //default is all
	if(modifier == "window") {
		queryInfo["currentWindow"] = true;
	} else if (modifier == "current") {
		queryInfo["active"] = true;
		queryInfo["currentWindow"] = true;
	}
	console.log(queryInfo);

	chrome.tabs.query(queryInfo, callback);
}
