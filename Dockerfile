# syntax=docker/dockerfile:1
FROM node:18
ENV NODE_ENV=development
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
ENTRYPOINT ["npm", "run", "start:dev"]
