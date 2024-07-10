import { useEffect, useState } from "react";
import arrowIcon from "../assets/icons/icon-arrow.svg";

const Calculate = () => {
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [daysAge, setDaysAge] = useState<number | null>(null);
  const [monthsAge, setMonthsAge] = useState<number | null>(null);
  const [yearsAge, setYearsAge] = useState<number | null>(null);

  useEffect(() => {
    console.log({ day, month, year });
  }, [day, month, year]);

  const calculateAge = (day: number, month: number, year: number) => {
    const dayError = document.getElementById("day");
    const monthError = document.getElementById("month");
    const yearError = document.getElementById("year");

    const currentYear = new Date().getFullYear();
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    dayError?.classList.add("hide");
    monthError?.classList.add("hide");
    yearError?.classList.add("hide");

    if (
      (day > 31 && month > 12 && year > currentYear) ||
      (day < 0 && month < 0 && year > currentYear)
    ) {
      dayError?.classList.remove("hide");
      monthError?.classList.remove("hide");
      yearError?.classList.remove("hide");
      console.log("error");
      return;
    }
    if (day > 31 || day < 1) {
      dayError?.classList.remove("hide");
      console.log("Invalid day");
      return;
    }
    if (month > 12 || month < 1) {
      monthError?.classList.remove("hide");
      console.log("Invalid month");
      return;
    }
    if (year > currentYear || year < 1900) {
      yearError?.classList.remove("hide");
      console.log("Invalid year");
      return;
    }

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setDaysAge(days);
    setMonthsAge(months);
    setYearsAge(years);
  };

  return (
    <div className="calculate">
      <div className="inputs">
        <div className="inputs__input">
          <p className="inputs__input__label">DAY</p>
          <input
            className="inputs__input__field"
            type="number"
            placeholder="DD"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setDay(value ? value : null);
              console.log(day);
            }}
          />
          <p id="day" className="inputs__input__error hide">
            <i>Must be a valid day</i>
          </p>
        </div>
        <div className="inputs__input">
          <p className="inputs__input__label">MONTH</p>
          <input
            className="inputs__input__field"
            type="number"
            placeholder="MM"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setMonth(value ? value : null);
              console.log(month);
            }}
          />
          <p id="month" className="inputs__input__error hide">
            <i>Must be a valid month</i>
          </p>
        </div>
        <div className="inputs__input">
          <p className="inputs__input__label">YEAR</p>
          <input
            className="inputs__input__field"
            type="number"
            placeholder="YYYY"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setYear(value ? value : null);
              console.log(year);
            }}
          />
          <p id="year" className="inputs__input__error hide">
            <i>Must be in the past</i>
          </p>
        </div>
      </div>
      <div className="actions">
        <hr className="actions__hr" />
        <div
          className="actions__circle"
          onClick={() => {
            if (day !== null && month !== null && year !== null) {
              calculateAge(day, month, year);
            } else {
              alert("Please fill in all fields.");
            }
          }}
        >
          <img
            src={arrowIcon}
            alt="Arrow submit icon"
            className="calculate__circle__img"
          />
        </div>
      </div>
      <div className="results">
        <div className="results__result">
          <p className="results__result__value">{yearsAge ? yearsAge : "--"}</p>
          <h2 className="results__result__title">
            <i>years</i>
          </h2>
        </div>
        <div className="results__result">
          <p className="results__result__value">
            {monthsAge ? monthsAge : "--"}
          </p>
          <h2 className="results__result__title">
            <i>months</i>
          </h2>
        </div>
        <div className="results__result">
          <p className="results__result__value">{daysAge ? daysAge : "--"}</p>
          <h2 className="results__result__title">
            <i>days</i>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
