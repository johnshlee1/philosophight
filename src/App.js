import React, { useState, useEffect } from "react";

import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "./firebase/firebase";

import { addCollectionAndDocuments } from "./api/api-utils.component";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import { UploadSection } from "./components/upload-section/upload-section.component";

import "./App.css";

const App = () => {
  const [philosophers, setPhilosophers] = useState([]);
  const [addedPhilosopher, setAddedPhilosopher] = useState(null);

  const [searchField, setSearchField] = useState("");
  const [currentId, setCurrentId] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weapon, setWeapon] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFirstNameInput = (e) => {
    if (e.target.value) {
      setFirstName(e.target.value);
    }
  };
  const handleLastNameInput = (e) => {
    if (e.target.value) {
      setLastName(e.target.value);
    }
  };

  const handleWeaponInput = (e) => {
    if (e.target.value) {
      setWeapon(e.target.value);
    }
  };

  const handleStrengthInput = (e) => {
    if (e.target.value) {
      setStrength(e.target.value);
    }
  };

  const handleWeaknessInput = (e) => {
    if (e.target.value) {
      setWeakness(e.target.value);
    }
  };

  const handleUpload = () => {
    const metadata = {
      contentType: "image/jpeg",
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
            `${collectionToAdd.id + " " + collectionToAdd.name}`
          );
        });
        document.getElementById("file").value = null;
      }
    );
  };

  const getPhilosophers = async () => {
    const philosophersDoc = await getDocs(
      collection(firestore, "philosophers")
    );

    const ids = [];
    philosophersDoc.forEach((doc) => {
      //store the values of all philosophers
      philosophers.push(doc.data());

      //store the values of all ids
      ids.push(doc.data().id);
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
    console.log(philosophers);

    //store the value of the Current id
    const lastId = ids.reduce((prev, cur) => {
      return prev > cur ? prev : cur;
    }, 0);
    setCurrentId(lastId);
    console.log("id logged from within getPhilosophers()", currentId);

    return;
  };

  useEffect(() => {
    console.log("run getPhilosophers()");
    getPhilosophers();
  }, []);

  useEffect(() => {
    console.log("run getAddedPhilosopher()");
    const getAddedPhilosopher = async (philosopherId) => {
      const philosopherRef = doc(firestore, "philosophers", `${philosopherId}`);
      const philosopherSnap = await getDoc(philosopherRef);

      if (philosopherSnap.exists()) {
        setPhilosophers([...philosophers, philosopherSnap.data()]);
        console.log("Document data:", philosopherSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      return;
    };
    getAddedPhilosopher(addedPhilosopher);
  }, [addedPhilosopher]);

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPhilosophers = philosophers.filter((philosopher) =>
    philosopher.name.toLowerCase().includes(searchField.toLowerCase())
  );
  console.log("on re-render ", currentId);

  return (
    <div className="App">
      <h1> Philosophight </h1>

      <UploadSection
        handleFileChange={handleFileChange}
        handleFirstNameInput={handleFirstNameInput}
        handleLastNameInput={handleLastNameInput}
        handleWeaponInput={handleWeaponInput}
        handleStrengthInput={handleStrengthInput}
        handleWeaknessInput={handleWeaknessInput}
        handleUpload={handleUpload}
      />

      <SearchBox
        placeholder="search philosophers"
        handleSearch={handleSearch}
      />

      <CardList philosophers={filteredPhilosophers} />
    </div>
  );
};

export default App;
