// Record
chrome.contextMenus.create({
  "title": "Record",
  "contexts": ["page"],

  "onclick": function() {
    //chrome.tabs.executeScript(null, {file: "Replay.js"});
    chrome.tabs.executeScript(null, {code: "r.start();"});
  }
});

// Stop
chrome.contextMenus.create({
  "title": "Stop",
  "contexts": ["page"],

  "onclick": function() {
    chrome.tabs.executeScript(null, {code: "r.stop();"});
  }
});

// Replay
chrome.contextMenus.create({
  "title": "Replay",
  "contexts": ["page"],

  "onclick": function() {
    chrome.tabs.executeScript(null, {code: "r.play();"});
  }
});