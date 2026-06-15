export interface UserAnswers {
  name: string;
  age: string;
  occupation: string;
  biggestAchievement: string;
  biggestChallenge: string;
  currentGoal: string;
  dreamDestination: string;
  hobbies: string;
  lifeChangingEvent: string;
  selfDescription: string;
}

export interface Episode {
  number: number;
  title: string;
  summary: string;
}

export interface FutureSeason {
  name: string;
  description: string;
}

export interface Review {
  stars: number;
  text: string;
}

export interface CharacterArc {
  beginning: string;
  conflict: string;
  transformation: string;
  resolution: string;
}

export interface CharacterProfile {
  strengths: string;
  weaknesses: string;
  personality: string;
  motivations: string;
  characterGrowth: string;
}

export interface SeriesData {
  title: string;
  tagline: string;
  genres: string[];
  imdbRating: number;
  audienceScore: number;
  ageRating: string;
  synopsis: string;
  characterProfile: CharacterProfile;
  currentSeason: {
    name: string;
    summary: string;
  };
  episodes: Episode[];
  characterArc: CharacterArc;
  futureSeasons: FutureSeason[];
  reviews: Review[];
  iconicQuote: string;
  trailerNarration: string;
  posterPrompt: string;
  posterUrl?: string;
}

export interface SeriesRecord {
  id: string;
  created_at: string;
  answers: UserAnswers;
  series: SeriesData;
  poster_url?: string;
}

export type QuestionKey = keyof UserAnswers;

export interface Question {
  key: QuestionKey;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
}
