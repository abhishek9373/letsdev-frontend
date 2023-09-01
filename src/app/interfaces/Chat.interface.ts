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
}

export interface Connection{
  connection_id: string,
  last_message: string,
  last_message_date: string,
  notifications: number,
  user:{
    _id: string,
    name: string
  }
}

export interface ConnectionResp{
  data: [
    {
      connection_id: string,
      last_message: string,
      last_message_date: string,
      notifications: number,
      user:{
        _id: string,
        name: string
      }
    }
  ]
}