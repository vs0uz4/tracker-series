import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Series from './Series'
import NewSerie from './NewSerie'
import EditSerie from './EditSerie'
import About from './About'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="/">
                  <img src="/images/logo_text.png" height="40" alt="icon" />
                </a>
              </div>

              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/">
                      <i className="fas fa-home fa-fw" />
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link to="/new-serie">
                      <i className="fas fa-plus fa-fw" />
                      Nova Série
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <i className="fas fa-info fa-fw" />
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/series/:genre" component={Series} />
          <Route exact path="/new-serie" component={NewSerie} />
          <Route path="/edit-serie/:id" component={EditSerie} />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App
