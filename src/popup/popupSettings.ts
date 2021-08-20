import axios from "axios";
import { SyntheticEvent } from "react";
import * as Helper from "../helper"

export function changelogClick() {
    window.open("https://cokesbanchecker.herokuapp.com/otherApps", "_blank");
}

export function tokenClick() {
    window.open("https://cokesbanchecker.herokuapp.com/api/token", "_blank");
}

export function jwtTokenInputChange(parameter, event: SyntheticEvent) {
    let element = event.currentTarget as HTMLInputElement;

    chrome.storage.sync.set({
        jwtTokenInput: element.value
    });
}

export function addSteamProfileElements(parameter, event: SyntheticEvent) {
    let element = event.currentTarget as HTMLInputElement;

    chrome.storage.sync.set({
        steamProfileElements: element.checked
    });
}

export function addBmElements(parameter, event: SyntheticEvent) {
    let element = event.currentTarget as HTMLInputElement;

    chrome.storage.sync.set({
        battleMetricsElements: element.checked
    });
}

export function globalBanCheckInputChange(parameter, event: SyntheticEvent) {
    let element = event.currentTarget as HTMLInputElement;
    element.value = element.value.replace(/[^\d,]+/g, '');

    chrome.storage.sync.set({
        globalBanCheckInput: element.value
    });
}

export async function checkClick(parameter, array: [SyntheticEvent]) {
    let jwtTokenElement = parameter[0] as HTMLInputElement;
    let globalBanElement = parameter[1] as HTMLInputElement;
    let checkElement = parameter[2] as HTMLInputElement;
    let outputElement = parameter[3] as HTMLInputElement;

    try {
        if (!globalBanElement.value) {
            return;
        }

        let steamIdSplit = globalBanElement.value.split(',');
        for (let item of steamIdSplit) {
            if (!item || item.length != 17 || !item.startsWith("7656")) {
                globalBanElement.value = `${item} is invalid!`;
                return;
            }
        }

        if (steamIdSplit.length > 10) {
            outputElement.value = `You cannot query more than 10 SteamIds!`;
            return;
        }

        checkElement.disabled = true;

        let options = {
            url: `https://cokesbanchecker.herokuapp.com/api/checkGlobal?steamids=${steamIdSplit}`,
            timeout: 60000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${jwtTokenElement.value}`
            }
        };

        let response = await axios(options);

        if (response.status == 200) {
            outputElement.value = '';
            for (let item of response.data.results) {
                if (item.exceptionThrown) {
                    outputElement.value += `${item.steamId} - Error\n`;
                } else {
                    if (item.isBanned) {
                        outputElement.value += `${item.steamId} - ${item.banId}\n`;
                    } else {
                        outputElement.value += `${item.steamId} - Clean\n`;
                    }
                }
            }
        } else {
            outputElement.value = "Error while connecting to the API! Check if your JWT token is correct.";
            Helper.logError(`The API returned error, object:`);
            console.error(response.data);
        }

        checkElement.disabled = false;
    } catch (error: unknown) {
        if (error instanceof Error) {
            Helper.logError(error.message);
            checkElement.disabled = false;
        }
    }
}