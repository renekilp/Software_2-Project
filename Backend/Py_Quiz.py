from Py_Sql import get_random_question
from colorama import Fore,init
init(autoreset=True)
def quiz():
    question = get_random_question() # Hakee kysymyksen
    correct_answer = question[1] # ottaa ylös oikean vastauksen
    answer_set = {question[1],question[2],question[3],question[4],question[5]} # sekoittaa kysymykset muttamalle listan setiksi

    shuffled_answer = [answer for answer in answer_set] # muuttaa setin takaisin listaksi

    print(f"{Fore.GREEN}{question[0]}") #printaa kysymyksen
    for i in range(len(shuffled_answer)): #printaa vastauksen
        print(f"{Fore.YELLOW}{i+1}. {shuffled_answer[i]}")

    user_input = input(f"{Fore.GREEN}Syötä vastauksesi (1,2,3,4,5)\n")
    while True:

        if user_input.isnumeric(): # jos vastaus on numero
            if int(user_input)-1 == (shuffled_answer.index(correct_answer)): #onko vastaus oikein
                print(f"{Fore.CYAN}CORRECT")
                return True
            else:
                print(f"{Fore.RED}INCORRECT")
                return False

        user_input = input(f"{Fore.GREEN}Answer was not in correct format try again\n")