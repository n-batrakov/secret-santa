FROM node:alpine AS install
    WORKDIR /build
    COPY package.json .
    COPY package-lock.json .
    RUN npm install

FROM node:alpine AS build
    WORKDIR /build
    COPY --from=install /build/ .
    RUN ls
    COPY . .
    RUN npm run build

FROM node:alpine
    EXPOSE 80
    WORKDIR /app
    COPY --from=build /build/dist .
    COPY --from=build /build/node_modules ./node_modules
    ENTRYPOINT ["node", "index.js", "run", "--port", "80"]
