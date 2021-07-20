FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

# * ====================
FROM node:16-alpine as modules

WORKDIR /usr/app

RUN apk --no-cache add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile --production
RUN /usr/local/bin/node-prune

# * ====================
FROM alpine:latest as main

RUN apk --no-cache add nodejs=14.17.1-r0

WORKDIR /usr/app/

COPY --from=modules /usr/app/node_modules node_modules
COPY --from=builder /usr/app/dist dist
COPY package.json .
COPY public public
COPY tsconfig.build.json .

ENV NODE_ENV production

CMD ["node", "./node_modules/@nestjs/cli/bin/nest.js", "start"]
EXPOSE 3000
