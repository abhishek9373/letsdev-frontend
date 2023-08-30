export interface ReceiverInfo{
  name: string,
  gender: string,
  _id: string,
  branch: string,
  isVerified: string
}

export interface outGoingChat{
  sid: string,
  rid: string,
  text: string
}

export interface Chat{
  sid: string,
  rid: string,
  text: string,
  created_at: string,
  updated_at: string,
  id: number
}