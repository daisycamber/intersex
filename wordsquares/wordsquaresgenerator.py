file = open("words.txt","r")
output = open("word_squares-4.txt","w")
LENGTH = 4
wordlength = LENGTH
LENGTH = LENGTH + 2
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

found_square = False

count = 0
words = list()
print("Collecting words of length")
print(LENGTH)
z = 10
count = 0
for line in file:
    if(len(line) == LENGTH and count%z == 0):
        words.append(line[0:wordlength])
    count = count + 1
print("Done collecting words")


for top_word in words:
    #top_left = top_word[0:1]
    #top_right = top_word[LENGTH-1:LENGTH]
    print("Tring top word")
    print(top_word)
    for left_word in words:
        for right_word in words:
            for bottom_word in words:
                if(top_word[0:1] == left_word[0:1] and top_word[wordlength-1:wordlength] == right_word[0:1] and left_word[wordlength-1:wordlength] == bottom_word[0:1] and right_word[wordlength-1:wordlength] == bottom_word[wordlength-1:wordlength]) and top_word != left_word and top_word != bottom_word and top_word != right_word and left_word != bottom_word and left_word != right_word and bottom_word != right_word:
                    print("Word square")
                    print(top_word)
                    print(left_word)
                    print(right_word)
                    print(bottom_word)
                    output.write("\"" + top_word.upper() + "\",")
                    output.write("\"" + left_word.upper() + "\",")
                    output.write("\"" + right_word.upper() + "\",")
                    output.write("\"" + bottom_word.upper() + "\",")






#It is good practice to close the file at the end to free up resources
file.close()
output.close()
