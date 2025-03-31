# Build stage
FROM node:18.17.1-alpine AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install ALL dependencies
RUN yarn install

# Copy source code
COPY . .

# Run build
RUN yarn build

# Production stage
FROM node:18.17.1-alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install ONLY production dependencies
RUN yarn install --production

# Copy built application
COPY --from=build /app/dist ./dist

# Copy configuration files
COPY tambons.json ./tambons.json
COPY .env ./.env

# Create upload directories
RUN mkdir -p uploads/profile uploads/products uploads/payment uploads/videos

# Set environment variables
ENV NODE_ENV=production

EXPOSE 1000

# แก้ไขตรงนี้ - ใช้ dist/src/main.js แทน dist/main
CMD ["node", "dist/src/main.js"]