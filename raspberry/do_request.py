# Fonction qui permet de faire des requetes GET et de récupèrer du JSON
import urequests

def do_request(url):
    r = urequests.get(url)
    result=r.json()
    r.close()
    return result
