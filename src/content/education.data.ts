import { type EducationEntry } from './content.types';

export const MASTERS_DEGREE: EducationEntry = {
  degree: 'MSc Computer Science (Distinction)',
  institution: 'Queen Mary University of London',
  startYear: 2022,
  endYear: 2023,
};

export const BACHELORS_DEGREE: EducationEntry = {
  degree: 'B.Tech Computer Science',
  institution: 'Anna University',
  startYear: 2016,
  endYear: 2020,
};

export const EDUCATION: EducationEntry[] = [MASTERS_DEGREE, BACHELORS_DEGREE];
