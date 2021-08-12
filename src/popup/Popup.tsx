import React, { useEffect } from "react";
import "./Popup.scss";
import Test from "./Test";
import * as Settings from "./popupSettings";

export default function Popup() {
  // const line = {
  //   borderBottom: '1.5px solid #ffc107'
  // }

  // useEffect(() => {
  //   // Example of how to send a message to eventPage.ts.
  //   chrome.runtime.sendMessage({ popupMounted: true });
  // }, []);

  return <div className="myMainContainer container">

    <div className="row lineBottom">
      <div className="col d-flex justify-content-center align-items-center">
        <img src="./images/cbc.png" />
        <h1 className="display-4 ms-1">Settings:</h1>

        <button id="changelogButton" type="button" className="btn btn-outline-warning btn-sm ms-2" onClick={Settings.changelogClick} title="See changelog">Changelog</button>
      </div>
    </div>

    <div className="row mt-2">
      <div className="col d-flex align-items-center">
        <p className="lead mb-0">
          Provide JWT Token:
        </p>
        <button id="getTokenButton" type="button" className="btn btn-outline-warning btn-sm ms-2" onClick={Settings.tokenClick} title="Get token">Get Token</button>
      </div>
    </div>

    <div className="row mt-1">
      <div className="col">
        <input id="jwtTokenInput" type="text" className="form-control form-control-sm" onChange={Settings.jwtTokenInputChange}
          placeholder="Insert your JWT Token..." title="Insert your JWT Token to use the below features!" />
      </div>
    </div>

    <div className="row mt-2">
      <div className="col">
        <p className="lead mb-0">
          Features:
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <div className="form-check">
          <input id="steamProfileElements" type="checkbox" className="form-check-input" onChange={Settings.addSteamProfileElements} value="" />
          <label htmlFor="steamProfileElements" className="form-check-label" >
            Add Steam Profile elements
          </label>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <div className="form-check">
          <input id="battleMetricsElements" type="checkbox" className="form-check-input" onChange={Settings.addBmElements} value="" />
          <label htmlFor="battleMetricsElements" className="form-check-label" >
            Add BattleMetrics elements
          </label>
        </div>
      </div>
    </div>

    <div className="row mt-2">
      <div className="col">
        <p className="lead mb-0">
          Check SteamId for BattlEye GB:
        </p>
      </div>
    </div>

    <div className="row mt-1">
      <div className="col">
        <div className="input-group">
          <input id="globalBanCheckInput" type="text" className="form-control form-control-sm" onChange={Settings.globalBanCheckInputChange}
            onKeyUp={Settings.globalBanCheckInputOnKeyUp} placeholder="Insert the SteamId(s)..." title="Insert the SteamId(s) for the BattlEye Global Ban check" />

          <div className="input-group-append">
            <button id="checkGlobalBanButton" type="button" className="btn btn-outline-warning btn-sm ms-1" onClick={Settings.checkClick}
              title="Check the inserted SteamId(s) for BattlEye Global Ban status">
              Check
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="row mt-1">
      <div className="col">
        <div className="form-group">
          <textarea id="outputBattlEye" className="form-control" rows={3} placeholder="Output..."></textarea>
        </div>
      </div>
    </div>

  </div>
}
