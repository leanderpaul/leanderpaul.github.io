export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface YearMonth {
  year: number;
  month: Month;
}

export type Present = 'present';

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  email: string;
  links: ProfileLinks;
}

export interface ProfileLinks {
  linkedin: string;
  github: string;
  githubOrganization: string;
  website: string;
}

export interface SiteMeta {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  ogType: 'website';
  ogImage: OgImage;
  twitterCard: 'summary_large_image';
}

export interface OgImage {
  url: string;
  width: number;
  height: number;
}

export interface ProfileFact {
  label: string;
  value: string;
  detail?: string;
}

export interface ContactSection {
  heading: string;
  text: string;
}

export type TokenClaims = Record<string, string | string[]>;

export interface ProfileToken {
  header: TokenClaims;
  payload: TokenClaims;
}

export type EmploymentType = 'full-time' | 'contract' | 'freelance';

export interface Role {
  company: string;
  companyUrl?: string;
  client?: string;
  clientUrl?: string;
  title: string;
  employment: EmploymentType;
  location: string;
  start: YearMonth;
  end: YearMonth | Present;
  summary?: string;
  siteBullets: string[];
  resumeBullets: string[];
  technologies: string[];
  resumeTechnologies?: string[];
}

export type Ownership = 'employer' | 'personal';

export type ProjectStatus = 'live' | 'archived' | 'dev-only';

export type LinkType = 'github' | 'npm' | 'demo' | 'docs' | 'employer';

export interface ProjectLink {
  type: LinkType;
  label: string;
  url: string;
}

export type FeaturedSlug = 'identity' | 'ai-platform' | 'code-atlas';

export interface KeyDecision {
  decision: string;
  rejected?: string;
  why: string;
}

export type DiagramKind = 'platform-services';

export interface CaseStudyDiagram {
  kind: DiagramKind;
  text: string;
  caption: string;
  source: ProjectLink;
}

export interface CaseStudyArchitecture {
  text: string[];
  diagram?: CaseStudyDiagram;
}

export interface CaseStudy {
  runtime: string;
  context: string[];
  role: string[];
  architecture: CaseStudyArchitecture;
  decisions: KeyDecision[];
  failureModes: string[];
  results: string[];
  resultsSource?: ProjectLink;
  validityThreats?: string[];
  changes: string[];
}

export interface FeaturedProject {
  slug: FeaturedSlug;
  title: string;
  ownership: Ownership;
  status: ProjectStatus;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  caseStudy: CaseStudy;
  resumeBullets?: string[];
}

export type ArchiveCategory = 'employer' | 'personal' | 'open-source';

export interface ArchiveRow {
  year: number;
  title: string;
  category: ArchiveCategory;
  status: ProjectStatus;
  company?: string;
  tech: string[];
  links: ProjectLink[];
}

export type ArchiveFilter = 'all' | ArchiveCategory | 'archived';

export interface ArchiveFilterOption {
  value: ArchiveFilter;
  label: string;
}

export interface OpenSourcePackage {
  name: string;
  purpose: string;
  links: ProjectLink[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
}

export interface ResumeProject {
  name: string;
  descriptor: string;
  url: string;
  urlText: string;
  startYear: number;
  endYear: number | Present;
  bullets: string[];
}

export type ContactLinkKind = 'email' | 'linkedin' | 'github' | 'website';

export interface ContactLink {
  kind: ContactLinkKind;
  href: string;
  text: string;
}

export interface IndexedRouteMeta {
  robots: 'index';
  path: string;
  title: string;
  description: string;
}

export interface NoIndexRouteMeta {
  robots: 'noindex';
  path: string;
  title: string;
}

export type RouteMeta = IndexedRouteMeta | NoIndexRouteMeta;
