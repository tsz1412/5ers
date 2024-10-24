# First Stage: Build
FROM node:22 AS builder

# Set environment to development (for build purposes)
ENV NODE_ENV=development

# Set working directory
WORKDIR /app

# Install Nest CLI globally (if you need it during build)
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies including dev dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Second Stage: Runtime
FROM node:22 AS runtime

# Set environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install only production dependencies
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled code from build stage
COPY --from=builder /app/dist ./dist

# Expose the backend port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
