import { test, expect } from "vitest";
import type {
  Movie,
  TVShow,
  TVSeason,
  TVEpisode,
  Book,
  Game,
  Music,
  Podcast,
  PodcastEpisode,
  YouTubeVideo,
  Weblink,
  Role,
  Author,
} from "./mediaTypes";

test("Movie interface", () => {
  const movie: Movie = {
    id: "1",
    title: "Inception",
    type: "movie",
    director: "Christopher Nolan",
    cinematographer: "Wally Pfister",
    roles: [
      { actorName: "Leonardo DiCaprio", characterName: "Cobb" },
      { actorName: "Ellen Page", characterName: "Ariadne" },
    ],
    releaseYear: 2010,
    duration: 148,
    summary:
      "A thief who enters the dreams of others to steal secrets from their subconscious.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(movie.type).toBe("movie");
  expect(movie.director).toBe("Christopher Nolan");
  expect(movie.cinematographer).toBe("Wally Pfister");
  expect(movie.roles?.length).toBeGreaterThanOrEqual(2);
  expect(movie.roles?.[0]?.actorName).toBe("Leonardo DiCaprio");
  expect(movie.roles?.[0]?.characterName).toBe("Cobb");
  expect(movie.summary).toBeTruthy();
});

test("TVShow interface", () => {
  const tvShow: TVShow = {
    id: "2",
    title: "Breaking Bad",
    type: "tvshow",
    creator: "Vince Gilligan",
    roles: [
      { actorName: "Bryan Cranston", characterName: "Walter White" },
      { actorName: "Aaron Paul", characterName: "Jesse Pinkman" },
    ],
    startYear: 2008,
    endYear: 2013,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            title: "Pilot",
            episodeNumber: 1,
            airDate: new Date("2008-01-20"),
            duration: 58,
            summary:
              "Walter White, a chemistry teacher, discovers that he has cancer and decides to get into the meth-making business to repay his medical debts.",
          },
        ],
      },
    ],
    summary:
      "A high school chemistry teacher turned methamphetamine producer partners with a former student.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(tvShow.type).toBe("tvshow");
  expect(tvShow.creator).toBe("Vince Gilligan");
  expect(tvShow.roles).toHaveLength(2);
  expect(tvShow.roles?.[0]?.actorName).toBe("Bryan Cranston");
  expect(tvShow.roles?.[0]?.characterName).toBe("Walter White");
  expect(tvShow.seasons?.length).toBe(1);
  expect(tvShow.seasons?.[0]?.episodes?.length).toBe(1);
  expect(tvShow.summary).toBeTruthy();
});

test("Book interface", () => {
  const book: Book = {
    id: "3",
    title: "To Kill a Mockingbird",
    type: "book",
    author: {
      name: "Harper Lee",
      birthYear: 1926,
      deathYear: 2016,
    },
    publicationYear: 1960,
    isbn: "9780061120084",
    summary:
      "The story of racial injustice and the loss of innocence in the American South during the Great Depression.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(book.type).toBe("book");
  expect(book.author.name).toBe("Harper Lee");
  expect(book.author.birthYear).toBe(1926);
  expect(book.publicationYear).toBe(1960);
  expect(book.summary).toBeTruthy();
});

test("Game interface", () => {
  const game: Game = {
    id: "4",
    title: "The Last of Us",
    type: "game",
    developer: "Naughty Dog",
    releaseYear: 2013,
    platform: ["PS3", "PS4"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(game.type).toBe("game");
  expect(game.developer).toBe("Naughty Dog");
  expect(game.releaseYear).toBe(2013);
  expect(game.platform).toEqual(["PS3", "PS4"]);
});

test("Music interface", () => {
  const music: Music = {
    id: "5",
    title: "OK Computer",
    type: "music",
    artist: "Radiohead",
    album: "OK Computer",
    releaseYear: 1997,
    genre: ["Alternative", "Rock"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(music.type).toBe("music");
  expect(music.artist).toBe("Radiohead");
  expect(music.album).toBe("OK Computer");
  expect(music.releaseYear).toBe(1997);
  expect(music.genre).toEqual(["Alternative", "Rock"]);
});

test("Podcast interface", () => {
  const podcast: Podcast = {
    id: "6",
    title: "The Joe Rogan Experience",
    type: "podcast",
    host: "Joe Rogan",
    episodes: [
      {
        title: "Episode 1",
        episodeNumber: 1,
        releaseDate: new Date("2009-12-24"),
        duration: 120,
        summary:
          "Joe Rogan and Brian Redban discuss the beginnings of the podcast.",
      },
    ],
    category: ["Comedy", "Interview"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(podcast.type).toBe("podcast");
  expect(podcast.host).toBe("Joe Rogan");
  expect(podcast.episodes).toHaveLength(1);
  expect(podcast.episodes?.[0]?.summary).toBeTruthy();
});

test("YouTubeVideo interface", () => {
  const youtubeVideo: YouTubeVideo = {
    id: "7",
    title: "The Dark Knight Trailer",
    type: "youtubevideo",
    channelName: "Warner Bros. Pictures",
    uploadDate: new Date("2008-07-18T00:00:00.000Z"),
    duration: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(youtubeVideo.type).toBe("youtubevideo");
  expect(youtubeVideo.channelName).toBe("Warner Bros. Pictures");
  expect(youtubeVideo.uploadDate).toEqual(new Date("2008-07-18T00:00:00.000Z"));
  expect(youtubeVideo.duration).toBe(150);
});

test("Weblink interface", () => {
  const weblink: Weblink = {
    id: "8",
    title: "Google",
    type: "weblink",
    url: "https://www.google.com",
    siteName: "Google",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(weblink.type).toBe("weblink");
  expect(weblink.url).toBe("https://www.google.com");
  expect(weblink.siteName).toBe("Google");
});

test("Author type", () => {
  const author: Author = {
    name: "George Orwell",
    birthYear: 1903,
    deathYear: 1950,
  };

  expect(author.name).toBe("George Orwell");
  expect(author.birthYear).toBe(1903);
  expect(author.deathYear).toBe(1950);
});

test("Book interface with Author", () => {
  const book: Book = {
    id: "3",
    title: "1984",
    type: "book",
    author: {
      name: "George Orwell",
      birthYear: 1903,
      deathYear: 1950,
    },
    publicationYear: 1949,
    isbn: "9780451524935",
    summary: "A dystopian novel set in a totalitarian society.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(book.type).toBe("book");
  expect(book.author.name).toBe("George Orwell");
  expect(book.author.birthYear).toBe(1903);
  expect(book.publicationYear).toBe(1949);
  expect(book.summary).toBeTruthy();
});

test("Role type", () => {
  const role: Role = {
    actorName: "Tom Hanks",
    characterName: "Forrest Gump",
  };

  expect(role.actorName).toBe("Tom Hanks");
  expect(role.characterName).toBe("Forrest Gump");
});
