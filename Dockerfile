# Multi-stage build for frontend and backend
FROM node:18-alpine AS frontend-builder

# Create app group and user
RUN addgroup app && adduser -S -G app app

# Set the working directory
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Backend stage
FROM node:18-alpine AS backend-builder

# Install system dependencies for Python
RUN apk add --no-cache \
    build-base \
    python3 \
    python3-dev \
    py3-pip \
    gfortran \
    musl-dev \
    linux-headers

# Create app group and user
RUN addgroup app && adduser -S -G app app

# Set the working directory
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./
RUN python3 -m venv /venv \
    && . /venv/bin/activate \
    && pip install --no-cache-dir -r requirements.txt
ENV PATH="/venv/bin:$PATH"

# Copy backend source code
COPY backend/ .

# Final stage
FROM node:18-alpine

# Install Python runtime
RUN apk add --no-cache python3

# Create app group and user
RUN addgroup app && adduser -S -G app app

# Set the working directory
WORKDIR /app

# Copy built frontend from frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Copy backend from backend-builder stage
COPY --from=backend-builder /app/backend ./backend

# Copy Python venv from backend-builder stage
COPY --from=backend-builder /venv /venv
ENV PATH="/venv/bin:$PATH"

# Change ownership to app user
RUN chown -R app:app /app

# Switch to app user
USER app

# Expose the port
EXPOSE 3000

# Start the backend server (which will also serve frontend)
WORKDIR /app/backend
CMD ["npm", "start"]
