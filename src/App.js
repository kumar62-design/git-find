import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Navber'
import Useritem from './component/Useritem'
import User from './component/User'
// import Users from './component/Users'
import Search from './component/Search'
import Alert from './component/Alert'
import About from './pages/About'
import axios from 'axios'
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }
  //   async componentDidMount() {
  //     console.log(process.env.REACT_APPGITHUB_CLIENT_SECRET);
  //     this.setState({loading:true})
  //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APPGITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APPGITHUB_CLIENT_SECRET}`)


  //     // console.log(res.data)
  //     this.setState({users: res.data, loading:false})
  //  }

  //  search Github users 
  searchUsers = async text => {
    //  console.log(text)
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APPGITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APPGITHUB_CLIENT_SECRET}`)


    this.setState({ users: res.data.items, loading: false })
  }

  //  Delete button 
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  // Get single Github user 
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APPGITHUB_CLIENT_ID}&client_secret=${
      process.env.REACT_APPGITHUB_CLIENT_SECRET}`);


    this.setState({ user: res.data, loading: false })
  }

  // set Alert 
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })

    setTimeout(() => this.setState({
      alert: null
    }), 5000)
  }
  render() {
    const { users, user, loading } = this.state
    return (
      <Router>
        <div>
          <div className="App">
            <Navbar title="Github Finder" />
            <div className="container">
              <Alert alert={this.state.alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert} />
                    <Useritem loading={loading} users={users} />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact
                  path='/user/:login'
                  render={props => (
                    <User {...props}
                      getUser={this.getUser}
                      user={user}
                      loading={loading} />
                  )} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
