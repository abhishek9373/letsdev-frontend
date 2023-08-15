export interface Question {
  _id: string,
  title: string,
  code: string,
  output: string,
  description: string,
  user: { _id: string, name: string },
  createdAt: Date
}

export interface FinalQuestion {
  _id: string,
  title: string,
  code: { code: string, language: string },
  output: string,
  description: string,
  user: { _id: string, name: string },
  createdAt: Date
}

export interface questionsResult{
  data: Array<Question>
}

export interface singleQuestionResult{
  data: Question
}

export interface CreateAnswerI{
  description: string,
  code: string
}