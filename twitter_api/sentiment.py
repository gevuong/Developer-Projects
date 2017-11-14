from textblob import textblob

# boiler plate to explicitly create a class instead of a namedtuple
class Sentiment(object):
    def __init__(noun, emotion):
        self.noun = noun
        self.emotion = emotion

def extract_sentiment(tweet):
    tb = TextBlob(tweet.text)
    print tb.noun_phrases
    print tb.sentiment
