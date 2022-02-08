import React from 'react'
import './App.css'
import { CardList } from './components/card-list/card-list.component'
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
      monsters: []
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters:users}))
  }


  render () {
    return (
      <div className="App">
        <CardList monsters={this.state.monsters} />
      </div>
    );
  }
}

export default App;
