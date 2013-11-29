ReplayJS
========

**Library to automatically:**
* Record end-users actions in a webpage and replay them
* Record manually navigated scenarios to generate automated test cases


### Features:
* Automatically track MouseClicks, KeyboardEvents and time between events
* Simply include the file and call a method to start tracking user actions
* User actions are stored in LocalStorage


### Todo:
* Ability to serialize tracking history to a configurable remote datasource (Server API, MongoDB, etc.)
* Ability to drop the file and automatically start tracking
* Workaround for file uploads (Store uploaded content as a resource in remote storage)
* Workaround for alerts
* Replay history
* Replay stats
