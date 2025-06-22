# Use the Ubuntu Apache base image
FROM ubuntu/apache2:latest

# Update the package list
RUN apt update 

# Install Apache2 (make sure the dash before -y is standard)
RUN apt -y install apache2 
# RUN apt install –y apache2-utils 

# Clean the package cache to reduce image size
RUN apt clean

# Remove the default Apache index page
RUN rm -rf /var/www/html/*

# Copy the project content into the Apache web folder with correct permissions
COPY --chown=www-data:www-data . /var/www/html

# Expose port 80 for the web server
EXPOSE 80

# Start Apache in foreground mode
CMD ["apache2ctl", "-D", "FOREGROUND"]
