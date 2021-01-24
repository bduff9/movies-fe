export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: string;
	/** A date without time */
	DateType: string;
};

export type Query = {
	__typename?: 'Query';
	countMovieItems: Scalars['Int'];
	movieItems: Array<MovieItem>;
	movieItem: MovieItem;
	countMovies: Scalars['Int'];
	movies: Array<Movie>;
};

export type QueryCountMovieItemsArgs = {
	itemName?: Maybe<StringFilterInput>;
	caseType?: Maybe<CaseTypeFilterInput>;
	digitalType?: Maybe<DigitalTypeFilterInput>;
	is3D?: Maybe<YesNoFilterInput>;
	isWatched?: Maybe<YesNoFilterInput>;
	formatType?: Maybe<FormatTypeFilterInput>;
	itemStatus?: Maybe<StatusTypeFilterInput>;
	releaseDate?: Maybe<DateFilterInput>;
};

export type QueryMovieItemsArgs = {
	itemName?: Maybe<StringFilterInput>;
	caseType?: Maybe<CaseTypeFilterInput>;
	digitalType?: Maybe<DigitalTypeFilterInput>;
	is3D?: Maybe<YesNoFilterInput>;
	isWatched?: Maybe<YesNoFilterInput>;
	formatType?: Maybe<FormatTypeFilterInput>;
	itemStatus?: Maybe<StatusTypeFilterInput>;
	releaseDate?: Maybe<DateFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
	order?: Maybe<Array<OrderBy>>;
};

export type QueryMovieItemArgs = {
	itemID: Scalars['Int'];
};

export type QueryMoviesArgs = {
	itemID: Scalars['Int'];
};

export type StringFilterInput = {
	relation: FilterType;
	value: Scalars['String'];
	value2?: Maybe<Scalars['String']>;
};

/** The filter relationship */
export enum FilterType {
	Between = 'between',
	EndsWith = 'endsWith',
	Equal = 'equal',
	Like = 'like',
	StartsWith = 'startsWith',
}

export type CaseTypeFilterInput = {
	relation: FilterType;
	value: CaseType;
	value2?: Maybe<CaseType>;
};

/** The type of case the movie item is in */
export enum CaseType {
	Box = 'Box',
	Digibook = 'Digibook',
	Plain = 'Plain',
	Slipcover = 'Slipcover',
	Steelbook = 'Steelbook',
}

export type DigitalTypeFilterInput = {
	relation: FilterType;
	value: DigitalType;
	value2?: Maybe<DigitalType>;
};

/** The digital movie format included, if any */
export enum DigitalType {
	Dc = 'DC',
	Dcuv = 'DCUV',
	None = 'None',
	Uv = 'UV',
}

export type YesNoFilterInput = {
	relation: FilterType;
	value: YesNo;
	value2?: Maybe<YesNo>;
};

/** Yes or No flag */
export enum YesNo {
	N = 'N',
	Y = 'Y',
}

export type FormatTypeFilterInput = {
	relation: FilterType;
	value: FormatType;
	value2?: Maybe<FormatType>;
};

/** The format of the movie item */
export enum FormatType {
	BluRay = 'BluRay',
	Dvd = 'DVD',
	Digital = 'Digital',
	Uv = 'UV',
	UltraHd = 'UltraHD',
}

export type StatusTypeFilterInput = {
	relation: FilterType;
	value: StatusType;
	value2?: Maybe<StatusType>;
};

/** The current status of the movie item */
export enum StatusType {
	Owned = 'Owned',
	Selling = 'Selling',
	Waiting = 'Waiting',
	Wanted = 'Wanted',
}

export type DateFilterInput = {
	relation: FilterType;
	value: Scalars['DateTime'];
	value2?: Maybe<Scalars['DateTime']>;
};

export type MovieItem = {
	__typename?: 'MovieItem';
	itemID: Scalars['Int'];
	ordered?: Maybe<Scalars['Int']>;
	itemName: Scalars['String'];
	caseType: CaseType;
	digitalType: DigitalType;
	is3D: YesNo;
	isWatched: YesNo;
	formatType: FormatType;
	itemStatus: StatusType;
	releaseDate?: Maybe<Scalars['DateType']>;
	itemURL: Scalars['String'];
	itemNotes?: Maybe<Scalars['String']>;
};

export type OrderBy = {
	field: Scalars['String'];
	direction: OrderType;
};

/** The order direction */
export enum OrderType {
	Asc = 'ASC',
	Desc = 'DESC',
}

export type Movie = {
	__typename?: 'Movie';
	movieID: Scalars['Int'];
	itemID?: Maybe<Scalars['Int']>;
	movieTitle?: Maybe<Scalars['String']>;
	movieURL?: Maybe<Scalars['String']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	addMovieItem: MovieItem;
	markMovieWatched: MovieItem;
	updateMovieItem: MovieItem;
	addMovie: Movie;
	updateMovie: Movie;
};

export type MutationAddMovieItemArgs = {
	itemName: Scalars['String'];
	caseType: CaseType;
	digitalType: DigitalType;
	is3D: YesNo;
	isWatched: YesNo;
	formatType: FormatType;
	itemStatus: StatusType;
	releaseDate?: Maybe<Scalars['DateType']>;
	itemURL: Scalars['String'];
	itemNotes?: Maybe<Scalars['String']>;
};

export type MutationMarkMovieWatchedArgs = {
	isWatched: YesNo;
	itemID: Scalars['Int'];
};

export type MutationUpdateMovieItemArgs = {
	itemName: Scalars['String'];
	caseType: CaseType;
	digitalType: DigitalType;
	is3D: YesNo;
	isWatched: YesNo;
	formatType: FormatType;
	itemStatus: StatusType;
	releaseDate?: Maybe<Scalars['DateType']>;
	itemURL: Scalars['String'];
	itemNotes?: Maybe<Scalars['String']>;
	itemID: Scalars['Int'];
};

export type MutationAddMovieArgs = {
	itemID: Scalars['Int'];
	movieTitle: Scalars['String'];
	movieURL: Scalars['String'];
};

export type MutationUpdateMovieArgs = {
	itemID?: Maybe<Scalars['Int']>;
	movieTitle?: Maybe<Scalars['String']>;
	movieURL?: Maybe<Scalars['String']>;
	movieID: Scalars['Int'];
};

export interface IntrospectionResultData {
	__schema: {
		types: {
			kind: string;
			name: string;
			possibleTypes: {
				name: string;
			}[];
		}[];
	};
}
const result: IntrospectionResultData = {
	__schema: {
		types: [],
	},
};
export default result;
