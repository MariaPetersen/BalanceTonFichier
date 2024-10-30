FROM node:23

WORKDIR /frontend

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "start"]