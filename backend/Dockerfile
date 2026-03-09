FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir requests groq

# Copy the rest of the backend code
COPY . .

# Ensure data directory exists and has correct permissions
RUN mkdir -p /app/data && chmod 777 /app/data

# Expose the API port
EXPOSE 8000

# Run FastAPI via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
