import React from "react";
import { storage } from "./base";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
      image: null,
      progress: 0,
      downloadURL: null,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState({ monsters: users });
      });
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
      });
    }
  };

  handleUpload = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const file = this.state.image;
    const storageRef = ref(storage, "philosophers-images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress });
        console.log("Upload is " + progress + "% done");
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
          this.setState(
            {
              downloadURL: url,
            },
            () => {
              console.log("this.state.downloadURL =", this.state.downloadURL);
            }
          );
          console.log("File available at", url);
        });
        document.getElementById("file").value = null;
      }
    );
  };

  render() {
    const { monsters, searchField } = this.state;
    const handleSearch = (e) => {
      this.setState({ searchField: e.target.value });
    };

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1> Philosophight </h1>

        <label>
          <span>Upload Image </span>
          <input type="file" id="file" onChange={this.handleChange} />
        </label>

        <label>
          <span>Enter Name </span>
          <input type="text" name="username" placeholder="Name" />
        </label>
        <label>
          <span>Enter Description </span>
          <input type="text" name="username" placeholder="Description" />
        </label>

        {this.state.progress}
        <button className="button" onClick={this.handleUpload}>
          Submit
        </button>

        <img
          className="ref"
          src={this.state.downloadURL || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
        <SearchBox placeholder="search monsters" handleChange={handleSearch} />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

//   return (
//     <div className="App">
//       <h1> Philosophight </h1>
//       <form onSubmit={onSubmit}>
//         <input type="file" onChange={onFileChange} />
//         <input type="text" name="username" placeholder="NAME" />
//         <button>Submit</button>
//       </form>
//       <ul>
//         {users.map((user) => {
//           return (
//             <li>
//               <img
//                 key={user.name}
//                 width="100"
//                 height="100"
//                 src={user.avatar}
//                 alt={user.name}
//               />
//               <p>{user.name}</p>
//             </li>
//           );
//         })}
//       </ul>
//       <SearchBox placeholder="search monsters" handleChange={handleChange} />
//       <CardList monsters={filteredMonsters} />
//     </div>
//   );
// };

export default App;

// const onSubmit = (e) => {
//   e.preventDefault();
//   const files = e.target.files;
//   const file = e.target.files[0];
//   const philosophersImagesFileRef = ref(storage, "philosophers-images");
//   const fileRef = ref(storage, `philosophers-images/${files[0].name}`);

//   const username = e.target.username.value;
//   if (!username) {
//     return;
//   }
//   uploadBytes(fileRef, files).then((snapshot) => {
//     console.log("Uploaded a blob or file!");
//     console.log(snapshot);
//   });
// storage.collection("users").doc(username).set({
//   name: username,
//   avatar: fileUrl,
// });
// };

// useEffect(() => {
//   const fetchUsers = async () => {
//     const usersCollection = await storage.collection("users").get();
//     setUsers(
//       usersCollection.docs.map((doc) => {
//         return doc.data();
//       })
//     );
//   };
//   fetchUsers();
// }, []);
