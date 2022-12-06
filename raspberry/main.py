print ('Raspberry Project for DI - main')
import time
from do_connect import *
from do_request import *
networkInfos=do_connect()
print (networkInfos)
url="http://maxime.learn-it.ovh/leds?mac="+networkInfos['mac']
print(url)

while True:
    try:
        json=do_request(url)
        print(json)

        for led in json:
            if led['etat']:
                print(led['label'])
        time.sleep(5)
    except:
        print ("erreur")
