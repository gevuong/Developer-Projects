import twitter
import pprint # a way of printing a dictionary in nice format
from collections import namedtuple # tuples are immutable, as opposed to a list

TWITTER_API_KEY = "V4eB3oE0GvDOId7qnhhS4Q1WK"
TWITTER_API_SECRET = "quc2LoJaieClpBZcscJ65l3n9G9WCemxvyVNIVMS7PJuZ8b9oQ"
ACCESS_TOKEN = "444831481-mUgYuNOcezlTEgxTDaK5s6Aia0dv2PuOa2FQmI3v"
ACCESS_TOKEN_SECRET = "tppJplbctEn1Yay6HlvvbkJkYXox4dUXbAXm719WglwA8"

Tweet = namedtuple("Tweet", ['username', 'text'])

# Talk to twitter, get random tweets using our API integration
def get_random_tweets(count=10):
    api = twitter.Api(
        consumer_key=TWITTER_API_KEY,
        consumer_secret=TWITTER_API_SECRET,
        access_token_key=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET
    )

    tweet_generator = api.GetStreamSample()
    n = 0
    ret = []
    stop_count = 100
    for tweet in tweet_generator: # each tweet is a dictionary

        stop_count = stop_count - 1
        if len(ret) > count or stop_count < 0:
            break

        tweet = next(tweet_generator) # Retrieve the next item from the iterator by calling its next() method
        if tweet.get('lang', None) != "en":
            continue

        ret.append(Tweet(username=tweet['user']['screen_name'],
                         text=tweet['text']))

    return ret
