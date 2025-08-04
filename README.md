# My Kubernetes Multi-Tier App

This sample project demonstrates deploying a Node.js application (service API) and a MongoDB instance on a GKE cluster using Kubernetes manifests. Images are pulled from Docker Hub (service API image) and the official MongoDB image.

## Prerequisites

- GCP account with a project configured
- `gcloud` CLI installed and authenticated
- Docker installed
- Kubernetes CLI (`kubectl`) installed

## Deployment Steps

1. **Build and Push the Image**

   In the `service-api` folder, build your Docker image and push it to Docker Hub:
   ```bash
   cd service-api
   docker build -t yourdockerhubusername/service-api .
   docker push yourdockerhubusername/service-api