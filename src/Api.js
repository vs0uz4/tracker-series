import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const loadGenres = () => api.get('genres')
export const loadSeriesByGenre = genre => api.get(`series?genre=${genre}`)
export const loadSerieById = id => api.get(`series/${id}`)
export const saveSerie = newSerie => api.post('series', newSerie)
export const updateSerie = updatedSerie => api.put(`series/${updatedSerie.id}`, updatedSerie)
export const deleteSerie = id => api.delete(`series/${id}`)

const apis = {
  loadGenres,
  loadSeriesByGenre,
  loadSerieById,
  saveSerie,
  updateSerie,
  deleteSerie
}

export default apis
