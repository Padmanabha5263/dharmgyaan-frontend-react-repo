

export type QuizLevel = "Easy" | "Medium" | "Hard";

export interface QuizConfig {
  religion: string;
  questionCount: 10 | 15 | 20;
  level: QuizLevel;
  shastra: string;
  character: string;
}