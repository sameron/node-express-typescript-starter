# --------------> The build image
FROM node:16.17.1 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY . .
RUN yarn install && yarn build \
  && yarn install --immutable --immutable-cache --check-cache --production

# TODO: Uncomment this line if you want to run migrations on build
# RUN npx prisma migrate deploy

# --------------> The production image
FROM node:16.17.1-bullseye-slim

RUN yarn global add pm2

ENV NODE_ENV production
ENV SERVER_PORT 3001

EXPOSE 3001

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/.env .env
COPY --chown=node:node --from=build /usr/src/app/node_modules node_modules
COPY --chown=node:node --from=build /usr/src/app/dist dist

CMD ["dumb-init", "pm2-runtime", "dist/index.js"]