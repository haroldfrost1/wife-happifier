FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json files for all workspaces
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/api apps/api
COPY packages/shared packages/shared

# Build shared libraries
RUN pnpm --filter @wife-happifier/shared build

# Build API
RUN pnpm --filter api build

# Deploy production deps and code to a separate folder
RUN pnpm deploy --filter=api --prod /prod/api

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy the deployed application from the builder
COPY --from=builder /prod/api ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]

