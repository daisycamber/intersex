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

found_square = False

count = 0
words = list()
for line in file:
    words.append(line)
while not found_square:
    for line in words:
        if len(line) == LENGTH + 1 and  (line not in tried_top_words): # line[0:1] == LETTER and
            top_word = line
            print(line)
            tried_top_words.append(line)
            break
    #print(tried_top_words)
    top_left = top_word[0:1]
    top_right = top_word[LENGTH-1:LENGTH]
    for line in words:
        if len(line) == LENGTH + 1 and line[0:1] == top_left and not line == top_word and not line in tried_left_words:
            print(line)
            left_word = line
            tried_left_words.append(line)
            break
    bottom_left = left_word[LENGTH-1:LENGTH]
    for line in words:
        if len(line) == LENGTH + 1 and line[0:1] == top_right and not (line == top_word or line == left_word) and  not line in tried_right_words:
            print(line)
            right_word = line
            tried_right_words.append(line)
            break
    bottom_right = right_word[LENGTH-1:LENGTH]
    for line in words:
        if len(line) == LENGTH + 1 and line[LENGTH-1:LENGTH] == bottom_right and line[0:1] == bottom_left and not (line == top_word or line == left_word or line == right_word) and not line in tried_bottom_words:
            print(line)
            bottom_word = line
            tried_bottom_words.append(line)
            break
    found_square = True
    if len(top_word) == 0 or len(right_word) == 0 or len(left_word) == 0 or len(bottom_word) == 0:
        #tried_top_words = list()
        tried_left_words = list()
        tried_right_words = list()
        tried_bottom_words = list()
        found_square = False
        count = count + 1
    if not found_square:
        print("Failed to find square")
    else:
        found_square = False
        print("Word Square")
        output.write(top_word)
        output.write(left_word)
        output.write(right_word)
        output.write(bottom_word)




#It is good practice to close the file at the end to free up resources
file.close()
output.close()
