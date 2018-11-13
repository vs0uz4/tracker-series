import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const loadGenres = () => api.get('genres')
export const saveSerie = newSerie => api.post('series', newSerie)
export const loadSeriesByGenre = genre => api.get(`series?genre=${genre}`)
export const deleteSerie = id => api.delete(`series/${id}`)

const apis = {
  loadGenres: loadGenres,
  loadSeriesByGenre: loadSeriesByGenre,
  saveSerie: saveSerie,
  deleteSerie: deleteSerie
}

export default apis
