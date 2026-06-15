import type { Question } from "@/types";

export const QUESTIONS: Question[] = [
  {
    key: "name",
    label: "What's your name?",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    key: "age",
    label: "How old are you?",
    placeholder: "e.g. 28",
    type: "text",
  },
  {
    key: "occupation",
    label: "What do you do?",
    placeholder: "Your occupation or role",
    type: "text",
  },
  {
    key: "biggestAchievement",
    label: "What's your biggest achievement?",
    placeholder: "Something you're proud of",
    type: "textarea",
  },
  {
    key: "biggestChallenge",
    label: "What's your biggest challenge?",
    placeholder: "A struggle you've faced or are facing",
    type: "textarea",
  },
  {
    key: "currentGoal",
    label: "What's your current goal?",
    placeholder: "What are you working toward?",
    type: "textarea",
  },
  {
    key: "dreamDestination",
    label: "What's your dream destination?",
    placeholder: "A place you dream of visiting or living",
    type: "text",
  },
  {
    key: "hobbies",
    label: "What are your three hobbies?",
    placeholder: "e.g. Reading, hiking, cooking",
    type: "text",
  },
  {
    key: "lifeChangingEvent",
    label: "Describe a life-changing event",
    placeholder: "A moment that changed everything",
    type: "textarea",
  },
  {
    key: "selfDescription",
    label: "Describe yourself in one sentence",
    placeholder: "Who are you, in one line?",
    type: "textarea",
  },
];

export interface DemoPoster {
  title: string;
  tagline: string;
  genre: string;
  rating: string;
  year: string;
  seasons: string;
  image: string;
}

export const DEMO_POSTERS: DemoPoster[] = [
  {
    title: "The Reluctant Genius",
    tagline: "Some minds change the world. His almost didn't.",
    genre: "Drama · Thriller",
    rating: "8.7",
    year: "2024",
    seasons: "2 Seasons",
    image: "/demo-posters/reluctant-genius.jpg",
  },
  {
    title: "Beyond Expectations",
    tagline: "The journey that rewrites who you thought you were.",
    genre: "Coming-of-Age · Drama",
    rating: "9.1",
    year: "2023",
    seasons: "1 Season",
    image: "/demo-posters/beyond-expectations.jpg",
  },
  {
    title: "The Dream Chaser",
    tagline: "One idea. One city. Everything on the line.",
    genre: "Adventure · Entrepreneurship",
    rating: "8.4",
    year: "2025",
    seasons: "3 Seasons",
    image: "/demo-posters/dream-chaser.jpg",
  },
];
