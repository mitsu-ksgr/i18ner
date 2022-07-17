FROM node:16-bullseye-slim

RUN npm install -g npm@8.12.1

WORKDIR /home/node/app

COPY package*.json ./
RUN yarn install

COPY . .
RUN chown -R node:node /home/node

EXPOSE 3000
EXPOSE 4173

USER node
CMD ["yarn", "dev"]

