export type InstagramImage = {
  id?: string
  images?:{
      thumbnail:{
          width: number
          height: number
          url: string
      }
  }
  link:string
}

export type Category = {
    id:string
    uid:string
    name:string
}

export type ContentGroup = {
    name:string
    categories:Category[]
}