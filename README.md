# Node.js + MongoDB Kubernetes Application

This project is a **multi-tier web application** consisting of a Node.js Express API and a MongoDB database, deployed using **Kubernetes** on **Google Cloud Platform (GCP)**.

## Project Structure

```
.
├── k8s/
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── mongo-pvc.yaml
│   ├── api-deployment.yaml
│   ├── api-service.yaml
│   ├── api-ingress.yaml
│   └── api-configmap.yaml
├── service-api/
│   ├── index.js
│   ├── routes/
│   ├── models/
│   └── db.js
└── README.md
```


## Tech Stack

- **Node.js** + **Express** – API layer
- **MongoDB** – NoSQL database
- **Kubernetes** – Orchestration
- **Docker** – Containerization
- **Ingress** – Exposing services via hostname
- **GCP** – Deployment environment (GKE + Cloud Shell)


## Deployment Steps

### 1. Build & Push Docker Images

```bash
# From project root
cd service-api
docker build -t <your-dockerhub-username>/node-service-api .
docker push <your-dockerhub-username>/node-service-api
```


### 2. Connect to GCP Cluster

```bash
# In Cloud Shell
gcloud container clusters get-credentials <your-cluster-name> --zone <your-zone>
```


### 3. Apply Kubernetes YAMLs

```bash
kubectl apply -f k8s/mongo-configmap.yaml
kubectl apply -f k8s/mongo-secret.yaml
kubectl apply -f k8s/mongo-pvc.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml

kubectl apply -f k8s/api-configmap.yaml
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/api-service.yaml
kubectl apply -f k8s/ingress.yaml
```


### 4. Test the Application

Add this line to your `/etc/hosts` file (for local testing):

```
<EXTERNAL-IP> nodeapp.local
```

Then test the API:

```bash
curl -H "Host: nodeapp.local" http://<EXTERNAL-IP>/users
```

---

## MongoDB Authentication

If your MongoDB has authentication enabled:
- Create the user inside the container.
- Use the URI format with credentials in your `ConfigMap`:

```yaml
mongo-uri: mongodb://<username>:<password>@mongo-service:27017/nagp?authSource=admin
```

---

## Cleanup

```bash
kubectl delete -f k8s/
```

---

## Author
Built by Karan Bhatia for NAGP GCP Assignment – 2025