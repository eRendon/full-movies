import { IMovie } from '../IMovie'

export interface IMovieDetail extends IMovie {
  adult: false
  belongs_to_collection: null
  budget: number
  genres: IGender[]
  homepage: string
  imdb_id: string
  origin_country: string[]
  production_companies: IProductionCompanies[]
  production_countries: IProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: string
}

export interface IGender {
  id: number
  name: string
}

export interface IProductionCompanies {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface IProductionCountry {
  iso_3166_1: string
  name: string
}

export interface ISpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}
