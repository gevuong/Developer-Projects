from textblob import TextBlob, Word

class Sentiment(object):
    def __init__(self, nouns, emotion, polarity, tweet):
        self.nouns = nouns
        self.emotion = emotion
        self.polarity = polarity
        self.tweet = tweet

blacklist = ['https', 'http', "rt"]

emotion_map = [
    (-0.7, "terrible"),
    (-0.4, "sucks"),
    (-0.1, "bad"),
    (0.1, "weird"),
    (0.4, "cool"),
    (0.7, "awesome"),
    (1.1, "radical"),
]

def map_emotion(polarity):
    for bucket, word in emotion_map:
        if polarity < bucket:
            return word

    return 'weird'

def extract_sentiment(tweet):
    tb = TextBlob(tweet.text)
    good_nouns = [noun for noun in tb.noun_phrases
                  if Word(noun).definitions and noun not in blacklist]

    return Sentiment(
        nouns=good_nouns,
        emotion=map_emotion(tb.sentiment.polarity),
        polarity=tb.polarity,
        tweet=tweet,
    )

def filter_sentiments(tweets, polarity_filter):
    worthwhile_sentiments = []
    for tweet in tweets:
        sentiment = extract_sentiment(tweet)
        if abs(sentiment.polarity) > polarity_filter and sentiment.nouns:
            worthwhile_sentiments.append(sentiment)
    return worthwhile_sentiments
