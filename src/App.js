import React from 'react'
import './App.css'
import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component'
// import { createClient } from 'pexel'

// const httpGet = (theUrl) => {
//   let xmlHttpReq = new XMLHttpRequest();
//   xmlHttpReq.open("GET", theUrl, false); 
//   xmlHttpReq.send(null);
//   return xmlHttpReq.responseText;
// }

// const client = createClient('563492ad6f91700001000001278c6ab6fb3f44f39ff96f5f7aaa879b');
// const query = 'Nature';

// client.photos.search({ query, per_page: 1 }).then(photos => photos.map(photo => 
//   console.log(photo)
// ));
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      monsters: [],
      searchField: ''
    }


  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters:users}))
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render () {
    const { monsters, searchField } = this.state
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      )
    return (
      <div className="App">
      <h1> Philosophight </h1>
        <SearchBox
          placeholder='search monsters' 
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
