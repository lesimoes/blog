# syntax=docker/dockerfile:1

FROM node:20-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
ENV NODE_ENV=development
RUN corepack enable && corepack prepare yarn@3.6.1 --activate
COPY package.json yarn.lock ./
RUN yarn install --immutable

FROM deps AS builder
# Copy all sources
COPY . .
# Build Next.js (includes Contentlayer)
RUN yarn build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3005

# Enable Yarn 3
RUN corepack enable && corepack prepare yarn@3.6.1 --activate

# Only install production deps for runtime
COPY package.json yarn.lock ./
RUN yarn install --immutable --production

# Copy build output and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Optional: include Contentlayer artifacts if referenced at runtime
COPY --from=builder /app/.contentlayer ./.contentlayer

EXPOSE 3005

# Use non-root user for security
USER node

CMD ["yarn", "serve", "-p", "3005", "-H", "0.0.0.0"] 