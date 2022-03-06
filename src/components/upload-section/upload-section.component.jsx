import React from "react";

export const UploadSection = (props) => (
  <div>
    <label>
      <span>Upload Image </span>
      <input type="file" id="file" onChange={props.handleFileChange} />
    </label>
    <input
      type="text"
      name="firstname"
      placeholder="Enter First Name"
      onChange={props.handleFirstNameInput}
    />
    <input
      type="text"
      name="username"
      placeholder="Enter Last Name"
      onChange={props.handleLastNameInput}
    />

    <input
      type="text"
      name="primaryweapon"
      placeholder="Enter Primary Weapon"
      onChange={props.handleWeaponInput}
    />

    <input
      type="text"
      name="strength"
      placeholder="Enter Strength"
      onChange={props.handleStrengthInput}
    />

    <input
      type="text"
      name="weakness"
      placeholder="Enter Weakness"
      onChange={props.handleWeaknessInput}
    />

    <button className="button" onClick={props.handleUpload}>
      Submit
    </button>
  </div>
);
