import random
import os # allows us to use functionality on the operating system level
import sys # allows us to use functionality on the python level

# make a list of words
words = [
    'battery',
    'hungry',
    'broadway',
    'kumquat',
    'lemon',
    'melon',
    'computer',
    'vitamin',
    'pharmacy'
]


def clear():
    if os.name == 'nt': # 'nt' represents all modern windows
        os.system('cls') # call Windows utility, 'cls'
    else:
        os.system('clear') # if on mac or linux, call 'clear'


def draw(bad_guesses, good_guesses, secret_word):
    clear()
    total_guesses = 6
    print("{}/{} strikes".format(len(bad_guesses), total_guesses))
    print(" ")

    for letter in bad_guesses:
        print(letter, end=' ')
    print('\n\n') # print two new lines

    # draw letter or underline for each letter in secret_word
    for letter in secret_word:
        if letter in good_guesses:
            print(letter, end="")
        else:
            print("_", end="")
    print(" ") # line break


def get_guess(bad_guesses, good_guesses):
    while True:
        guess = input("guess a letter: ").lower()

        if len(guess) != 1:
            print("You can only guess a single letter!")
        elif guess in bad_guesses or guess in good_guesses:
            print("You already guessed that letter!")
        elif not guess.isalpha(): # return whether guess is not an alphabet
            print("You can only guess letters!")
        else:
            return guess


def play():
    clear()
    # pick a random word
    secret_word = random.choice(words) # .choice chooses a random word from an iterable (ie. list or string)
    bad_guesses = []
    good_guesses = []
    total_guesses = 6

    while len(bad_guesses) < total_guesses and len(good_guesses) != len(list(secret_word)):
        draw(bad_guesses, good_guesses, secret_word)
        guess = get_guess(bad_guesses, good_guesses)

        if guess in secret_word:
            good_guesses.append(guess)
            if len(good_guesses) == len(secret_word):
                print("You win! The word was {}.".format(secret_word))
                restart()
        else:
            bad_guesses.append(guess)
            if len(bad_guesses) == total_guesses:
                draw(bad_guesses, good_guesses, secret_word)
                print("Aw, you didn't guess the word! The word was {}.".format(secret_word))
                restart()


def restart():
    play_again = input('Play again? y/n: ')
    if play_again == 'y':
        return play()
    else:
        sys.exit() # exits the game

def welcome():
    print("Welcome to Letter Game!")
    start = input("Press enter/return to start, or q to quit: ")
    if start.lower() == 'q':
        print("See you next time!")
        sys.exit()
    else:
        return True # doesn't do anything, nice to return something

while True:
    clear()
    welcome()
    play()
