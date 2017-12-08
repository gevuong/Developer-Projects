import random

def game():
    # generate a random number between 1 and 10
    secret_num = random.randint(1, 10) # includes 1 and 10 as possibilities
    guess_count = 3

    while guess_count > 0:
        resp = input('Guess a number between 1 and 10: ')
        try:
            # have player guess a number
            guess = int(resp)
        except ValueError:
            print("{} is not an integer!".format(resp))
        else:
            # compare player guess to secret number
            if guess == secret_num:
                print("You guessed it right! My number was {}!".format(secret_num))
                play_again = input("Play again? y/n: ")
                if play_again == 'y':
                    game()
                else:
                    print('Ok bye!')
                    break
            elif guess < secret_num:
                print("My number is higher than {}, guess again".format(guess))
                guess_count -= 1
            elif guess > secret_num:
                print("My number is lower than {}, guess again".format(guess))
                guess_count -= 1
    else: # runs when while loop finishes on its own, and when break or exception does not execute.
        print("You ran out of guesses. My number was {}!".format(secret_num))
        play_again = input("Play again? y/n: ")
        game() if play_again == 'y' else print('Ok bye!')

game()
