chrome.omnibox.onInputEntered.addListener(
	function(text) {
    console.log("entered text: " + text);
    var str = text;

    var modifier = parseModifier(str);
    var folder = parseFolder(str); 

});


//parse string for folder name
function parseFolder(str) {
	var folder = ""
	if(str.indexOf(" ") != -1) {
		folder = str.slice(str.indexOf(" "));
	}
	console.log("folder: " + folder);
}


//parse string for modifier for current tab, window, or all
function parseModifier(str) {
    var modifier = "";
    if(str.length == 0) {
        modifier = "current";
        bookmarkCurrentTab();
    } else if(str.match('^win')) {
        modifier = "window";
    } else if(str.match('^all')) {
        modifier = "all";
    }
    console.log("modifier: " + modifier);
}

function bookmarkCurrentTab() {
	getCurrentTab(bookmarkTab);
}

function bookmarkTab(tab) {
	var url = tab.url;
	console.assert(typeof url == 'string', 'tab.url should be a string');

	var title = tab.title;
	console.assert(typeof title == 'string', 'tab.title should be a string');

	chrome.bookmarks.create(
		{'parentId': '1',
		'index': 0,
		'title': title,
		'url': url},
		console.log("added url: " + url)
	);
}

function getCurrentTab(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];

		callback(tab);
	});
}
