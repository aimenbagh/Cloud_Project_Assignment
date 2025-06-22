# Use the Ubuntu Apache base image
FROM ubuntu/apache2:latest

# Remove the default Apache index page
RUN rm -rf /var/www/html/*

# Copy the project content into the Apache web folder with correct permissions
COPY --chown=www-data:www-data . /var/www/html

# Expose port 80 for the web server
EXPOSE 80

# Start Apache in foreground mode
CMD ["apache2ctl", "-D", "FOREGROUND"]
