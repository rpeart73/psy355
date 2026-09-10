/* PSY355 recording registry.
   Add an entry only after the recording or instructor update is ready for students.
   Supported platforms: youtube, zoom and blackboard. Never place meeting passcodes or private credentials here.
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
window.PSY355_RECORDINGS = {
  "1": {
    kind: "class",
    platform: "blackboard",
    url: "https://learn.senecapolytechnic.ca/ultra/courses/_787839_1/document/_27539881_1?view=content&state=view",
    title: "Week 1 class recording",
    date: "September 10, 2026",
    access: "Sign in with your Seneca account. The Zoom link and passcode are on the recording page."
  }
};
