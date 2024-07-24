FROM node:14.16.0-alpine3.13
# Install sudo package
RUN apk --no-cache add sudo
RUN addgroup app && adduser -S -G app app
# Set up sudo for the new user
RUN echo "app ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/app
USER app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
# Create the directory if it doesn't exist and set permissions
RUN sudo mkdir -p ./src/outputs 
RUN sudo touch ./src/outputs/restriction-digest-analysis.txt 
RUN sudo chown -R app:app ./src/outputs
# Remove sudo privileges (optional)
RUN sudo rm /etc/sudoers.d/app

EXPOSE 3000
CMD ["npm", "run", "dev"]