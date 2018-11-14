import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
  toWatch: 'Assistir',
  watching: 'Assistindo',
  watched: 'Assistido'
}

class EditSerie extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      serie: [],
      isLoading: false,
      redirect: false
    }

    this.updateSerie = this.updateSerie.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    api.loadGenres().then(res => {
      this.setState({
        genres: res.data
      })
    })

    api.loadSerieById(this.props.match.params.id).then(res => {
      this.setState({
        serie: res.data
      })
      this.refs.name.value = this.state.serie.name
      this.refs.status.value = this.state.serie.status
      this.refs.genre.value = this.state.serie.genre
      this.refs.comments.value = this.state.serie.comments
    })

    this.setState({ isLoading: false })
  }

  updateSerie(event) {
    event.preventDefault()
    const updatedSerie = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    }

    api.updateSerie(updatedSerie).then(res => {
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
          <h1>Editar Série</h1>
          <form onSubmit={this.updateSerie}>
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
              Atualizar
            </button>
          </form>
        </section>
      </div>
    )
  }
}

export default EditSerie
