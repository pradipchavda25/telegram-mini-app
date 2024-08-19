# Start with the official Node.js Docker image
FROM node:20-alpine
 
# Set the working directory in the Docker container
WORKDIR /app
 
# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
 
# Install the application dependencies
RUN npm install
 
# If serve is not included in your package.json, install it globally
RUN npm install -g serve
 
# Copy the rest of the application code to the working directory
COPY . .
 
# Build the application
RUN npm run build:prod
 
# Expose port 8080 for the application
EXPOSE 8080
 
# Run serve when the container launches
# Serve the build directory on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]