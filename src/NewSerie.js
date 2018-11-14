import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
  toWatch: 'Assistir',
  watching: 'Assistindo',
  watched: 'Assistido'
}

class NewSerie extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      isLoading: false,
      redirect: false
    }

    this.saveSeries = this.saveSeries.bind(this)
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

  saveSeries(event) {
    event.preventDefault()
    const newSerie = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }

    api.saveSerie(newSerie).then(res => {
      this.setState({
        redirect: `/series/${this.refs.genre.value}`
      })
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <section id="new-serie" className="new-section">
          <h1>Nova Série</h1>
          <form onSubmit={this.saveSeries}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input ref="name" id="name" type="text" className="form-control" placeholder="Entre com o Nome da Série" required />
            </div>

            <div className="row">
              <div className="col-xs-6">
                <div className="form-group">
                  <label htmlFor="genre">Gênero</label>
                  <select ref="genre" id="genre" className="form-control" required>
                    {this.state.genres.map(key => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-xs-6">
                <div className="form-group">
                  <label htmlFor="status">Estado</label>
                  <select ref="status" id="status" className="form-control" required>
                    {Object.keys(statuses).map(key => (
                      <option key={key} value={key}>
                        {statuses[key]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Commentário</label>
              <textarea ref="comments" id="comments" rows="6" className="form-control" placeholder="Entre com os Comentários Sobre a Série" />
            </div>
            <button type="submit" className="btn btn-default">
              Salvar
            </button>
          </form>
        </section>
      </div>
    )
  }
}

export default NewSerie
