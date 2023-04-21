import React, { useEffect, useState } from "react";
import {
  useClubs,
  useAssociations,
  useSendExpressionOfInterestForm,
} from "../../Hooks/useExpressionOfInterest";
import { motion, AnimatePresence } from "framer-motion";

export const ExpressionOfInterestForm = ({setHasSent}) => {
  const [clubs, fetchClubs] = useClubs();
  const [associations, fetchAssociations] = useAssociations();
  const [expression, createExpression] = useSendExpressionOfInterestForm();
  const [registerAs, setRegisterAs] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(""); // Add this line
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    registerAs: "",
    clubOrAssociation: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleRegisterAsChange = (event) => {
    const { value } = event.target;
    setRegisterAs(value);
    setFormData({ ...formData, registerAs: value, clubOrAssociation: "" });
  };

  const handleInputClubOrAssociationChange = (event) => {
    const inputValue = event.target.value;
    handleFormDataChange(event);

    if (inputValue.length >= 3) {
      setShowAutocomplete(true);
      if (registerAs === "club") {
        fetchClubs(inputValue);
      } else if (registerAs === "association") {
        fetchAssociations(inputValue);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleAutocompleteClick = (name) => {
    setFormData({ ...formData, clubOrAssociation: name });
    setShowAutocomplete(false);
  };

  const isFormValid = () => {
    const { fullName, email, registerAs, clubOrAssociation, consent } =
      formData;
    return fullName && email && registerAs && clubOrAssociation && consent;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setSubmitting(true);
      try {
        await createExpression(formData);
        setSubmitted(true);
        setHasSent(true)
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  const renderAutocompleteOptions = () => {
    const options =
      registerAs === "club"
        ? Array.isArray(clubs)
          ? clubs
          : []
        : Array.isArray(associations)
        ? associations
        : [];
    console.log(options);
    return options.map((option) => (
      <li
        key={option.id}
        className="list-group-item"
        onClick={() => handleAutocompleteClick(option.attributes.Name)}
      >
        {option.attributes.Name}
      </li>
    ));
  };
  const renderConfirmationMessage = () => {
    if (submissionStatus === "success") {
      return (
        <div className="alert alert-success" role="alert">
          Your form has been submitted successfully!
        </div>
      );
    } else if (submissionStatus === "error") {
      return (
        <div className="alert alert-danger" role="alert">
          An error occurred while submitting the form. Please try again.
        </div>
      );
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <AnimatePresence>
      {!submitted && (
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        >
          {submitting ? (
            <div className="text-center">
              <h3>Sending...</h3>
              {/* Add a loading animation of your choice here */}
            </div>
          ) : (
            <Form_ExpressionofInterest
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              handleCheckboxChange={handleCheckboxChange}
              handleRegisterAsChange={handleRegisterAsChange}
              handleInputClubOrAssociationChange={
                handleInputClubOrAssociationChange
              }
              showAutocomplete={showAutocomplete}
              registerAs={registerAs}
              renderAutocompleteOptions={renderAutocompleteOptions}
              handleSubmit={handleSubmit}
              loading={loading}
              isFormValid={isFormValid}
              renderConfirmationMessage={renderConfirmationMessage}
              clubs={clubs}
              associations={associations}
            />
          )}
        </motion.div>
      )}
      {submitted && (
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center"
        >
          <h3>Form submitted successfully!</h3>
          <p>
            Thank you for expressing your interest in early access to Fixtura.
            We appreciate your support and can't wait to have you on board. We
            will be in touch soon with more information on how to access the
            platform before the official launch. Places are limited, so don't
            miss out on this opportunity to elevate your club's online presence
            with Fixtura.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Form_ExpressionofInterest = ({
  formData,
  handleFormDataChange,
  handleCheckboxChange,
  handleRegisterAsChange,
  handleInputClubOrAssociationChange,
  showAutocomplete,
  registerAs,
  renderAutocompleteOptions,
  handleSubmit,
  loading,
  isFormValid,
  renderConfirmationMessage,
  clubs,
  associations,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {renderConfirmationMessage()}
      <div className="mb-3">
        <label htmlFor="inputName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          name="fullName"
          value={formData.fullName}
          onChange={handleFormDataChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          name="email"
          value={formData.email}
          onChange={handleFormDataChange}
          aria-describedby="emailHelp"
          required
        />

        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="registerAs" className="form-label">
          I am registering as a
        </label>
        <select
          className="form-select"
          id="registerAs"
          value={registerAs}
          onChange={handleRegisterAsChange}
          required
        >
          <option value="">Select</option>
          <option value="club">Club</option>
          <option value="association">Association</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputClubOrAssociation" className="form-label">
          Name of Club or Association
        </label>
        <input
          type="text"
          className="form-control"
          id="inputClubOrAssociation"
          name="clubOrAssociation"
          value={formData.clubOrAssociation}
          minLength="3"
          onChange={handleInputClubOrAssociationChange}
          disabled={!registerAs}
          required
        />
        {(clubs || associations) && showAutocomplete && (
          <ul className="list-group">{renderAutocompleteOptions()}</ul>
        )}
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="consentCheck"
          name="consent"
          checked={formData.consent}
          onChange={handleCheckboxChange}
          required
        />

        <label className="form-check-label" htmlFor="consentCheck">
          I agree to the terms and conditions.
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isFormValid() || loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};
