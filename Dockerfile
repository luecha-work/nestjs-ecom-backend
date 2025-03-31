# Build stage
FROM node:18.17.1-alpine AS build

WORKDIR /app

# Copy package.json and yarn.lock (ถ้ามี)
COPY package.json yarn.lock* ./

# ติดตั้ง dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:18.17.1-alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# ติดตั้งเฉพาะ production dependencies
RUN yarn install --frozen-lockfile --production

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Copy necessary files for uploads
RUN mkdir -p uploads/profile uploads/products uploads/payment uploads/videos

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose the port
EXPOSE 1000

# Run application
CMD ["node", "dist/main"]