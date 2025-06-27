### trie a bulle sorting asc ###

def trie_a_bulle(liste):
    n = len(liste)
    for i in range(n):
        for j in range(0, n-i-1):
            if liste[j] > liste[j+1]:
                liste[j], liste[j+1] = liste[j+1], liste[j]
    return liste


liste = [10,1, 2, 3, 4, 5]
print(trie_a_bulle(liste))





