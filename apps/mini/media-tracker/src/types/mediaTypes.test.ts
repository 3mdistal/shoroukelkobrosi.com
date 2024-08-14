import { test, expect } from "vitest";
import type {
  MediaItem,
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

// MediaItem tests
test("MediaItem interface", () => {
  const mediaItem: MediaItem = {
    id: "1",
    title: "Test Item",
    type: "movie",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
  };

  expect(mediaItem.id).toBe("1");
  expect(mediaItem.title).toBe("Test Item");
  expect(mediaItem.type).toBe("movie");
  expect(mediaItem.createdAt).toEqual(new Date("2023-01-01"));
  expect(mediaItem.updatedAt).toEqual(new Date("2023-01-02"));
});

// Movie tests
test("Movie interface with minimum required fields", () => {
  const movie: Movie = {
    id: "1",
    title: "Minimal Movie",
    type: "movie",
    director: "John Doe",
    cinematographer: "Jane Smith",
    roles: [],
    releaseYear: 2023,
    duration: 90,
    summary: "A test movie",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(movie.type).toBe("movie");
  expect(movie.roles).toHaveLength(0);
  expect(movie.duration).toBe(90);
});

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

// TVShow tests
test("TVShow interface with multiple seasons", () => {
  const tvShow: TVShow = {
    id: "2",
    title: "Multi-Season Show",
    type: "tvshow",
    creator: "Show Creator",
    roles: [{ actorName: "Main Actor", characterName: "Main Character" }],
    startYear: 2020,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            title: "S01E01",
            episodeNumber: 1,
            airDate: new Date(),
            duration: 45,
            summary: "First episode",
          },
          {
            title: "S01E02",
            episodeNumber: 2,
            airDate: new Date(),
            duration: 45,
            summary: "Second episode",
          },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          {
            title: "S02E01",
            episodeNumber: 1,
            airDate: new Date(),
            duration: 45,
            summary: "Season 2 start",
          },
        ],
      },
    ],
    summary: "A show with multiple seasons",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(tvShow.seasons).toHaveLength(2);
  expect(tvShow.seasons[0]?.episodes).toHaveLength(2);
  expect(tvShow.seasons[1]?.episodes).toHaveLength(1);
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

// Book tests
test("Book interface with optional author fields", () => {
  const book: Book = {
    id: "3",
    title: "Anonymous Book",
    type: "book",
    author: { name: "Anonymous" },
    publicationYear: 2023,
    isbn: "1234567890",
    summary: "A book by an unknown author",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(book.author.name).toBe("Anonymous");
  expect(book.author.birthYear).toBeUndefined();
  expect(book.author.deathYear).toBeUndefined();
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

// Game tests
test("Game interface with multiple platforms", () => {
  const game: Game = {
    id: "4",
    title: "Cross-Platform Game",
    type: "game",
    developer: "Game Studio",
    releaseYear: 2023,
    platform: ["PC", "PlayStation 5", "Xbox Series X", "Nintendo Switch"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(game.platform).toHaveLength(4);
  expect(game.platform).toContain("PC");
  expect(game.platform).toContain("Nintendo Switch");
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

// Music tests
test("Music interface without album", () => {
  const music: Music = {
    id: "5",
    title: "Single Track",
    type: "music",
    artist: "Solo Artist",
    releaseYear: 2023,
    genre: ["Pop"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(music.album).toBeUndefined();
  expect(music.genre).toHaveLength(1);
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

// Podcast tests
test("Podcast interface with multiple episodes and categories", () => {
  const podcast: Podcast = {
    id: "6",
    title: "Tech Talk",
    type: "podcast",
    host: "Tech Guru",
    episodes: [
      {
        title: "Episode 1",
        episodeNumber: 1,
        releaseDate: new Date(),
        duration: 30,
        summary: "Intro to tech",
      },
      {
        title: "Episode 2",
        episodeNumber: 2,
        releaseDate: new Date(),
        duration: 45,
        summary: "Advanced tech",
      },
    ],
    category: ["Technology", "Education", "News"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(podcast.episodes).toHaveLength(2);
  expect(podcast.category).toHaveLength(3);
  expect(podcast.category).toContain("Technology");
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

// YouTubeVideo tests
test("YouTubeVideo interface with long duration", () => {
  const youtubeVideo: YouTubeVideo = {
    id: "7",
    title: "Long Documentary",
    type: "youtubevideo",
    channelName: "Documentary Channel",
    uploadDate: new Date(),
    duration: 7200, // 2 hours in seconds
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(youtubeVideo.duration).toBe(7200);
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

// Weblink tests
test("Weblink interface with long URL", () => {
  const weblink: Weblink = {
    id: "8",
    title: "Complex Web Page",
    type: "weblink",
    url: "https://example.com/very/long/path/with/multiple/segments/and/query/parameters?param1=value1&param2=value2",
    siteName: "Example Site",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  expect(weblink.url.length).toBeGreaterThan(50);
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

// Role tests
test("Role type with long names", () => {
  const role: Role = {
    actorName:
      "Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus Wolfe­schlegel­stein­hausen­berger­dorff­welche­vor­altern­waren­gewissen­haft­schafers­wessen­schafe­waren­wohl­gepflege­und­sorg­faltig­keit­be­schutzen­vor­an­greifen­durch­ihr­raub­gierig­feinde­welche­vor­altern­zwolf­hundert­tausend­jah­res­voran­die­er­scheinen­von­der­erste­erde­mensch­der­raum­schiff­genacht­mit­tung­stein­und­sieben­iridium­elek­trisch­motors­ge­brauch­licht­als­sein­ur­sprung­von­kraft­ge­start­sein­lange­fahrt­hin­zwischen­stern­artig­raum­auf­der­suchen­nach­bar­schaft­der­stern­welche­ge­habt­be­wohn­bar­planeten­kreise­drehen­sich­und­wo­hin­der­neue­rasse­von­ver­stand­ig­mensch­lich­keit­konnte­fort­pflanzen­und­sicher­freuen­an­lebens­lang­lich­freude­und­ru­he­mit­nicht­ein­furcht­vor­an­greifen­vor­anderer­intelligent­ge­schopfs­von­hin­zwischen­stern­art­ig­raum Sr.",
    characterName:
      "John Doe the Third, Esquire, Lord of the Manor, Defender of the Realm, Protector of the Weak, Champion of Justice, and Keeper of the Sacred Flame",
  };

  expect(role.actorName.length).toBeGreaterThan(100);
  expect(role.characterName.length).toBeGreaterThan(50);
});

test("Role type", () => {
  const role: Role = {
    actorName: "Tom Hanks",
    characterName: "Forrest Gump",
  };

  expect(role.actorName).toBe("Tom Hanks");
  expect(role.characterName).toBe("Forrest Gump");
});

// Author tests
test("Author type with partial information", () => {
  const author: Author = {
    name: "J.K. Rowling",
    birthYear: 1965,
  };

  expect(author.name).toBe("J.K. Rowling");
  expect(author.birthYear).toBe(1965);
  expect(author.deathYear).toBeUndefined();
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
