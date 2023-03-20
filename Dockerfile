FROM node:14-slim

WORKDIR /code
COPY . /code/
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]