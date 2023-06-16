# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies for the client
RUN npm install

# Copy the rest of the client application files to the container
COPY . .

# Expose the port on which the client application listens
EXPOSE 3000

# Set the command to run the client application
CMD ["npm", "start"]
