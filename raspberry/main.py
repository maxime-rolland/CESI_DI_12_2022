# FONCTION PRINCIPALE main.py, lancée automatiquement au boot du rpy

# Import des lib externes
import time

# Import des fonctions 
from do_connect import *
from do_request import *
from do_light import *

# On se connecte au réseau
networkInfos=do_connect()

# On construit l'url en indiquant l'adresse mac de la machine 
# récupérée lors de la connexion au réseau
url="https://backend.maxime.learn-it.ovh/leds?mac="+networkInfos['mac']

while True:
    try:
        # On récupère le JSON en faisant une requete à l'url construite
        json=do_request(url)

        # Pour chaque LED de notre JSON (array)
        for led in json:
            value=0
            # Si l'état est à true, on passe value à 1
            if led['etat']:
                value=1
            # On passe la value à la fonction chargée d'allumer / éteindre les LEDs
            do_light(led['label'], value)
        #On attend 2 secondes avant de recommencer    
        time.sleep(2)
    except:
        print ("erreur")
        time.sleep(5)
