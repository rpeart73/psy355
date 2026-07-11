/* PSY355 recording registry.
   Add an entry only after the recording or instructor update is ready for students.
   Supported platforms: youtube and zoom. Never place meeting passcodes or private credentials here.
   Example:
   "2": {
     kind: "class",
     platform: "youtube",
     videoId: "YOUTUBE_ID",
     title: "Week 2 class recording",
     date: "2026-09-14",
     access: "Captions available in the player",
     transcriptUrl: ""
   }
*/
window.PSY355_RECORDINGS = {};
