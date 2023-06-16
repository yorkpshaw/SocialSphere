# Use the official Docker Compose image as the base image
FROM docker/compose:1.29.2

# Copy the entire project to the working directory inside the container
COPY . /app

# Set the working directory to the project directory
WORKDIR /app

# Build and run the Docker Compose services
CMD ["docker-compose", "up"]
