import "./App.css";
import { useState } from "react";
import VisaLogo from "./assets/visa.svg";
import MaestroLogo from "./assets/maestro.svg";
import MastercardLogo from "./assets/mc.svg";
import UATPLogo from "./assets/uatp.svg";
import AmexLogo from "./assets/amex.svg";
import DinersLogo from "./assets/diners.svg";
import NoCardLogo from "./assets/nocard.svg";

function App() {
  const [cardType, setCardType] = useState({
    provider: "",
    svgSource: NoCardLogo,
  });

  const [number, setNumber] = useState();

  const preventInvalidCharacters = (input) => {
    const pattern = /[^0-9]/g;
    const lastChar = input.charAt(input.length - 1);

    if (pattern.test(lastChar)) {
      return input.replace(/.$/, "");
    } else {
      return input;
    }
  };

  const cardNumberChange = (number) => {
    let adjustNumber = preventInvalidCharacters(number);
    let lastChar;
    if (adjustNumber.length === 5 && adjustNumber.charAt(4) !== " ") {
      lastChar = adjustNumber.charAt(adjustNumber.length - 1);
      adjustNumber = adjustNumber.replace(/.$/, "");
      adjustNumber += " " + lastChar;
    } else if (adjustNumber.length === 10 && adjustNumber.charAt(9) !== " ") {
      lastChar = adjustNumber.charAt(adjustNumber.length - 1);
      adjustNumber = adjustNumber.replace(/.$/, "");
      adjustNumber += " " + lastChar;
    } else if (adjustNumber.length === 15 && adjustNumber.charAt(14) !== " ") {
      lastChar = adjustNumber.charAt(adjustNumber.length - 1);
      adjustNumber = adjustNumber.replace(/.$/, "");
      adjustNumber += " " + lastChar;
    } else if (adjustNumber.length === 5 && adjustNumber.charAt(4) === " ") {
      adjustNumber = adjustNumber.replace(/.$/, "");
    } else if (adjustNumber.length === 10 && adjustNumber.charAt(9) === " ") {
      adjustNumber = adjustNumber.replace(/.$/, "");
    } else if (adjustNumber.length === 15 && adjustNumber.charAt(14) === " ") {
      adjustNumber = adjustNumber.replace(/.$/, "");
    }

    setNumber(adjustNumber);

    const firstTwoCharacters = number.slice(0, 2);

    if (number.charAt(0) === "4") {
      setCardType({ provider: "Visa", svgSource: VisaLogo });
    } else if (number.charAt(0) === "1") {
      setCardType({
        provider: "Universal Air Travel Plan",
        svgSource: UATPLogo,
      });
    } else if (
      number.charAt(0) === "6" ||
      firstTwoCharacters === "50" ||
      firstTwoCharacters === "56" ||
      firstTwoCharacters === "57" ||
      firstTwoCharacters === "58"
    ) {
      setCardType({ provider: "Maestro", svgSource: MaestroLogo });
    } else if (firstTwoCharacters === "34" || firstTwoCharacters === "37") {
      setCardType({
        provider: "American Express",
        svgSource: AmexLogo,
      });
    } else if (
      firstTwoCharacters === "30" ||
      firstTwoCharacters === "36" ||
      firstTwoCharacters === "38"
    ) {
      setCardType({
        provider: "Diners Club",
        svgSource: DinersLogo,
      });
    } else if (
      firstTwoCharacters === "51" ||
      firstTwoCharacters === "52" ||
      firstTwoCharacters === "53" ||
      firstTwoCharacters === "54" ||
      firstTwoCharacters === "55"
    ) {
      setCardType({
        provider: "Mastercard",
        svgSource: MastercardLogo,
      });
    } else {
      setCardType({ provider: "", svgSource: NoCardLogo });
    }
  };

  return (
    <div className="App">
      <div className="checker-container">
        <label className="checker-card__label">
          Card number
          <div className="checker-card-input">
            <input
              className="checker-card-input__input"
              onChange={(event) => cardNumberChange(event.target.value)}
              placeholder="1234 5678 9012 3456"
              value={number}
            />
            <div className="checker-card-input-icon">
              <img
                className="checker-card-input-icon__img"
                alt={cardType.provider}
                src={cardType.svgSource}
                height="24"
              />
            </div>
          </div>
        </label>
      </div>
      <div className="prefix-container">
        <p>Universal Air Travel Plan: 1</p>
        <p>Carte Blanche: 30, 36 or 38</p>
        <p>American Express: 34 or 37</p>
        <p>Visa: 4</p>
        <p>Mastercard: 51, 52, 53, 54 or 55</p>
        <p>Maestro: 6, 50, 56, 57 or 58</p>
      </div>
    </div>
  );
}

export default App;
