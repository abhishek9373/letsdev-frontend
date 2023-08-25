export interface commentResponse {
  data: Array<comment>
}

export interface comment {
    _id: string,
    text: string,
    preferences : { likes: number, dislikes: number },
    user : { name: string, _id: string },
    createdAt: Date,
    interaction : { isliked: boolean, isdisliked: boolean },
    likes: number,
    dislikes: number
}

export interface questionRequestObject{
  title:string;
  description:string;
  output: string,
  code: string
}

export interface UpdateUser{
  name: string,
  email: string,
  gender: string,
  branch: string,
}