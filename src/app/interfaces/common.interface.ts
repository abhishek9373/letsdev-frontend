export interface fileRequest {
   requirement: Array<requireMent>,
   module: string,
}

interface requireMent {
  order: 0,
  extension: string
}

export interface fileResponse {
  data: Array<fileRequirement>
}

interface fileRequirement{
  id: string,
  url: string,
  key: string,
  order: number,
  extension: string
}