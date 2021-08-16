/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        chrome.tabs.sendMessage(tabId, "Let's go");
    }
});
// // Listen to messages sent from other parts of the extension.
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     // onMessage must return "true" if response is async.
//     let isResponseAsync = false;
//     if (request.popupMounted) {
//         console.log('background notified that Popup.tsx has mounted.');
//     }
//     return isResponseAsync;
// });
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.set({
        showJwtToken: true,
        steamProfileElements: true,
        battleMetricsElements: true
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFDLEtBQWEsRUFBRSxVQUFxQyxFQUFFLEdBQW9CO0lBQ3pHLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLEVBQUU7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzlDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxnRUFBZ0U7QUFDaEUsNEVBQTRFO0FBQzVFLDREQUE0RDtBQUM1RCxtQ0FBbUM7QUFFbkMsa0NBQWtDO0FBQ2xDLDBFQUEwRTtBQUMxRSxRQUFRO0FBRVIsOEJBQThCO0FBQzlCLE1BQU07QUFFTixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsaUJBQU87SUFDMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLG9CQUFvQixFQUFFLElBQUk7UUFDMUIscUJBQXFCLEVBQUUsSUFBSTtLQUM5QixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tcmVhY3QtdHlwZXNjcmlwdC1ib2lsZXJwbGF0ZS8uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQ6IG51bWJlciwgY2hhbmdlSW5mbzogY2hyb21lLnRhYnMuVGFiQ2hhbmdlSW5mbywgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcclxuICAgIGlmIChjaGFuZ2VJbmZvLnN0YXR1cyA9PSBgY29tcGxldGVgKSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIFwiTGV0J3MgZ29cIik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gLy8gTGlzdGVuIHRvIG1lc3NhZ2VzIHNlbnQgZnJvbSBvdGhlciBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uLlxyXG4vLyBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICAvLyBvbk1lc3NhZ2UgbXVzdCByZXR1cm4gXCJ0cnVlXCIgaWYgcmVzcG9uc2UgaXMgYXN5bmMuXHJcbi8vICAgICBsZXQgaXNSZXNwb25zZUFzeW5jID0gZmFsc2U7XHJcblxyXG4vLyAgICAgaWYgKHJlcXVlc3QucG9wdXBNb3VudGVkKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coJ2JhY2tncm91bmQgbm90aWZpZWQgdGhhdCBQb3B1cC50c3ggaGFzIG1vdW50ZWQuJyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIGlzUmVzcG9uc2VBc3luYztcclxuLy8gfSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihkZXRhaWxzID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcclxuICAgICAgICBzaG93Snd0VG9rZW46IHRydWUsXHJcbiAgICAgICAgc3RlYW1Qcm9maWxlRWxlbWVudHM6IHRydWUsXHJcbiAgICAgICAgYmF0dGxlTWV0cmljc0VsZW1lbnRzOiB0cnVlXHJcbiAgICB9KTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9