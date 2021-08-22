import React, { useState, useEffect, useRef } from 'react';
import './popup.scss';
import * as Settings from './popupSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faEye, faEyeSlash, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { faSteam } from '@fortawesome/free-brands-svg-icons'

export default function Popup() {
  const jwtTokenInputRef = useRef(null);
  const steamProfileElementsRef = useRef(null);
  const battleMetricsElementsRef = useRef(null);
  const globalBanCheckInputRef = useRef(null);
  const checkGlobalBanButtonRef = useRef(null);
  const outputBattlEyeRef = useRef(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);

    chrome.storage.sync.set({
      showJwtToken: !passwordShown
    });
  };

  useEffect(() => {
    let jwtTokenInput = jwtTokenInputRef.current as HTMLInputElement;
    let steamProfileElements = steamProfileElementsRef.current as HTMLInputElement;
    let battleMetricsElements = battleMetricsElementsRef.current as HTMLInputElement;
    let globalBanCheckInput = globalBanCheckInputRef.current as HTMLInputElement;

    chrome.storage.sync.get({
      jwtTokenInput: '',
      showJwtToken: false,
      steamProfileElements: false,
      battleMetricsElements: false,
      globalBanCheckInput: '',
    }, (items) => {
      jwtTokenInput.value = items.jwtTokenInput;
      setPasswordShown(items.showJwtToken);
      steamProfileElements.checked = items.steamProfileElements;
      battleMetricsElements.checked = items.battleMetricsElements;
      globalBanCheckInput.value = items.globalBanCheckInput;
    });
  });

  return <div className="myMainContainer container">

    <div className="row lineBottom">
      <div className="col d-flex justify-content-center align-items-center">
        <img src="./images/cbc.png" />
        <h1 className="display-4 ms-1">Settings:</h1>

        <button type="button" className="btn btn-outline-warning btn-sm ms-2" onClick={Settings.changelogClick} title="See changelog">Changelog</button>
      </div>
    </div>

    <div className="row mt-2">
      <div className="col d-flex align-items-center">
        <p className="lead mb-0">
          <FontAwesomeIcon icon={faCode} /> Provide Token:
        </p>
        <button type="button" className="btn btn-outline-warning btn-sm ms-2" onClick={Settings.tokenClick} title="Get token">Get Token</button>
      </div>
    </div>

    <div className="row mt-1">
      <div id="show_hide_password" className="col d-flex align-items-center">
        <input ref={jwtTokenInputRef} type={passwordShown ? "text" : "password"} className="form-control form-control-sm"
          onChange={Settings.jwtTokenInputChange.bind(null, jwtTokenInputRef.current as HTMLInputElement)}
          placeholder="Insert your JWT Token..." title="Insert your JWT Token to use the below features!" />

        <div className="input-group-append ms-1">
          <a href="" onClick={(e) => { e.preventDefault(); }}>
            <i onClick={togglePasswordVisiblity} aria-hidden="true" title="Toggle JWT token visibility">
              <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} style={{ width: "25px" }} />
            </i>
          </a>
        </div>
      </div>
    </div>

    <div className="row mt-2">
      <div className="col">
        <p className="lead mb-0">
          <FontAwesomeIcon icon={faLightbulb} /> Features:
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <div className="form-check">
          <input ref={steamProfileElementsRef} id="steamProfileElements" type="checkbox" className="form-check-input" onChange={Settings.addSteamProfileElements.bind(null, steamProfileElementsRef.current as HTMLInputElement)} value="" />
          <label htmlFor="steamProfileElements" className="form-check-label" >
            Add Steam Profile elements
          </label>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <div className="form-check">
          <input ref={battleMetricsElementsRef} id="battleMetricsElements" type="checkbox" className="form-check-input" onChange={Settings.addBmElements.bind(null, battleMetricsElementsRef.current as HTMLInputElement)} value="" />
          <label htmlFor="battleMetricsElements" className="form-check-label" >
            Add BattleMetrics elements
          </label>
        </div>
      </div>
    </div>

    <div className="row mt-2">
      <div className="col">
        <p className="lead mb-0">
          <FontAwesomeIcon icon={faSteam} /> Check SteamId for BattlEye GB:
        </p>
      </div>
    </div>

    <div className="row mt-1">
      <div className="col">
        <div className="input-group">
          <input ref={globalBanCheckInputRef} type="text" className="form-control form-control-sm" onChange={Settings.globalBanCheckInputChange.bind(null, globalBanCheckInputRef.current as HTMLInputElement)}
            placeholder="Insert the SteamId(s)..." title="Insert the SteamId(s) for the BattlEye Global Ban check" />

          <div className="input-group-append">
            <button ref={checkGlobalBanButtonRef} type="button" className="btn btn-outline-warning btn-sm ms-1"
              onClick={Settings.checkClick.bind(null, [jwtTokenInputRef.current as HTMLInputElement, globalBanCheckInputRef.current as HTMLInputElement, checkGlobalBanButtonRef.current as HTMLInputElement, outputBattlEyeRef.current as HTMLInputElement])}
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
          <textarea ref={outputBattlEyeRef} style={{ fontSize: "0.8em" }} className="form-control" rows={3} placeholder="Output..."></textarea>
        </div>
      </div>
    </div>

  </div>
}
