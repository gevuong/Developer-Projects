#!/usr/local/bin/python

# GIFBOT
# 1. get a bunch of tweets
# 2. get sentiment analysis for them
# 3. get gifs for the sentiments
# 4. tweet gifs back at them!

from twitterlib import twitterlib.py
from sentiment import sentiment.py

def main():
    random_tweets = get_random_tweets()
    for tweet in random_tweets:
        print tweet

if __name__ == "__main__":
    main()
