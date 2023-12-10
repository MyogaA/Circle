# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package* .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application using Vite
# RUN npm run build

# Expose the port that the application will run on (if applicable)
# EXPOSE 3000

# Start the application (adjust the command as needed)
CMD [ "npm", "run", "dev" ]
