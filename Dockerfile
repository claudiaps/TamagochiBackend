FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install
RUN npm run build
RUN npx prisma generate              # Generate Prisma Client to fix the error
RUN DATABASE_URL="file:./data.db" npx prisma migrate deploy   # Provide an empty DATABASE_URL environment variable
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]