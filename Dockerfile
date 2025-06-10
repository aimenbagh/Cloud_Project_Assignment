FROM ubuntu 
RUN apt update 
RUN apt –y install apache2 
# RUN apt install –y apache2-utils 
RUN apt clean
COPY --chown=www-data:www-data . /var/www/html
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]