// Common MediaItem interface
export interface MediaItem {
  id: string;
  title: string;
  type:
    | "movie"
    | "tvshow"
    | "book"
    | "game"
    | "music"
    | "podcast"
    | "youtubevideo"
    | "weblink";
  createdAt: Date;
  updatedAt: Date;
}

// Role type for movies and TV shows
export interface Role {
  actorName: string;
  characterName: string;
}

// Author type for books and potentially other media
export interface Author {
  name: string;
  birthYear?: number;
  deathYear?: number;
}

// Specific media type interfaces
export interface Movie extends MediaItem {
  type: "movie";
  director: string;
  cinematographer: string;
  roles: Role[];
  releaseYear: number;
  duration: number; // in minutes
  summary: string;
}

export interface TVEpisode {
  title: string;
  episodeNumber: number;
  airDate: Date;
  duration: number; // in minutes
  summary: string;
}

export interface TVSeason {
  seasonNumber: number;
  episodes: TVEpisode[];
}

export interface TVShow extends MediaItem {
  type: "tvshow";
  creator: string;
  roles: Role[];
  startYear: number;
  endYear?: number;
  seasons: TVSeason[];
  summary: string;
}

export interface Book extends MediaItem {
  type: "book";
  author: Author;
  publicationYear: number;
  isbn: string;
  summary: string;
}

export interface Game extends MediaItem {
  type: "game";
  developer: string;
  releaseYear: number;
  platform: string[];
}

export interface Music extends MediaItem {
  type: "music";
  artist: string;
  album?: string;
  releaseYear: number;
  genre: string[];
}

export interface PodcastEpisode {
  title: string;
  episodeNumber: number;
  releaseDate: Date;
  duration: number; // in minutes
  summary: string;
}

export interface Podcast extends MediaItem {
  type: "podcast";
  host: string;
  episodes: PodcastEpisode[];
  category: string[];
}

export interface YouTubeVideo extends MediaItem {
  type: "youtubevideo";
  channelName: string;
  uploadDate: Date;
  duration: number; // in seconds
}

export interface Weblink extends MediaItem {
  type: "weblink";
  url: string;
  siteName: string;
}
