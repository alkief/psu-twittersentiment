// Definition of shared constants

export const SORTBY_RELEVANCE = 0
export const SORTBY_SENTIMENT = 1
export const SORTYBY_ANGER = 2
export const SORTYBY_SADNESS = 3
export const SORTYBY_JOY = 4
export const SORTYBY_FEAR = 5
export const SORTYBY_DISGUST = 6

// A list of parameter objects to send to Twitter at startup
export const initialSearchParameterSet = [
	{
		q: 'penn state university',
		result_type: 'popular',
		count: '1',
		lang: 'en'
	},
	{
		q: 'psu',
		result_type: 'popular',
		count: '1',
		lang: 'en'
	} ,
	{
		q: 'penn state',
		result_type: 'popular',
		count: '1',
		lang: 'en'
	}
]

// Words that carry little contextual / analytical value in natural language processing
export const stopWordList = [
	"a",
	"about",
	"above",
	"after",
	"again",
	"against",
	"all",
	"am",
	"an",
	"and",
	"any",
	"are",
	"aren't",
	"as",
	"at",
	"be",
	"because",
	"been",
	"before",
	"being",
	"below",
	"between",
	"both",
	"but",
	"by",
	"can't",
	"cannot",
	"could",
	"couldn't",
	"did",
	"didn't",
	"do",
	"does",
	"doesn't",
	"doing",
	"don't",
	"down",
	"during",
	"each",
	"few",
	"for",
	"from",
	"further",
	"had",
	"hadn't",
	"has",
	"hasn't",
	"have",
	"haven't",
	"having",
	"he",
	"he'd",
	"he'll",
	"he's",
	"her",
	"here",
	"here's",
	"hers",
	"herself",
	"him",
	"himself",
	"his",
	"how",
	"how's",
	"i",
	"i'd",
	"i'll",
	"i'm",
	"i've",
	"if",
	"in",
	"into",
	"is",
	"isn't",
	"it",
	"it's",
	"its",
	"itself",
	"let's",
	"me",
	"more",
	"most",
	"mustn't",
	"my",
	"myself",
	"no",
	"nor",
	"not",
	"of",
	"off",
	"on",
	"once",
	"only",
	"or",
	"other",
	"ought",
	"our",
	"ours",
	"ourselves",
	"out",
	"over",
	"own",
	"same",
	"shan't",
	"she",
	"she'd",
	"she'll",
	"she's",
	"should",
	"shouldn't",
	"so",
	"some",
	"such",
	"than",
	"that",
	"that's",
	"the",
	"their",
	"theirs",
	"them",
	"themselves",
	"then",
	"there",
	"there's",
	"these",
	"they",
	"they'd",
	"they'll",
	"they're",
	"they've",
	"this",
	"those",
	"through",
	"to",
	"too",
	"under",
	"until",
	"up",
	"very",
	"was",
	"wasn't",
	"we",
	"we'd",
	"we'll",
	"we're",
	"we've",
	"were",
	"weren't",
	"what",
	"what's",
	"when",
	"when's",
	"where",
	"where's",
	"which",
	"while",
	"who",
	"who's",
	"whom",
	"why",
	"why's",
	"with",
	"won't",
	"would",
	"wouldn't",
	"you",
	"you'd",
	"you'll",
	"you're",
	"you've",
	"your",
	"yours",
	"yourself",
	"yourselves"
]

// Conversions for acronyms
export const acronymList = [
	{
		key: 'lol',
		value: 'laugh out loud'
	},
	{
		key: 'rofl',
		value: 'rolling on floor laughing'
	},
	{
		key: 'afaik',
		value: 'as far as i know'
	},
	{
		key: 'smh',
		value: 'shaking my head'
	},
	{
		key: 'b4',
		value: 'before'
	}
	/*
	{
		key: '',
		value: ''
	}
	*/
]

// Conversions for emoji hex characters -- only includes commonly used faces
export const emojiList = [
	{
		key: "1f600",
		value: "grinning face"
	},
	{
		key: "1f601",
		value: "beaming face with smiling eyes"
	},
	{
		key: "1f602",
		value: "face with tears of joy"
	},
	{
		key: "1f923",
		value: "rolling on the floor laughing"
	},
	{
		key: "1f603",
		value: "grinning face with big eyes"
	},
	{
		key: "1f604",
		value: "grinning face with smiling eyes"
	},
	{
		key: "1f605",
		value: "grinning face with sweat"
	},
	{
		key: "1f606",
		value: "grinning squinting face"
	},
	{
		key: "1f609",
		value: "winking face"
	},
	{
		key: "1f60a",
		value: "smiling face with smiling eyes"
	},
	{
		key: "1f60b",
		value: "face savoring food"
	},
	{
		key: "1f60e",
		value: "smiling face with sunglasses"
	},
	{
		key: "1f60d",
		value: "smiling face with heart-eyes"
	},
	{
		key: "1f618",
		value: "face blowing a kiss"
	},
	{
		key: "1f617",
		value: "kissing face"
	},
	{
		key: "1f619",
		value: "kissing face with smiling eyes"
	},
	{
		key: "1f61a",
		value: "kissing face with closed eyes"
	},
	{
		key: "263a",
		value: "smiling face"
	},
	{
		key: "1f642",
		value: "slightly smiling face"
	},
	{
		key: "1f917",
		value: "hugging face"
	},
	{
		key: "1f929",
		value: "star struck"
	},
	{
		key: "1f914",
		value: "thinking face"
	},
	{
		key: "1f928",
		value: "face with raised eyebrow"
	},
	{
		key: "1f610",
		value: "neutral face"
	},
	{
		key: "1f611",
		value: "expressionless face"
	},
	{
		key: "1f636",
		value: "face without mouth"
	},
	{
		key: "1f644",
		value: "face with rolling eyes"
	},
	{
		key: "1f60f",
		value: "smirking face"
	},
	{
		key: "1f623",
		value: "persevering face"
	},
	{
		key: "1f625",
		value: "sad but relieved face"
	},
	{
		key: "1f62e",
		value: "face with open mouth"
	},
	{
		key: "1f910",
		value: "zipper-mouth face"
	},
	{
		key: "1f62f",
		value: "hushed face"
	},
	{
		key: "1f62a",
		value: "sleepy face"
	},
	{
		key: "1f62b",
		value: "tired face"
	},
	{
		key: "1f634",
		value: "sleeping face"
	},
	{
		key: "1f60c",
		value: "relieved face"
	},
	{
		key: "1f61b",
		value: "face with tongue"
	},
	{
		key: "1f61c",
		value: "winking face with tongue"
	},
	{
		key: "1f61d",
		value: "squinting face with tongue"
	},
	{
		key: "1f924",
		value: "drooling face"
	},
	{
		key: "1f612",
		value: "unamused face"
	},
	{
		key: "1f613",
		value: "downcast face with sweat"
	},
	{
		key: "1f614",
		value: "pensive face"
	},
	{
		key: "1f615",
		value: "confused face"
	},
	{
		key: "1f643",
		value: "upside-down face"
	},
	{
		key: "1f911",
		value: "money-mouth face"
	},
	{
		key: "1f632",
		value: "astonished face"
	},
	{
		key: "2639",
		value: "frowning face"
	},
	{
		key: "1f641",
		value: "slightly frowning face"
	},
	{
		key: "1f616",
		value: "confounded face"
	},
	{
		key: "1f61e",
		value: "disappointed face"
	},
	{
		key: "1f61f",
		value: "worried face"
	},
	{
		key: "1f624",
		value: "face with steam from nose"
	},
	{
		key: "1f622",
		value: "crying face"
	},
	{
		key: "1f62d",
		value: "loudly crying face"
	},
	{
		key: "1f626",
		value: "frowning face with open mouth"
	},
	{
		key: "1f627",
		value: "anguished face"
	},
	{
		key: "1f628",
		value: "fearful face"
	},
	{
		key: "1f629",
		value: "weary face"
	},
	{
		key: "1f92f",
		value: "exploding head"
	},
	{
		key: "1f62c",
		value: "grimacing face"
	},
	{
		key: "1f630",
		value: "anxious face with sweat"
	},
	{
		key: "1f631",
		value: "face screaming in fear"
	},
	{
		key: "1f633",
		value: "flushed face"
	},
	{
		key: "1f92a",
		value: "zany face"
	},
	{
		key: "1f635",
		value: "dizzy face"
	},
	{
		key: "1f621",
		value: "pouting face"
	},
	{
		key: "1f620",
		value: "angry face"
	},
	{
		key: "1f92c",
		value: "face with symbols on mouth"
	},
	{
		key: "1f637",
		value: "face with medical mask"
	},
	{
		key: "1f912",
		value: "face with thermometer"
	},
	{
		key: "1f915",
		value: "face with head-bandage"
	},
	{
		key: "1f922",
		value: "nauseated face"
	},
	{
		key: "1f92e",
		value: "face vomiting"
	},
	{
		key: "1f927",
		value: "sneezing face"
	},
	{
		key: "1f607",
		value: "smiling face with halo"
	},
	{
		key: "1f920",
		value: "cowboy hat face"
	},
	{
		key: "1f921",
		value: "clown face"
	},
	{
		key: "1f925",
		value: "lying face"
	},
	{
		key: "1f92b",
		value: "shushing face"
	},
	{
		key: "1f92d",
		value: "face with hand over mouth"
	},
	{
		key: "1f9d0",
		value: "face with monocle"
	},
	{
		key: "1f913",
		value: "nerd face"
	},
	{
		key: "1f608",
		value: "smiling face with horns"
	},
	{
		key: "1f47f",
		value: "angry face with horns"
	},
	{
		key: "1f479",
		value: "ogre"
	},
	{
		key: "1f47a",
		value: "goblin"
	},
	{
		key: "1f480",
		value: "skull"
	},
	{
		key: "2620",
		value: "skull and crossbones"
	},
	{
		key: "1f47b",
		value: "ghost"
	},
	{
		key: "1f47d",
		value: "alien"
	},
	{
		key: "1f47e",
		value: "alien monster"
	},
	{
		key: "1f916",
		value: "robot face"
	},
	{
		key: "1f4a9",
		value: "pile of poo"
	},
	{
		key: "1f63a",
		value: "grinning cat face"
	},
	{
		key: "1f638",
		value: "grinning cat face with smiling eyes"
	},
	{
		key: "1f639",
		value: "cat face with tears of joy"
	},
	{
		key: "1f63b",
		value: "smiling cat face with heart-eyes"
	},
	{
		key: "1f63c",
		value: "cat face with wry smile"
	},
	{
		key: "1f63d",
		value: "kissing cat face"
	},
	{
		key: "1f640",
		value: "weary cat face"
	},
	{
		key: "1f63f",
		value: "crying cat face"
	},
	{
		key: "1f63e",
		value: "pouting cat face"
	},
	{
		key: "1f648",
		value: "see-no-evil monkey"
	},
	{
		key: "1f649",
		value: "hear-no-evil monkey"
	},
	{
		key: "1f64a",
		value: "speak-no-evil monkey"
	}
]