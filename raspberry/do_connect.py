# FONCTION permettant la connexion à un réseau WIFI

# Import des librairies externes
import network
import ubinascii
import time

# Import des secrets à partir d'un fichier
from secrets import *

def do_connect(ssid=secrets['ssid'],psk=secrets['password']):
    # On active la carte wifi
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    # On se connecte au Wifi à l'aide des informations de connexion
    wlan.connect(ssid,psk)

    # On attend 10 secondes pour laisser le temps à la carte wifi de se connecter
    wait = 10
    while wait > 0:
        if wlan.status() < 0 or wlan.status() >= 3:
            break
        wait -= 1
        time.sleep(1)

    # En cas d'erreur de connexion
    if wlan.status() != 3:
        raise RuntimeError('wifi connection failed')
    else:
        # Si connecté, on récupère l'IP et la MAC de la carte réseau qu'on retourne
        ip=wlan.ifconfig()[0]
        mac = ubinascii.hexlify(network.WLAN().config('mac'),':').decode()
        
        return {'ip':ip,'mac':mac}