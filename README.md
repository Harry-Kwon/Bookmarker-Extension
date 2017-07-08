# Bookmarker-Extension
A Google Chrome extension that bookmarks tabs through the address bar. Designed for power users that prefer to use the keyboard. Type 'bm' and space/tab and enter a command to bookmark your current, tabs in this window, or all tabs into a folder.

## Install
This extension can be installed in the Chrome Web Store [here](https://github.com/Harry-Kwon/Bookmarker-Extension/blob/master/README.md)

## Usage Instructions
1. Select the address bar (ctrl-l by default)

2. Type 'bm' and tab to start entering commands in the omnibox

3. Enter commands to add, remove, or open your bookmarks

## Commands
* add \<this | window | all\> \[folder\]
    * Description: Adds the specified bookmarks to the designated folder. Folder defaults to the bookmarks bar. Will create the folder if it does not exist.
* remove  \<folder\>
    * Description: Removes the specified folder or bookmark. A folder must be specified.
* open \<folder\>
    * Description: Opens the bookmark or all bookmarks in the specified folder or bookmark.
* help
    * Description: Opens this page.
* Note: Nested folders or bookmarks inside folders can be designated by delimiting with periods (ex. remove foo.bar)

## Example Usage
* add
    * "add this": Bookmarks the current page to the bookmarks bar
    * "add this foo.myfolder": Bookmarks the current page to folder "myfolder" inside folder "foo". It will create the folders if they do not exist.
    * "add window myfolder": Bookmarks all tabs in the window to folder "myfolder"
* remove
    * "remove mybookmark": Removes bookmark "mybookmark"
    * "remove myfolder": Removes folder "myfolder" and all its contents"
* open
    * "open mybookmark": Opens bookmark "mybookmark" in a new tab
    * "open myfolder": Opens all bookmarks in folder "myfolder" in new tabs
