chrome.omnibox.onInputEntered.addListener(
	function(text) {
		console.log("entered text: " + text);
		bookmarkCurrentTab();
});

function addBookmark(url) {
	chrome.bookmarks.create(
		{'parentId': '1', 
		'url': url},
		console.log("added url: " + url)
	);
}

function bookmarkCurrentTab() {
	getCurrentTabUrl(addBookmark);
}

function getCurrentTabUrl(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	
	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];
		var url = tab.url;

	console.assert(typeof url == 'string', 'tab.url should be a string');

	callback(url);
	});
}
