# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare yarn@1.22.19 --activate
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-bullseye-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare yarn@1.22.19 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare yarn@1.22.19 --activate
# Copy build artifacts and minimal runtime files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app ./app
COPY --from=builder /app/data ./data
COPY --from=builder /app/contentlayer.config.ts ./contentlayer.config.ts
COPY --from=builder /app/scripts ./scripts

EXPOSE 3005
CMD ["yarn", "start", "-p", "3005"] 