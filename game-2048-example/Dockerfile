FROM node:16-slim AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install --include=dev
#
# Build mode can be set via NODE_ENV environment variable (development or production)
# See project package.json and webpack.config.js
#
ENV NODE_ENV=development
RUN npm run build

FROM node:16-slim
RUN npm install http-server -g
RUN mkdir /public
WORKDIR /public
COPY --from=builder /usr/src/app/dist/ ./
EXPOSE 8080
USER 1000
CMD ["http-server"]
