# Polling Application

## Project :- https://polling-app-frontend.onrender.com/
## Backend :- https://polling.pythonanywhere.com/

![Polling App Screenshot](/path-to-screenshot.png)

## Introduction
This is a web-based polling application developed using Django and React. It leverages the power of Django Rest Framework, Celery, and Redis to provide a real-time polling experience.

## Features
- **User-Friendly Interface**: An intuitive and interactive interface for creating and participating in polls.
- **Real-Time Updates**: Poll results and activity are updated in real-time, providing a dynamic user experience.
- **Poll Expiry**: Every poll remains active for 24 hours. After that, it becomes invisible to all except its creator.
- **Scalable and Efficient**: Celery and Redis ensure efficient background task processing, making the application highly scalable.

## Prerequisites
- Python
- Django
- React
- Django Rest Framework
- Celery
- Redis

## Getting Started
1. Clone the repository.
2. Move to Django_Backend directory.
3. > cd Django_Backend
4. Set up your Python environment and install the required packages.
5. > pip install -r Requirements.txt
6. Create 'redisurl.txt' file in base directory of django(where manage.py file is present) and keep redis cloud database uri.
7. Start the Celery worker.
8. > celery -A Polling worker --loglevel=info -P eventlet
9. Start the Django development server.
10. > python manage.py runserver
11. Set up your react environment and install the required packages.
12. Move to react_frontend directory.
13. > cd react_frontend
14. Start the React frontend (in the `react_frontend` directory).
15. > npm install
16. > npm start

## Usage
- Visit the application in your web browser and start creating and voting on polls.
- Polls will automatically become inactive after 24 hours.
