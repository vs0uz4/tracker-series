import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

const statuses = {
  watched: 'Assistido',
  watching: 'Assistindo',
  toWatch: 'Assistir'
}

class Serie extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }

    this.deleteSerie = this.deleteSerie.bind(this)
  }

  deleteSerie(id) {
    api.deleteSerie(id).then(res => {
      this.setState({
        isLoading: true
      })
      this.props.loadSeriesMethod()
    })
    this.setState({
      isLoading: false
    })
  }

  render() {
    return (
      <div className="item  col-xs-4 col-lg-4">
        <h4>
          {this.props.serie.status === 'toWatch' && <i className="fas fa-eye-slash" />}
          {this.props.serie.status === 'watched' && <i className="fas fa-eye fa-fw" />}
          {this.props.serie.status === 'watching' && <i className="fas fa-eye fa-fw text-muted" />}
          {statuses[this.props.serie.status]}
        </h4>
        <div className="thumbnail">
          <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
          <div className="caption">
            <h4 className="group inner list-group-item-heading">{this.props.serie.name}</h4>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <p className="lead">{this.props.serie.genre}</p>
              </div>
              <div className="col-xs-12 col-md-6 text-right">
                <Link className="btn btn-default" to={`/edit-serie/${this.props.serie.id}`}>
                  <i className="fas fa-edit fa-fw" />
                </Link>
                &nbsp;
                {/*eslint-disable-next-line*/}
                <a className="btn btn-danger" onClick={() => this.deleteSerie(this.props.serie.id)}>
                  <i className="fas fa-minus-square fa-fw" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Serie
