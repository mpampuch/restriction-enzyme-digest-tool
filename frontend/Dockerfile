FROM node:23.9.0-alpine3.21

# Create app group and user
RUN addgroup app && adduser -S -G app app

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Change ownership of /app to the app user
RUN chown -R app:app /app

# Switch to the app user
USER app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
