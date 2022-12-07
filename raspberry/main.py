print ('Raspberry Project for DI - main')

import time

from do_connect import *
from do_request import *
from do_light import *

networkInfos=do_connect()
print (networkInfos)
url="https://backend.maxime.learn-it.ovh/leds?mac="+networkInfos['mac']
print(url)

while True:
    try:
        json=do_request(url)
        print(json)

        for led in json:
            value=0
            if led['etat']:
                value=1
            do_light(led['label'], value)
            
        time.sleep(5)
    except:
        print ("erreur")
        time.sleep(5)
        #break
