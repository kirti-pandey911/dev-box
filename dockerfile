# Use Node.js 24.5.0 as base image
FROM node:24.5.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port your app runs on
EXPOSE 5000

# Command to run the app
CMD ["npm", "run", "dev"]
