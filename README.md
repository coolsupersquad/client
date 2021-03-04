# Recover Together
Please visit https://devpost.com/software/storm-recovery for up-to-date information.

Streamlines the recovery process for climate disasters. HackUTD Best Use of Google Cloud. (MongoDB/Express.js/React.js, Firebase Auth, Maps, Cloud Compute Engine deployment)

## Run with Docker

After cloning the repositories, go to parent folder and create the docker-compose file,

```yaml
version: '3'
services:
  app:
    build: ./client
    container_name: rtclient
    ports:
      - "3000:3000"
    privileged: true
  server:
    build: ./server
    container_name: rtserver
    ports:
      - "8000:8000"
```

Then run `docker compose up --build --remove-orphans`. The app is available at localhost:3000.

## Run with Kubernetes

We can also deploy our containers to a cluster and use kubectl to interact with our cluster. In short, our docker-compse.yaml is translated into a kubectl compatible file.

Use minikube:
```
minikube stop --all
minikube delete --all
minikube start --driver=kvm2 --cpus=4 --memory=4000
eval $(minikube docker-env) # exposes local registry
```

Use kompose to build and apply:
```
curl -L https://github.com/kubernetes/kompose/releases/latest/download/kompose-linux-amd64 -o kompose
chmod +x kompose
./kompose convert --out kubectl-kompose.yaml --build local
kubectl apply -f kubectl-kompose.yaml
kubectl get pods            # services should be Running
```

You can use a similar approach to deploy on Google Kubernetes Engine.
