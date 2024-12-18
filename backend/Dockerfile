FROM node:22.12.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
# COPY package.json /usr/src/app
RUN ls
RUN npm install --loglevel verbose   

# Bundle app source
CMD ["node", "index.js"]
