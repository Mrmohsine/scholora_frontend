FROM node:20-alpine

# Install dependencies for better compatibility
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create directories with correct permissions
RUN mkdir -p .next && chown -R node:node .next
RUN mkdir -p node_modules/.cache && chown -R node:node node_modules/.cache

# Switch to non-root user for security
USER node

# Expose Next.js port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
# Will run 'npm run dev' by default, can be overridden
CMD ["npm", "run", "dev"]