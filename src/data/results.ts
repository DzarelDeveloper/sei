

export interface ResultField {
  id: string
  name: string
  copy: string
  why: string
  nextStep: string
  activityId: string
  
  matchKeys: string[]
  evidence?: Array<{ question: string; answer: string }>
  pathways?: string[]
}
