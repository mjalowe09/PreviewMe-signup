//libraries
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//stylsheets
import "../css/signup.css";

const SignupSucess = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="signup-container"
    >
      <h4>Thank you! Your information has been recorded.</h4>
      <Link to="/">
        <button className="signup-btn signup-submit-btn">SIGN UP</button>
      </Link>
    </motion.div>
  );
};

export default SignupSucess;
