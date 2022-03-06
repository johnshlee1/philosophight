import React, { useState } from "react";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase";

import { addCollectionAndDocuments } from "../../api/api-utils.component";

export const UploadSection = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weapon, setWeapon] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const { currentId, setCurrentId, setAddedPhilosopher } = props;

  const [file, setFile] = useState(null);

  const handleUpload = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const setInputValueToDefault = (id) => {
      document.getElementById(id).value = null;
    };
    const storageRef = ref(storage, "philosophers-images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + uploadProgress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log(null);
            return null;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            console.log(null);
            return null;
        }
      },
      () => {
        // Upload completed successfully, now get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const collectionToAdd = {
            id: parseInt(currentId) + 1,
            name: `${firstName + " " + lastName}`,
            weapon: weapon,
            strength: strength,
            weakness: weakness,
            imageUrl: url,
          };
          addCollectionAndDocuments(collectionToAdd);
          setCurrentId(collectionToAdd.id);
          setAddedPhilosopher(
            `${collectionToAdd.name + " " + collectionToAdd.id}`
          );
        });
        setInputValueToDefault("file");
        setInputValueToDefault("firstname");
        setInputValueToDefault("lastname");
        setInputValueToDefault("weapon");
        setInputValueToDefault("strength");
        setInputValueToDefault("weakness");
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.value) {
      if (e.target.getAttribute("name") === "firstname") {
        setFirstName(e.target.value);
      }
      if (e.target.getAttribute("name") === "lastname") {
        setLastName(e.target.value);
      }
      if (e.target.getAttribute("name") === "weapon") {
        setWeapon(e.target.value);
      }
      if (e.target.getAttribute("name") === "strength") {
        setStrength(e.target.value);
      }
      if (e.target.getAttribute("name") === "weakness") {
        setWeakness(e.target.value);
      }
    }

    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <label>
        <span>Upload Image </span>
        <input type="file" id="file" onChange={handleChange} />
      </label>
      <input
        id="firstname"
        type="text"
        name="firstname"
        placeholder="Enter First Name"
        onChange={handleChange}
      />
      <input
        id="lastname"
        type="text"
        name="lastname"
        placeholder="Enter Last Name"
        onChange={handleChange}
      />

      <input
        id="weapon"
        type="text"
        name="weapon"
        placeholder="Enter Primary Weapon"
        onChange={handleChange}
      />

      <input
        id="strength"
        type="text"
        name="strength"
        placeholder="Enter Strength"
        onChange={handleChange}
      />

      <input
        id="weakness"
        type="text"
        name="weakness"
        placeholder="Enter Weakness"
        onChange={handleChange}
      />

      <button className="button" onClick={handleUpload}>
        Submit
      </button>
    </div>
  );
};
