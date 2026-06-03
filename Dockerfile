FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=builder /app/dist /usr/share/nginx/html
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.template
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY 50-env-html.sh /docker-entrypoint.d/50-env-html.sh
RUN chmod +x /docker-entrypoint.d/50-env-html.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
