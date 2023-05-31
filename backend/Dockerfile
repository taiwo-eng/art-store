FROM node:14

COPY . /backend

WORKDIR /backend

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
