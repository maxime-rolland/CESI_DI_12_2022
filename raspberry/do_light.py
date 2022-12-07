import machine

rouge = machine.Pin(2, machine.Pin.OUT)
jaune = machine.Pin(3, machine.Pin.OUT)
vert = machine.Pin(4, machine.Pin.OUT)

def do_light(couleur,etat):
    if couleur == "Rouge":
        rouge.value(etat)
    elif couleur == "Jaune":
        jaune.value(etat)
    elif couleur == "Vert":
        vert.value(etat)
        
