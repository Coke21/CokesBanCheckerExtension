import * as Helper from '../helper'
import { IGlobalBan } from '../interface/globalBan';

chrome.runtime.onMessage.addListener(async (message: Helper.onMessageReceived) => {
    chrome.storage.sync.get(null, (items) => {
        let jwtTokenInput: string = items.jwtTokenInput;
        let battleMetricsElements: boolean = items.battleMetricsElements;

        if (battleMetricsElements) {
            if (Helper.isValidHref(`https://www.battlemetrics.com/rcon/players/`) && Helper.IsNumberHrefEnd()) {
                addProfileElements(jwtTokenInput);
            }
        }
    });
});

async function addProfileElements(jwtTokenInput: string) {
    let identifiersSelector = "#RCONPlayerPage > div > div:nth-child(1) > div:nth-child(1) > div > div > table > tbody";
    let element = await Helper.waitForElement(identifiersSelector);
    if (element != null) {
        let header = document.querySelector("#RCONPlayerPage > h1") as HTMLElement;
        if (header.classList.contains('cokesBanCheckerExtension-root')) {
            return;
        }

        if (document.querySelector("#RCONPlayerPage > button") != null) {
            return;
        }

        header.classList.add('cokesBanCheckerExtension-root');

        let steamId: string | undefined = undefined;
        let identifiers = document.querySelector(identifiersSelector) as HTMLTableElement;
        for (let child of identifiers.children) {
            if (child.children[0].textContent?.length == 17 && child.children[0].textContent.match(/^\d+$/)) {
                steamId = child.children[0].textContent;
                break;
            }
        }

        let nickname = header.innerHTML.trimEnd();
        if (nickname.endsWith('-')) {
            nickname = `${header.innerHTML} `;
        } else {
            nickname = `${header.innerHTML} - `;
        }

        if (steamId == undefined) {
            header.innerHTML = `${nickname}SteamId not found`;
        } else {
            try {
                header.innerHTML = `${nickname}Loading...`;

                let config = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${jwtTokenInput}`
                    }
                };

                let response = await Helper.fetchData(`https://cokesbanchecker.herokuapp.com/api/checkGlobal?steamids=${steamId}`, config);
                if (response.status == 200) {
                    header.innerHTML = nickname;

                    let itemsJson = await response.json() as IGlobalBan;
                    let span = document.createElement("span");
                    if (itemsJson.results[0].exceptionThrown) {
                        span.style.color = "orange";
                        span.innerHTML = `Error`;
                    } else {
                        if (itemsJson.results[0].isBanned) {
                            span.style.color = "red";
                            span.innerHTML = `${itemsJson.results[0].banId}`;
                        } else {
                            span.style.color = "green";
                            span.innerHTML = `Clean`;
                        }
                    }

                    header.appendChild(span);
                } else {
                    header.innerHTML = `${nickname}API Error (check console)`;
                    Helper.logError(`The API returned error (status ${response.status}), object:`);
                    console.error(response);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    Helper.logError(error.message);
                }
            }
        }
    }
}