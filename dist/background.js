/******/ (() => { // webpackBootstrap
    var __webpack_exports__ = {};
    /*!***************************!*\
      !*** ./src/background.ts ***!
      \***************************/
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status == `complete`) {
            chrome.tabs.sendMessage(tabId, "Let's go");
        }
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        let controller = new AbortController();
        let timeoutId = setTimeout(() => controller.abort(), 60_000);
        request.init.signal = controller.signal;
        fetch(request.href, request.init).then(function (response) {
            return response.text().then(function (text) {
                sendResponse([{
                    body: text,
                    status: response.status,
                    statusText: response.statusText,
                }, null]);
            });
        }, function (error) {
            sendResponse([null, error]);
        });
        clearTimeout(timeoutId);
        return true;
    });
    chrome.runtime.onInstalled.addListener(details => {
        chrome.storage.sync.set({
            showJwtToken: true,
            steamProfileElements: true,
            battleMetricsElements: true
        });
    });

    /******/
})()
    ;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQWEsRUFBRSxVQUFxQyxFQUFFLEdBQW9CLEVBQUUsRUFBRTtJQUM3RyxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksVUFBVSxFQUFFO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM5QztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBT0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsT0FBcUIsRUFBRSxNQUFNLEVBQUUsWUFBWTtJQUN0RixJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQ3ZDLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUV4QyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsUUFBUTtRQUNyRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO1lBQ3RDLFlBQVksQ0FBQyxDQUFDO29CQUNWLElBQUksRUFBRSxJQUFJO29CQUNWLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtvQkFDdkIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2lCQUNsQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBRSxVQUFVLEtBQUs7UUFDZCxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsb0JBQW9CLEVBQUUsSUFBSTtRQUMxQixxQkFBcUIsRUFBRSxJQUFJO0tBQzlCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi1yZWFjdC10eXBlc2NyaXB0LWJvaWxlcnBsYXRlLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWJJZDogbnVtYmVyLCBjaGFuZ2VJbmZvOiBjaHJvbWUudGFicy5UYWJDaGFuZ2VJbmZvLCB0YWI6IGNocm9tZS50YWJzLlRhYikgPT4ge1xyXG4gICAgaWYgKGNoYW5nZUluZm8uc3RhdHVzID09IGBjb21wbGV0ZWApIHtcclxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJJZCwgXCJMZXQncyBnb1wiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5pbnRlcmZhY2UgZmV0Y2hSZXF1ZXN0IHtcclxuICAgIGhyZWY6IHN0cmluZyxcclxuICAgIGluaXQ6IFJlcXVlc3RJbml0XHJcbn1cclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdDogZmV0Y2hSZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDYwXzAwMCk7XHJcbiAgICByZXF1ZXN0LmluaXQuc2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XHJcblxyXG4gICAgZmV0Y2gocmVxdWVzdC5ocmVmLCByZXF1ZXN0LmluaXQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKS50aGVuKGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShbe1xyXG4gICAgICAgICAgICAgICAgYm9keTogdGV4dCxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcclxuICAgICAgICAgICAgfSwgbnVsbF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKFtudWxsLCBlcnJvcl0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihkZXRhaWxzID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcclxuICAgICAgICBzaG93Snd0VG9rZW46IHRydWUsXHJcbiAgICAgICAgc3RlYW1Qcm9maWxlRWxlbWVudHM6IHRydWUsXHJcbiAgICAgICAgYmF0dGxlTWV0cmljc0VsZW1lbnRzOiB0cnVlXHJcbiAgICB9KTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9