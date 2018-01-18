import random
import os
import time
import sys

#All ascii was made at http://yourname.ascii.uk/ just replace 'yourname' with whatever you'd like to see turned in ascii

taunt = [':-(', '', '', '', 'You have died of dysentery', 'Better luck next time', 'Ha-Ha','','','','','','']

def ClearScreen():
    unused_variable = os.system("cls")


def Success():
    success = """
 ___ _   _  ___ ___ ___  ___ ___\r 
/ __| | | |/ __/ __/ _ \/ __/ __|\r
\__ \ |_| | (_| (_|  __/\__ \__ \ \r
|___/\__,_|\___\___\___||___/___/\r"""
    print(success + '\n')

def Failure():
    failure = """
                              _\r     
                             | | \r   
 _ __ _   _         _ __ ___ | |__ \r 
| '__| | | |  ___  | '__/ _ \| '_ \ \r
| |  | |_| | |___| | | | (_) | | | |\r
|_|   \__,_|       |_|  \___/|_| |_|\r"""
    print(failure + '\n')
    print(random.choice(taunt) + '\n')

def TypeWriter(words):
    for char in words:
        time.sleep(0.010)
        sys.stdout.write(char)
        sys.stdout.flush()

class Menu:
    def printMainMenu():
        print('\n')
        TypeWriter("Welcome to Your Companies event simulator. Lets roll some dice")
        print('\n\n')
        TypeWriter('------Menu------')
        print('\n')
        TypeWriter("1 - Roll the Dice")
        print('\r')
        TypeWriter("2 - Rules")
        print('\r')
        TypeWriter("3 - Quit")
        print('\n')

def Help():
    ClearScreen()
    print("""================================================================\nThe rules are quite simple:\n
If the dice rolls from 11 -> 20 the action was successful. \nIf the dice rolls 10 or below the action was a failure.\r
    \nModifiers:\r
    \n\t+5 modifier is given if there is a documented procedure for the action.\r
    \t+2 modifier is given if someone has been trained to perform the action.\r
    \nThe IT Guru Master gets to inject randomness into the game to mimic real world \nchanges during an event.
    \nPossible examples:\r
- The attacker posts data to PasteBin\r
- Intern deletes the machine accidentally\r
- Legal steps in and takes the lead handler into a meeting to explain the event\r
- Lead handler's wife has a baby.\r
    \n================================================================""")
        

def DiceRoll():
    ClearScreen()
    documentationModifier = input('\nIs there a documented procedure for the action? (yes/[no]) ')
    trainedModifier = input('Has anyone been trained to perform the action? (yes/[no]) ')
    
    documentationModifierNum = 0
    trainedModiferNum = 0

    if documentationModifier in ('yes', 'y', 'Y', 'YES'):
        documentationModifierNum = 5
        print('Adding a +5 modifier for documentation.')
    if trainedModifier in ('yes', 'y', 'Y', 'YES'):
        trainedModiferNum = 2
        print('Adding a +2 modifier for trained person.')
    
    print('Rolling...')
    
    time.sleep(1)

    number = random.randrange(1,21) 
    modifierTotal = documentationModifierNum + trainedModiferNum
    finalNumber = number + modifierTotal
    if number >= 11:
        Success()
        if modifierTotal > 0:
            print('A ' + str(number) + ' was rolled. With modifiers the final number is ' + str(finalNumber) + '.\nThe action was successful!\n')
        else:
            print('A ' + str(number) + ' was rolled. The action was successful!\n')
    else:
        Failure()
        if modifierTotal > 0:
            print('A ' + str(number) + ' was rolled. With modifiers the final number is ' + str(finalNumber) + '.\nThe action was unsuccessful. :-(\n')
        else:
            print('A ' + str(number) + ' was rolled. The action was unsuccessful. :-(\n')

def WelcomeScreen():
    companyName = """ 
 _   _  ___  _   _ _ __          _ __   __ _ _ __ ___   ___ \r
| | | |/ _ \| | | | '__|  ____  | '_ \ / _` | '_ ` _ \ / _ \ \r
| |_| | (_) | |_| | |    |____| | | | | (_| | | | | | |  __/ \r
 \__, |\___/ \__,_|_|           |_| |_|\__,_|_| |_| |_|\___|\r
  __/ |                                            \r
 |___/     \r"""
        
    for char in companyName:
        time.sleep(0.0010)
        sys.stdout.write(char)
        sys.stdout.flush()

    Menu.printMainMenu()
    TypeWriter("What would you like to do?: ")
    userInput = input()

    if userInput == '1':
        DiceRoll()
    elif userInput == '2':
        Help()
    else:
        quit()

def Main():
    ClearScreen()
    WelcomeScreen()

    while 1:
        userInput = input("Press Enter to roll, 'h' for help or 'q' to quit: ").upper()
        if userInput == 'Q':
            break
        elif userInput == 'H':
            Help()
        else:
            DiceRoll()
    
if __name__ == '__main__':
    Main()



