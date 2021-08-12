chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    if (changeInfo.status == `complete`) {
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