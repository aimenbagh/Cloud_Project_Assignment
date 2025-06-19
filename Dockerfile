# Utilise l'image de base Ubuntu
FROM ubuntu 

# Met à jour la liste des paquets
RUN apt update 

# Installe Apache2 (attention : le tiret devant -y doit être standard)
RUN apt -y install apache2 
# RUN apt install –y apache2-utils 

# Nettoie le cache des paquets pour réduire la taille de l'image
RUN apt clean

# Copie le contenu du projet dans le dossier web d'Apache avec les bons droits
COPY --chown=www-data:www-data . /var/www/html

# Expose le port 80 pour le serveur web
EXPOSE 80

# Lance Apache en mode premier plan
CMD ["apache2ctl", "-D", "FOREGROUND"]
