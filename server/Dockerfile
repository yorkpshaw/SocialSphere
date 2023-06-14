# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies for the server
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Install bcrypt with specific flags
RUN npm install bcrypt --build-from-source --unsafe-perm

# Copy the rest of the server application files to the container
COPY . .

# Expose the port on which the server application listens
EXPOSE 3001

# Set the command to run the server application
CMD ["nodemon", "index.js"]
