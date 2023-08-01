export interface PostInterface{
  data: {
    _id: string,
    tags: Array<string>,
    title: string,
    body: string,
    createdAt: Date,
    user: { _id: string, name: string },
    image: [ { url: string } ],
    preferences: { likes: number, dislikes: number, shares: number },
    interaction: { isliked: boolean, isdisliked: boolean }
  }
}

export interface PostInterfaceFinal{
    _id: string,
    tags: Array<string>,
    title: string,
    body: string,
    createdAt: Date,
    user: { _id: string, name: string },
    image: [ { url: string } ],
    preferences: { likes: number, dislikes: number, shares: number },
    interaction: { isliked: boolean, isdisliked: boolean }
}