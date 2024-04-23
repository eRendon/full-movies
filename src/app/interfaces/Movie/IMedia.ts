export interface IMedia {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string
  vote_average: number
  vote_count: number
  width: number
}

export interface IMediaResponse {
  backdrops: IMedia[]
  id: number
  logos: IMedia[]
  posters: IMedia[]
}
