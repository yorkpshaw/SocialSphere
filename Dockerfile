# Build stage for client
FROM node:14 as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build stage for server
FROM node:14 as server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Development stage
FROM node:14 as development
WORKDIR /app
COPY --from=client-build /app/client/build ./client/build
COPY --from=server-build /app/server .
RUN npm install
CMD concurrently "npm start --prefix client" "nodemon index.js"

# Production stage
FROM node:14 as production
WORKDIR /app
COPY --from=client-build /app/client/build ./client/build
COPY --from=server-build /app/server .
RUN npm install --only=production
CMD ["node", "index.js"]
