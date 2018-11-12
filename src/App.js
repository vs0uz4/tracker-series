import React, { Component } from 'react'
import api from './Api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.loadGenres().then(res => {
      this.setState({
        isLoading: false,
        genres: res.data
      })
    })
  }

  renderGenreLink(genre) {
    return (
      <span>
        &nbsp;
        <a href="">{genre}</a>
        &nbsp;
      </span>
    )
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header page-scroll">
              <a className="navbar-brand page-scroll" href="#page-top">
                <img src="images/logo_text.png" height="40" alt="icon" />
              </a>
            </div>

            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <a href="">Menu item</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <section id="intro" className="intro-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1>
                    <img src="images/logo_full.png" alt="logo" />
                  </h1>
                  <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="genres">
            {this.state.isLoading && <span>Aguarde, carregando...</span>}
            {!this.state.isLoading && (
              <div>
                Ver Séries do Gênero:
                {this.state.genres.map(this.renderGenreLink)}
              </div>
            )}
          </section>
        </div>
      </div>
    )
  }
}

export default App
