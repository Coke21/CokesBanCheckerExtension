chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    if (changeInfo.status == `complete` && tab.url?.startsWith("http")) {
        chrome.tabs.sendMessage(tabId, "Let's go");
    }
});

interface fetchRequest {
    href: string,
    init: RequestInit
}

chrome.runtime.onMessage.addListener(function (request: fetchRequest, sender, sendResponse) {
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