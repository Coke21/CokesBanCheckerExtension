import * as Helper from '../helper'
import { IFindSteamId } from '../interface/findSteamId';
import { IGlobalBan } from '../interface/globalBan';

chrome.runtime.onMessage.addListener(async (message: Helper.onMessageReceived) => {
    chrome.storage.sync.get(null, (items) => {
        let jwtTokenInput: string = items.jwtTokenInput;
        let steamProfileElements: boolean = items.steamProfileElements;

        if (steamProfileElements) {
            if (Helper.isValidHref(`https://steamcommunity.com/`)) {
                addProfileElements(jwtTokenInput);
            }
        }
    });
});

async function addProfileElements(jwtTokenInput: string) {
    try {
        //very bad fix
        let rightColWithBackground = document.querySelector("body > div.responsive_page_frame.with_header > div.responsive_page_content > div.responsive_page_template_content > div.no_header.profile_page.has_profile_background.full_width_background > div.profile_content.has_profile_background > div > div.profile_rightcol") as HTMLElement;
        let rightCOlWithoutBackground = document.querySelector("body > div.responsive_page_frame.with_header > div.responsive_page_content > div.responsive_page_template_content > div.no_header.profile_page > div.profile_content > div > div.profile_rightcol") as HTMLElement;
        let rightColException = document.querySelector("body > div.responsive_page_frame.with_header > div.responsive_page_content > div.responsive_page_template_content > div.profile_golden_wrapper > div > div.profile_content.has_profile_background > div > div.profile_rightcol") as HTMLElement;

        if (rightColWithBackground == null && rightCOlWithoutBackground == null && rightColException == null) {
            Helper.logError("Cannot find the profile's right column! Contact Coke and provide the Steam profile.");
            return;
        }

        let myDiv = document.createElement('div') as HTMLDivElement;
        myDiv.style.display = "flex";
        myDiv.style.flexDirection = "column";
        myDiv.style.alignItems = "center";
        myDiv.style.paddingTop = "8px";
        myDiv.style.paddingBottom = "8px";
        myDiv.style.borderStyle = "dashed";

        let a = document.createElement("a");
        a.href = "javascript:void(0);";
        a.title = "Copy SteamId";

        let paragraph = document.createElement('p') as HTMLParagraphElement;
        paragraph.innerHTML = "Loading...";
        paragraph.style.marginTop = "0px";
        paragraph.style.marginBottom = "0px";
        paragraph.style.fontWeight = "bold";
        paragraph.style.fontSize = "15px";

        myDiv.appendChild(paragraph);

        if (rightColWithBackground != null) {
            rightColWithBackground.insertBefore(myDiv, rightColWithBackground.children[1]);
        } else if (rightCOlWithoutBackground != null) {
            rightCOlWithoutBackground.insertBefore(myDiv, rightCOlWithoutBackground.children[1]);
        } else if (rightColException != null) {
            rightColException.insertBefore(myDiv, rightColException.children[1]);
        }

        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${jwtTokenInput}`
            }
        };

        let response = await Helper.fetchData(`https://cokesbanchecker.herokuapp.com/api/findSteamId?query=${window.location.href}`, config);
        if (response.status == 200) {
            let itemsJson = await response.json() as IFindSteamId;
            paragraph.innerHTML = itemsJson.results.steamId;

            a.appendChild(paragraph);
            a.addEventListener('mousedown', (e: MouseEvent) => {
                if (e.button == 0 || e.button == 1) {
                    navigator.permissions.query({ name: "clipboard-write" as PermissionName }).then(result => {
                        if (result.state == "granted" || result.state == "prompt") {
                            navigator.clipboard.writeText(itemsJson.results.steamId).then(() => {
                                Helper.logInformation(`The SteamId: ${itemsJson.results.steamId} was copied!`);
                            }, () => {
                                Helper.logError("The SteamId failed to be copied!");
                            });
                        } else {
                            Helper.logError("You have to grant the Clipboard permission to https://steamcommunity.com/ in order to use this feature!");
                        }
                    });
                }
            });

            myDiv.appendChild(a);

            let span = document.createElement("span");
            span.style.fontWeight = "bold";
            span.style.fontSize = "15px";

            let gbResponse = await Helper.fetchData(`https://cokesbanchecker.herokuapp.com/api/checkGlobal?steamids=${itemsJson.results.steamId}`, config);
            if (gbResponse.status == 200) {
                let gbItemsJson = await gbResponse.json() as IGlobalBan;

                if (gbItemsJson.results[0].exceptionThrown) {
                    myDiv.style.borderColor = "orange";
                    span.style.color = "orange";
                    span.innerHTML = `Error`;
                } else {
                    if (gbItemsJson.results[0].isBanned) {
                        myDiv.style.borderColor = "#d32f2f";
                        span.style.color = "#d32f2f";
                        span.innerHTML = `${gbItemsJson.results[0].banId}`;
                    } else {
                        myDiv.style.borderColor = "rgb(95 222 95)";
                        span.style.color = "rgb(95 222 95)";
                        span.innerHTML = `Clean`;
                    }
                }
            } else {
                span.innerHTML = `API Error (check console)`;
                Helper.logError(`The API returned error - (checkGlobal endpoint - status ${gbResponse.status}), object:`);
                console.error(gbResponse);
            }

            myDiv.appendChild(span);

            let bmDiv = document.createElement('div') as HTMLDivElement;
            bmDiv.style.display = "flex";
            bmDiv.style.alignItems = "center";

            let bmParagraph = document.createElement('p') as HTMLParagraphElement;
            bmParagraph.style.marginTop = "0px";
            bmParagraph.style.marginBottom = "0px";
            bmParagraph.style.fontWeight = "bold";
            bmParagraph.style.fontSize = "15px";
            bmParagraph.innerHTML = "BM:";

            let aLink = document.createElement("a");
            aLink.style.marginLeft = "5px";
            aLink.style.marginRight = "5px";
            aLink.style.fontSize = "15px";
            aLink.href = `https://www.battlemetrics.com/rcon/players?filter[search]="${itemsJson.results.steamId}"&filter[servers]=false&showServers=true`;
            aLink.target = `_blank`;
            aLink.innerHTML = `Rcon`;

            let bmSplitterParagraph = document.createElement('p') as HTMLParagraphElement;
            bmSplitterParagraph.style.marginTop = "0px";
            bmSplitterParagraph.style.marginBottom = "0px";
            bmSplitterParagraph.style.fontWeight = "bold";
            bmSplitterParagraph.style.fontSize = "15px";
            bmSplitterParagraph.innerHTML = "|";

            let bLink = document.createElement("a");
            bLink.style.marginLeft = "5px";
            bLink.style.fontSize = "15px";
            bLink.href = `https://www.battlemetrics.com/players?filter[search]="${itemsJson.results.steamId}"`;
            bLink.target = `_blank`;
            bLink.innerHTML = `Public`;

            bmDiv.appendChild(bmParagraph);
            bmDiv.appendChild(aLink);
            bmDiv.appendChild(bmSplitterParagraph);
            bmDiv.appendChild(bLink);

            myDiv.appendChild(bmDiv);
        } else {
            paragraph.innerHTML = `API Error (check console)`;
            myDiv.appendChild(paragraph);

            Helper.logError(`The API returned error - (findSteamId endpoint - status ${response.status}), object:`);
            console.error(response);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            Helper.logError(error.message);
        }
    }
}