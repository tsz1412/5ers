# Use Node.js LTS as base image
FROM node:lts

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose the backend port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:dev"]
