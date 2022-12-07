#!/bin/bash


# ON suit la procédure officielle : https://docs.docker.com/engine/install/ubuntu/
# On désinstalle les anciennes version de docker
apt-get remove -y docker docker-engine docker.io containerd runc

# On met à jour notre index APT et on installe de quoi utiliser APT sur des dépots https
apt-get update
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# On ajoute la clé GPG officielle de docker dans notre système
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# On ajoute à la liste des dépots le dépot d'ubuntu
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

# On remet à jour notre cache APT pour tenir compte des paquets présents sur le nouveau dépot
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

adduser ubuntu docker
exit
