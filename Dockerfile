# Build stage
FROM node:18.17.1-alpine AS build

WORKDIR /app

# Copy package.json and yarn.lock (if exists)
COPY package.json yarn.lock* ./

# Install ALL dependencies (including devDependencies)
RUN yarn install

# Copy source code
COPY . .

# Debug - show files before build
RUN echo "Files before build:" && ls -la

# Run build
RUN yarn build

# Debug - show files after build
RUN echo "Files after build:" && ls -la && echo "Contents of dist:" && ls -la dist/ || echo "dist directory not found!"

# Production stage
FROM node:18.17.1-alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install ONLY production dependencies
RUN yarn install --production

# Copy built application
COPY --from=build /app/dist ./dist

# Create upload directories
RUN mkdir -p uploads/profile uploads/products uploads/payment uploads/videos

# Debug - show files in production image
RUN echo "Files in production image:" && ls -la && echo "Contents of dist:" && ls -la dist/ || echo "dist directory not found!"

# Set environment variables
ENV NODE_ENV=production

EXPOSE 1000

# Use the same command as in package.json
CMD ["node", "dist/main"]