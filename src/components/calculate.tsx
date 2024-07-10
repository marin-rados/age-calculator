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
    const dayInputError = document.getElementById("dayInput");
    const monthInputError = document.getElementById("monthInput");
    const yearInputError = document.getElementById("yearInput");
    const dayTitleError = document.getElementById("dayTitle");
    const monthTitleError = document.getElementById("monthTitle");
    const yearTitleError = document.getElementById("yearTitle");

    const currentYear = new Date().getFullYear();
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    dayError?.classList.add("hide");
    monthError?.classList.add("hide");
    yearError?.classList.add("hide");

    dayInputError?.classList.remove("error");
    monthInputError?.classList.remove("error");
    yearInputError?.classList.remove("error");

    dayTitleError?.classList.remove("error-text");
    monthTitleError?.classList.remove("error-text");
    yearTitleError?.classList.remove("error-text");

    if (
      (day > 31 && month > 12 && year > currentYear) ||
      (day < 0 && month < 0 && year > currentYear)
    ) {
      dayError?.classList.remove("hide");
      monthError?.classList.remove("hide");
      yearError?.classList.remove("hide");
      dayInputError?.classList.add("error");
      monthInputError?.classList.add("error");
      yearInputError?.classList.add("error");
      dayTitleError?.classList.add("error-text");
      monthTitleError?.classList.add("error-text");
      yearTitleError?.classList.add("error-text");
      console.log("error");
      return;
    }
    if (day > 31 || day < 1) {
      dayError?.classList.remove("hide");
      dayInputError?.classList.add("error");
      dayTitleError?.classList.add("error-text");
      console.log("Invalid day");
      return;
    }
    if (month > 12 || month < 1) {
      monthError?.classList.remove("hide");
      monthInputError?.classList.add("error");
      monthTitleError?.classList.add("error-text");
      console.log("Invalid month");
      return;
    }
    if (year > currentYear) {
      yearError?.classList.remove("hide");
      yearInputError?.classList.add("error");
      yearTitleError?.classList.add("error-text");
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
          <p id="dayTitle" className="inputs__input__label">
            DAY
          </p>
          <input
            className="inputs__input__field"
            type="number"
            placeholder="DD"
            id="dayInput"
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
          <p id="monthTitle" className="inputs__input__label">
            MONTH
          </p>
          <input
            className="inputs__input__field"
            type="number"
            placeholder="MM"
            id="monthInput"
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
          <p id="yearTitle" className="inputs__input__label">
            YEAR
          </p>
          <input
            className="inputs__input__field"
            type="number"
            placeholder="YYYY"
            id="yearInput"
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
