import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [fvalue, setValue] = useState("");
  const [fclick, setClick] = useState(false);
  const [cData, setData] = useState({});
  const [curr, setCurr] = useState([]);
  useEffect(() => {
    if (fclick) {
      async function fetchData() {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${fvalue}`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "3757ece4d9msh3ebacece6864e2ap1b3b7djsna20808ecd1a5",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          const data1 = result.data;
          console.log(result);
          console.log(data1.capital);
          console.log(data1.currencyNotes);
          setData(data1);
          setCurr(data1.currencyNotes);
        } catch (error) {
          console.error(error);
        } finally {
          setClick(false);
        }
      }
      setValue(" ");
      fetchData();
    }
  }, [fvalue, fclick]);
  return (
    <div className="App">
      <input
        type="text"
        placeholder="enetr the country id"
        onChange={(event) => setValue(event.target.value)}
        value={fvalue}
      />
      <button
        onClick={() => {
          setClick((prev) => {
            return !prev;
          });
        }}
      >
        Search
      </button>
      {cData.name && <h2> The name of the country is {cData.name}</h2>}
      {cData.capital && <h2> The capital of the country is {cData.capital}</h2>}
      {cData.callingCode && (
        <h2> The dialling code of the country is {cData.callingCode}</h2>
      )}
      {cData.code && <h2>The code of the country is {cData.code}</h2>}
      <ul>
        {Array.isArray(curr) &&
          curr.map((currency, index) => <li key={index}>{currency}</li>)}
      </ul>{" "}
      {cData.flagImageUri && (
        <div>
          {" "}
          <h2>The flag of the country is</h2>
          <img src={cData.flagImageUri} alt="flag" />
        </div>
      )}
    </div>
  );
}
