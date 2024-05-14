FROM node:22

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev:host"]
