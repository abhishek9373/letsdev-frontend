export interface Question {
  _id: string,
  title: string,
  code: string,
  output: string,
  description: string,
  user: { _id: string, name: string, stars: number, profileViews: number },
  createdAt: Date,
  preferences: number,
  views: number,
  votes: number,
  answers: number
}

export interface FinalQuestion {
  _id: string,
  title: string,
  code: { code: string, language: string },
  output: string,
  description: string,
  user: { _id: string, name: string, stars: number, profileViews: number },
  createdAt: Date,
  preferences: number,
  views: number,
  votes: number,
  answers: number
}

export interface listQuestion{
  data: Array<Question>
}

export interface questionsResult{
  data: updatedInterfaceForQuestion
}

export interface updatedInterfaceForQuestion{
  question: Array<Question>,
  answers: Array<Answer>
}

export interface Answer{
  _id: string,
  description: string,
  code: string | null,
  createdAt: Date,
  votes: number,
  user:{
    name: string,
    userId: string,
    stars: number,
    profileViews: number
  },
}

export interface singleQuestionResult{
  data: Question
}

export interface CreateAnswerI{
  description: string,
  code?: string
}