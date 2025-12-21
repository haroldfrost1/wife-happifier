FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json files for all workspaces
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

# Install dependencies (including devDependencies for building)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/api apps/api
COPY packages/shared packages/shared

# Build shared libraries
RUN pnpm --filter @wife-happifier/shared build

# Build API
RUN pnpm --filter api build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
# Copy built shared package just in case runtime needs it (though usually it's bundled or in node_modules)
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/

# Set working directory to api for convenience, or run from root
WORKDIR /app/apps/api

# Expose port (default NestJS is 3000, but configure as needed)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
