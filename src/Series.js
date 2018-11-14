import React, { Component } from 'react'

import api from './Api'
import Serie from './Serie'

class Series extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [],
      isLoading: false
    }

    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({
      isLoading: true
    })

    api.loadSeriesByGenre(this.props.match.params.genre).then(res => {
      this.setState({
        isLoading: false,
        series: res.data
      })
    })
  }

  render() {
    return (
      <div className="container">
        <section id="series" className="intro-section">
          <h1>Séries de {this.props.match.params.genre}</h1>
        </section>
        <div className="row">
          <div className="col-lg-12">
            {this.state.isLoading && <p>Carregando, aguarde um instante...</p>}
            {!this.state.isLoading &&
              this.state.series.length === 0 && (
                <div className="alert alert-info alert-dismissible" role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <i className="fas fa-info-circle fa-fw" />
                  <strong>Aviso!</strong> Nenhuma Série Cadastrada.
                </div>
              )}

            <div id="series" className="row list-group">
              {!this.state.isLoading && this.state.series.map(key => <Serie key={key.id} loadSeriesMethod={this.loadData} serie={key} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Series
