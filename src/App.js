import React, { useState, useEffect } from "react";

import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "./firebase/firebase";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import { UploadSection } from "./components/upload-section/upload-section.component";

import "./App.css";

const App = () => {
  const [philosophers, setPhilosophers] = useState([]);
  const [addedPhilosopher, setAddedPhilosopher] = useState(null);

  const [searchField, setSearchField] = useState("");
  const [currentId, setCurrentId] = useState(0);

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
    // console.log(philosophers);

    //store the value of the Current id
    const lastId = ids.reduce((prev, cur) => {
      return prev > cur ? prev : cur;
    }, 0);
    setCurrentId(lastId);
    return;
  };

  useEffect(() => {
    getPhilosophers();
  }, []);

  useEffect(() => {
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

  return (
    <div className="App">
      <h1> Philosophight </h1>
      <UploadSection
        currentId={currentId}
        setCurrentId={setCurrentId}
        setAddedPhilosopher={setAddedPhilosopher}
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
