   # server/djangoapp/microservices/Dockerfile
   FROM python:3.9.18-slim-bookworm

   # Set the working directory
   WORKDIR /python-docker

   # Copy the requirements file from the microservices directory
   COPY microservices/requirements.txt requirements.txt

   # Install dependencies
   RUN pip install --no-cache-dir -r requirements.txt

   # Copy the rest of the application code
   COPY . .

   # Expose the port your app runs on
   EXPOSE 8000

   # Command to run the application
   CMD ["gunicorn", "djangoproj.wsgi:application", "--bind", "0.0.0.0:8000"]
