FROM node:23

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN mkdir -p temp uploads 

CMD ["npm", "run", "dev"]