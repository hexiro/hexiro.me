import { TMDB_V3_TOKEN, TMDB_V4_TOKEN, TMDB_ACCOUNT_ID } from "@/commons/config";

export default async function fetchMovieRatings(): Promise<MovieRating[] | null> {
    const [TMDBGenres, TMDBMovieRatings, TMDBFavoriteMovies] = await Promise.all([
        fetchTMDBGenres(),
        fetchTMDBMovieRatings(),
        fetchTMDBFavoriteMovies(),
    ]);

    if (!TMDBGenres || !TMDBMovieRatings || !TMDBFavoriteMovies) return null;

    const movieRatings: MovieRating[] = [];

    const genreMap = new Map<number, string>();
    for (const genre of TMDBGenres) {
        genreMap.set(genre.id, genre.name);
    }

    const favoriteIds = new Set(TMDBFavoriteMovies.map((favoriteMovie) => favoriteMovie.id));

    for (const TMDBMovieRating of TMDBMovieRatings) {
        const {
            id,
            title,
            genre_ids,
            release_date,
            poster_path: posterPath,
            account_rating: { value: rating },
        } = TMDBMovieRating;

        const releaseYear = new Date(release_date).getFullYear();
        const genres = genre_ids
            .map((genreId) => genreMap.get(genreId))
            .filter(Boolean) as string[];

        const isFavorite = favoriteIds.has(id);

        const movieRating: MovieRating = {
            id,
            title,
            genres,
            rating,
            posterPath,
            releaseYear,
            isFavorite,
        };

        movieRatings.push(movieRating);
    }

    const movieScore = (movieRating: MovieRating): number =>
        movieRating.rating * (movieRating.isFavorite ? 2 : 1);

    movieRatings.sort((a, b) => movieScore(b) - movieScore(a));

    return movieRatings;
}

async function fetchTMDBGenres(): Promise<TMDBGenre[] | null> {
    const params = {
        "api_key": TMDB_V3_TOKEN,
        "language": "en-US",
    };

    const url = new URL("https://api.themoviedb.org/3/genre/movie/list?");
    url.search = new URLSearchParams(params).toString();

    const resp = await fetch(url);
    const json = (await resp.json()) as TMDBGenresResponse | TMDBv3ErrorResponse;

    if (!("genres" in json)) return null;

    return json.genres;
}

async function fetchTMDBMovieRatings(): Promise<TMDBMovieRating[] | null> {
    return fetchTMDBMultiPageRoute<TMDBMovieRating>(`/account/${TMDB_ACCOUNT_ID}/movie/rated`);
}

async function fetchTMDBFavoriteMovies(): Promise<TMDBFavoriteMovie[] | null> {
    return fetchTMDBMultiPageRoute<TMDBFavoriteMovie>(
        `/account/${TMDB_ACCOUNT_ID}/movie/favorites`
    );
}

async function fetchTMDBMultiPageRoute<T>(path: string): Promise<T[] | null> {
    const pageOne = await fetchTMDBMultiPageRoutePage<T>(1, path);
    if (!pageOne) return null;

    const pagePromises: Array<Promise<TMDBMultiPageResponse<T> | null>> = [];

    for (let i = 2; i <= pageOne.total_pages; i++) {
        const promise = fetchTMDBMultiPageRoutePage<T>(i, path);
        pagePromises.push(promise);
    }

    const values: T[] = [];
    const pages = [pageOne, ...(await Promise.all(pagePromises))];

    for (const page of pages) {
        if (!page) return null;
        values.push(...page.results);
    }

    return values;
}

async function fetchTMDBMultiPageRoutePage<T>(
    page: number,
    path: string
): Promise<TMDBMultiPageResponse<T> | null> {
    const params = {
        page: String(page),
        sort_by: "created_at.desc",
    };

    const headers = {
        Authorization: `Bearer ${TMDB_V4_TOKEN}`,
    };

    const url = new URL(`https://api.themoviedb.org/4${path}`);
    url.search = new URLSearchParams(params).toString();

    const resp = await fetch(url, { headers });
    const json = (await resp.json()) as TMDBMultiPageResponse<T> | TMDBv4ErrorResponse;

    if (!("results" in json)) return null;

    return json;
}

export interface MovieRating {
    id: number;
    title: string;
    genres: string[];
    rating: number;
    posterPath: string;
    releaseYear: number;
    isFavorite: boolean;
}

interface TMDBGenre {
    id: number;
    name: string;
}

interface TMDBGenresResponse {
    genres: TMDBGenre[];
}

interface TMDBMultiPageResponse<T> {
    page: number;
    results: T[];
    total_results: number;
    total_pages: number;
}

interface TMDBv4ErrorResponse {
    status_message: string;
    error_message?: string;
    success: boolean;
    status_code: number;
}

interface TMDBv3ErrorResponse {
    status_message: string;
    status_code: number;
}

interface TMDBMovieRating {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    account_rating: {
        created_at: string;
        value: number;
    };
}

interface TMDBFavoriteMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
