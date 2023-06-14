# Build stage for client
FROM node:14 as client-build
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run start

# Build stage for server
FROM node:14 as server-build
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Production stage
FROM node:14
WORKDIR /app
COPY --from=client-build /app/build ./client/build
COPY --from=server-build /app .
RUN npm install --only=production

# Set the command to run the server
CMD ["nodemon", "index.js"]
