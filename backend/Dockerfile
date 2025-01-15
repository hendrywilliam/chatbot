ARG NODE_ALPINE_VERSION=3.20
ARG ALPINE_VERSION=3.20.4

# Build stage.
FROM node:23-alpine${NODE_ALPINE_VERSION} AS builder
WORKDIR /build-stage
COPY package*.json ./
COPY . ./
RUN npm run build

# Run stage.
FROM alpine:${ALPINE_VERSION}
WORKDIR /app
RUN apk add --no-cache libstdc++ tini \
  && addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node \
  && chown node:node ./

COPY .env .
COPY --from=builder /usr/local/bin/node /usr/local/bin/
COPY --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
USER node
COPY --from=builder /build-stage/node_modules ./node_modules
COPY --from=builder /build-stage/build ./build
CMD ["/sbin/tini", "node", "build/index.js"]