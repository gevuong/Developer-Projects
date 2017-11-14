import requests
import random
"""
http://api.giphy.com/v1/gifs/search/?api_key=<REDACTED>&q=cool+detroit
"""

API_KEY = "<REDACTED>"
SEARCH_URL = "http://api.giphy.com/v1/gifs/search"


def giphy_search_from_sentiment(sentiment):
    return "+".join(sentiment.nouns + [sentiment.emotion])


def get_gifs(sentiment):
    get_args = {
        "api_key": API_KEY,
        "q": giphy_search_from_sentiment(sentiment)
    }
    resp = requests.get(SEARCH_URL, params=get_args)
    assert resp.status_code == 200

    body = resp.json()
    gifs = body['data']
    chosen_gif = random.choice(gifs)
    return chosen_gif['bitly_url']
