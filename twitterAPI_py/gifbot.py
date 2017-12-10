#!/usr/local/bin/python

# GIFBOT
# 1. get a bunch of tweets
# 2. get sentiment analysis for them
# 3. get gifs for the sentiments
# 4. tweet gifs back at them!

from twitterlib import get_random_tweets, send
from sentiment import filter_sentiments
from giphy import get_gifs


def main():
    random_tweets = get_random_tweets(count=40)
    sentiments = filter_sentiments(random_tweets, polarity_filter=0.1)
    for sentiment in sentiments:
        message = get_gifs(sentiment)
        if message:
            print message
            send(message, reply_id=sentiment.tweet.id)
