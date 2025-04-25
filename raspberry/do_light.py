# Fonction qui définit nos LED à partir des GPIO
# Elle active/desactive une LED à partir d'un état (0/1)
import machine
import time

rouge = machine.Pin(2, machine.Pin.OUT)
jaune = machine.Pin(3, machine.Pin.OUT)
vert = machine.Pin(4, machine.Pin.OUT)

def do_light(couleur, etat):
    if couleur == "Rouge":
        rouge.value(etat)
    elif couleur == "Jaune":
        jaune.value(etat)
    elif couleur == "Vert":
        vert.value(etat)

# Test each LED at launch
if __name__ == "__main__":
    print("Testing Rouge LED")
    do_light("Rouge", 1)
    print("Rouge ON")
    time.sleep(1)
    do_light("Rouge", 0)
    print("Rouge OFF")
    
    print("Testing Jaune LED")
    do_light("Jaune", 1)
    print("Jaune ON")
    time.sleep(1)
    do_light("Jaune", 0)
    print("Jaune OFF")
    
    print("Testing Vert LED")
    do_light("Vert", 1)
    print("Vert ON")
    time.sleep(1)
    do_light("Vert", 0)
    print("Vert OFF")
