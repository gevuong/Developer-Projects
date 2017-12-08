# make a list to hold onto todos
todo_list = []

# print out instructions on how to use app
print('What are your goals for today?')

# have a HELP command
def show_help():
    print("""
Enter 'DONE' to stop adding todos.
Enter 'SHOW' to show todos in current list.
Enter 'HELP' to learn how to use app.
""")

# have a SHOW command
def show_todo():
    print("Here's your list: ")
    # print out todos
    for num, todo in enumerate(todo_list, start = 1):
        print("{}: {}".format(num, todo))

# add new todo to list
def add_todo(new_todo):
    todo_list.append(new_todo)
    print('Added {} to what is now a list of {} todos'.format(new_todo, len(todo_list)))

def main():
    show_help()

    # ask for new todo
    while True:
        new_todo = input("new_todo: ")

        # be able to quit app
        if new_todo == 'DONE':
            break
        elif new_todo == 'SHOW':
            show_todo()
            continue
        elif new_todo == 'HELP':
            show_help()
            continue
        add_todo(new_todo)

    show_todo()
