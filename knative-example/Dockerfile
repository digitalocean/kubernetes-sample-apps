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

FROM httpd:2.4-alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=builder /usr/src/app/dist/ ./
EXPOSE 80
