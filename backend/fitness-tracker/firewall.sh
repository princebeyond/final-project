# Allow HTTP traffic on port 80
sudo ufw allow 80/tcp

# Allow HTTPS traffic on port 443 (if needed for SSL)
sudo ufw allow 443/tcp

# Allow traffic on port 8000 for Gunicorn
sudo ufw allow 8000/tcp

# Allow SSH traffic on port 22 (if you need to access your server remotely)
sudo ufw allow 22/tcp

