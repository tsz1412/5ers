# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port that the React app will run on (default 3000, but we'll remap to 3001 in docker-compose)
EXPOSE 3001

# Step 7: Start the React app
CMD ["npm", "start"]
