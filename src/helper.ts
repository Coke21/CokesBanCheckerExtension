export interface onMessageReceived {
    request: string,
    sender: chrome.runtime.MessageSender,
    response: any
}

export function logInformation(e: String): void {
    console.log(`GameCP Shortcut reported: ${e}`);
}

export function logError(e: String): void {
    console.error(`GameCP Shortcut threw exception: ${e}`);
}

export function waitForElement(selector: string) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

export function isValidHref(href: string, exact: boolean = false): boolean {
    if (exact) {
        if (window.location.href == href) {
            return true;
        }
        return false;
    }

    if (window.location.href.includes(href)) {
        return true;
    }
    return false;
}

export function IsNumberHrefEnd(): boolean {
    let pattern = new RegExp(/\d+$/);
    if (pattern.test(window.location.href)) {
        return true;
    }

    return false;
}

export async function fetchData(href: string, init: RequestInit) {
    return new Promise<Response>((resolve, reject) => {
        chrome.runtime.sendMessage({ href, init }, messageResponse => {
            let [response, error] = messageResponse;
            if (response === null) {
                reject(error);
            } else {
                let body = response.body ? new Blob([response.body]) : undefined;
                resolve(new Response(body, {
                    status: response.status,
                    statusText: response.statusText,
                }));
            }
        });
    });
}