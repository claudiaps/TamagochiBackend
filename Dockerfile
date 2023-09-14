FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install
RUN npm run build
RUN npx prisma migrate deploy

# Define the entry point for the container
CMD ["npm", "start"]