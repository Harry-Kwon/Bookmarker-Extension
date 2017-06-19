# Bookmarker-Extension
A Google Chrome extension that bookmarks tabs through the address bar. Designed for power users that prefer to use the keyboard. Type 'bm' and space/tab and enter a command to bookmark your current, tabs in this window, or all tabs into a folder.

## Install
This extension can be installed here at the Chrome Web Store.

## Usage Instructions
1. Select the address bar (ctrl-l) by default

2. Type 'bm' and space or tab to trigger the extension

3. Type in a command to book

## Commands
[\<Tabs>] [\<Folder>]
* A blank command with no Tabs or Folder will add the current page to the bookmarks bar
* \<Tabs>
  * '' or 'this' (empty): Current tab
  * 'win': Tabs in current window
  * 'all': All open tabs
* \<Folder>
  * '' (empty): No folder. Tabs will be saved to the bookmarks bar
  * '<Folder Name>': Tabs will be added to the folder <Folder Name> in the bookmarks bar

## Examples
* '': Saves the current tab to the bookmarks bar.
* 'win': Saves all tabs in the current window to the bookmarks bar
* 'all myFolder': Save all open tabs to the folder 'myFolder'
