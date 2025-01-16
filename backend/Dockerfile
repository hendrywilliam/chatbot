ARG NODE_ALPINE_VERSION=3.20
ARG ALPINE_VERSION=3.20.4

# Initial stage.
FROM node:23-alpine${NODE_ALPINE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY package*.json ./
COPY . ./
RUN npm install -g pnpm

# Stage without Dev Dependencies.
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


# # Build stage.
# FROM node:23-alpine${NODE_ALPINE_VERSION} AS builder
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# WORKDIR /build-stage
# COPY package*.json ./
# COPY . ./
# RUN npm install -g pnpm
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

# Run stage.
FROM alpine:${ALPINE_VERSION}
WORKDIR /app
RUN apk add --no-cache libstdc++ tini \
  && addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node \
  && chown node:node ./

COPY --from=base /usr/local/bin/node /usr/local/bin/
COPY --from=base /usr/local/bin/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
USER node
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builds /app/build ./build
CMD ["/sbin/tini", "node", "build/index.js"]