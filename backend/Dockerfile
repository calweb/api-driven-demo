FROM node:8.0.0-alpine

# Create app directory
RUN mkdir -p /src
COPY app/package.json /src
WORKDIR /src

RUN npm install
COPY app/ /src

CMD ["npm","start"]
EXPOSE 3000
