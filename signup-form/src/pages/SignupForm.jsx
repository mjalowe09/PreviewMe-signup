//library
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { motion, useAnimation } from "framer-motion";

//stylesheets
import "../css/signup.css";
//components
import industriesOptions from "../components/industriesOptions";

const SignupForm = () => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectCountry, setSelectCountry] = useState();
  const [accountType, setAccountType] = useState();
  const [businessName, setBusinessName] = useState();
  const [nameError, setNameError] = useState();
  const [accountTypeError, setAccountTypeError] = useState();
  const [countryError, setCountryError] = useState();
  const [emailError, setEmailError] = useState();
  const [businessNameError, setBusinessNameError] = useState();
  const [showBusiness, setShowBusiness] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const countriesOptions = useMemo(() => countryList().getData(), []);

  const navigate = useNavigate();
  const animation = useAnimation();

  useEffect(() => {
    if (accountType === "business") setShowBusiness(true);
    else {
      setShowBusiness(false);
      setBusinessNameError(null);
    }
  }, [accountType]);

  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#FAF8F6",
        primary: "none",
      },
    };
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "#979797",
      boxShadow: "none",
      padding: "0.05rem 0",
      marginBottom: "0.5rem",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
    multiValue: (styles) => ({
      ...styles,
      border: "solid 1px #979797",
      padding: "0.1rem 0",
      fontSize: "0.9rem",
      backgroundColor: "#e2e4e8",
    }),
  };

  const formHandler = (e) => {
    e.preventDefault();
    setIsButtonClicked(true);

    console.log(
      "\nFirst Name:",
      firstname,
      "\nLast Name: ",
      lastname,
      "\nEmail: ",
      email,
      "\nIndustries: ",
      selectedIndustries,
      "\nCountry: ",
      selectCountry,
      "\nAccount Type: ",
      accountType,
      "\nBusiness name: ",
      businessName
    );

    //Checks if user inputs a name, or if the input characters are valid
    const fullname = firstname + lastname;
    if (!firstname || !lastname) {
      setNameError("Please enter both name fields.");
    } else if (!/^[a-zA-Z]+$/.test(fullname)) {
      setNameError("A-Z, a-z characters only.");
    } else {
      setNameError(null);
    }

    //Checks if the  user inputs an email, or if the email is valid
    if (!email) {
      setEmailError("Please enter an email.");
    } else if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError(null);
    }

    //Checks if the user selects a country
    if (!selectCountry) {
      setCountryError("Please select a country.");
    } else {
      setCountryError(null);
    }

    //Checks if user chose an account type
    if (!accountType) {
      setAccountTypeError("Please choose an account type.");
    } else {
      setAccountTypeError(null);
    }

    //checks if the user enters a business name
    if (accountType === "business") {
      if (!businessName) {
        setBusinessNameError("Please enter a business name.");
      } else {
        setBusinessNameError(null);
      }
    }
  };

  useEffect(() => {
    if (
      isButtonClicked &&
      nameError === null &&
      emailError === null &&
      countryError === null &&
      accountTypeError === null &&
      businessNameError === null
    ) {
      navigate("/signup-success");
    }
  }, [
    isButtonClicked,
    nameError,
    emailError,
    countryError,
    accountTypeError,
    businessNameError,
    navigate,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="signup-container"
    >
      <div className="signup-introduction">
        <h4>Welcome to PreviewMe!</h4>
        <p>
          To complete your account set up, please confirm some final details so
          we can tailor your experience to you.
        </p>
      </div>
      <form className="form-container">
        <div className="label-error">
          <label className="label">YOUR NAME*</label>
          <div className="error">{nameError}</div>
        </div>
        <div className="name-input">
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="label-error">
          <label className="label">YOUR EMAIL*</label>
          <div className="error">{emailError}</div>
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          class="email-input"
          type="text"
          placeholder="Email Address"
        />
        <br />
        <label className="label">WHICH INDUSTRIES ARE YOU INTERESTED IN?</label>
        <br />
        <Select
          id="industries-input"
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={customStyles}
          theme={customTheme}
          options={industriesOptions}
          value={selectedIndustries}
          onChange={(selectedOption) => setSelectedIndustries(selectedOption)}
          placeholder="Select Industries"
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={true}
        />
        <br />
        <div className="label-error">
          <label className="label">COUNTRY*</label>
          <div className="error">{countryError}</div>
        </div>
        <Select
          id="industries-input"
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={customStyles}
          theme={customTheme}
          options={countriesOptions}
          value={selectCountry}
          onChange={(selectedOption) => setSelectCountry(selectedOption)}
          placeholder="Select Country"
          required
        />
        <br />
        <div className="label-error">
          <label className="label">ACCOUNT TYPE*</label>
          <div className="error">{accountTypeError}</div>
        </div>
        <div className="radio-choice-container">
          <input
            name="account-type"
            type="radio"
            value="personal"
            checked={accountType === "personal"}
            onChange={(e) => setAccountType(e.target.value)}
          ></input>
          <div>
            <h4>Personal Account</h4>
            <p>
              The best option if you're an indivdual who'll be showcasing
              themselves/making application via PreviewMe.
            </p>
          </div>
        </div>
        <div>
          <div id="radio-container-margin" className="radio-choice-container">
            <input
              name="account-type"
              type="radio"
              value="business"
              checked={accountType === "business"}
              onChange={(e) => setAccountType(e.target.value)}
            />
            <div>
              <h4>Business Account</h4>
              <p>
                The best option if you're a company that is looking to manage
                applications via PreviewMe.
              </p>
            </div>
          </div>
          <div className={`${showBusiness ? "" : "hide-business"}`}>
            <div className="label-error">
              <label className="label">BUSINESS WORKSPACE NAME*</label>
              <div className="error">{businessNameError}</div>
            </div>
            <input
              onChange={(e) => setBusinessName(e.target.value)}
              value={businessName}
              class="business-input"
              type="text"
              placeholder="Business Name"
            />
          </div>
        </div>

        <button onClick={formHandler} className="signup-submit-btn">
          FINISH
        </button>
      </form>
      <p id="legends">* Required fields</p>
    </motion.div>
  );
};

export default SignupForm;
