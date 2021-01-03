import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Books from './containers/Books';
import CreateBook from './containers/CreateBook';
import Nav from './components/Nav';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      pathname: '',
    };    

    this.notifyPathname = this.notifyPathname.bind(this);
  }

  notifyPathname(pathname) {
    this.setState({
      pathname: pathname,
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav
            notifyPathname={this.notifyPathname}
            pathname={this.state.pathname}/>
          <Switch>
            <Route path="/" exact component={() => <Books/>}/>
            <Route path="/create" exact component={() => <CreateBook/>}/>
            <Route 
              path="/edit/:id" 
              exact 
              book={this.state.book}
              component={(props) => <CreateBook {...props}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
