FROM node:14.16.0-alpine3.13
RUN apk add --no-cache \
    build-base \
    python3 \
    python3-dev \
    py3-pip \
    gfortran \
    libexecinfo-dev \
    musl-dev \
    linux-headers
# RUN addgroup -S app && adduser -S -G app app
# USER app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
