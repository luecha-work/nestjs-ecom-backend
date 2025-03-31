# Build stage
FROM node:18.17.1-alpine AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install dependencies
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

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

# Copy built application
COPY --from=build /app/dist ./dist

# Create upload directories
RUN mkdir -p uploads/profile uploads/products uploads/payment uploads/videos

# Environment variables
ENV NODE_ENV=production

EXPOSE 1000

# ใช้ start:prod แทน - ตามที่ระบุในไฟล์ package.json
CMD ["yarn", "start:prod"]