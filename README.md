# Tabbed Menu Web Application

A responsive tabbed menu web application that simulates REST API calls when menu items are clicked. This project was created as part of a midterm assignment for the Higher Institute of Science.

## Table of Contents

- [Tabbed Menu Web Application](#tabbed-menu-web-application)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Menu Item Counts](#menu-item-counts)
  - [Technical Implementation](#technical-implementation)
  - [Project Structure](#project-structure)
  - [Running the Application with Apache httpd](#running-the-application-with-apache-httpd)
    - [Install httpd and start it.](#install-httpd-and-start-it)
    - [Add current user to www-data group.](#add-current-user-to-www-data-group)
    - [Copy projet files to `/var/www`.](#copy-projet-files-to-varwww)
    - [Open http://localhost in browser.](#open-httplocalhost-in-browser)
  - [Docker Deployment](#docker-deployment)
    - [Build Image](#build-image)
    - [Run Image](#run-image)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Authors](#authors)

## Project Overview

This web application was developed as a midterm assignment for the Higher Institute of Science. It demonstrates modern frontend development techniques including:

- Dynamic tabbed interface
- Simulated REST API calls
- Asynchronous JavaScript operations
- Responsive design principles

## Features

 **Interactive Tab System**  
- 4 tabs with distinct menu item counts (3, 4, 2, 5 items respectively)
- Visual feedback for active tabs
- Persistent state management

 **API Simulation**  
- Realistic API call simulation with configurable delay (1500ms)
- Loading states and success messages
- Endpoint visualization

 **UI/UX Elements**  
- Smooth animations and transitions
- Mobile-responsive design
- Accessible color scheme and contrast
- Hover and active state indicators

## Menu Item Counts

- Tab 1: 3 menu items
- Tab 2: 4 menu items
- Tab 3: 2 menu items
- Tab 4: 5 menu items

## Technical Implementation

| Component        | Technology Used         |
|------------------|-------------------------|
| Frontend         | HTML5, CSS3, JavaScript |
| Hosting          | Apache HTTP Server      |
| Containerization | Docker                  |
| Version Control  | Git/GitHub              |

## Project Structure

Cloud_Project_Assignment/ <br/>
├── index.html         # Main application entry point <br/>
├── css/ <br/>
│   └── styles.css     # All styling rules and variables <br/>
├── js/ <br/>
│   └── script.js      # Core application logic <br/>
├── img/               # Asset directory <br/>
│   ├── logo-his.png   # Primary logo <br/>
│   └── logo-his1.png  # Favicon <br/>
├── README.md          # Documentation <br/>
│<br/>
└── Dockerfile          # Dockerfile <br/>

## Running the Application with Apache httpd
### Install httpd and start it.
sudo apt install apache2
sudo service apache2 start

### Add current user to www-data group.
sudo usermod -a -G www-data username
sudo chown -R username:username /var/www

### Copy projet files to `/var/www`.

### Open http://localhost in browser.

## Docker Deployment
### Build Image
docker build -t project:1.0 .
### Run Image
docker run --name myproject -d -p 80:80 project:1.0


## Installation

```bash ``` <br/>
git clone https://github.com/aimenbagh/Cloud_Project_Assignment.git <br/>
cd Cloud_Project_Assignment  

## Usage



## Authors

- Baghdadi Nadjib Aimen 
- Elouchdi Imene Maria 