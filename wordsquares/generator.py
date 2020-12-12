file = open("common_words_clean.txt","r")
output = open("word_squares-3.txt","w")
LENGTH = 3
LETTER = ''
top_right = ''
top_left = LETTER
bottom_right = ''
bottom_left = ''
right_word = ""
left_word = ""
top_word = ""
bottom_word = ""
unique_words = list()
tried_top_words = list()
tried_right_words = list()
tried_left_words = list()
tried_bottom_words = list()

words = list()
for line in file:
    words.append(line)

def get_word_with_first(exceptions,first):
    for word in words:
        

def get_word_with_first_and_last(exceptions,first,last):


