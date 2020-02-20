---
title: Hands on Introduction to Docker and Kubernetes
reveal:
    transition: 'fade'
---

## Hands On Intro to
# *Docker* & *Kubernetes*

github.com/imnotjames

<small>

James Ward (he/him) (RC W2'20)

</small>

![avatar](https://secure.gravatar.com/avatar/6cb2f7831e490b4f681dfdc097d15b55?d=identicon&version=1&s=64)

Note:

* What Containers are
* How docker fits into that ecosystem
* How we set up docker for development
* How we can create docker containers
* What contrainer orchestration is
* How Kubernetes fits into that ecosystem
* How we set up Kubernetes for Development and run workloads on it
* What Helm is and how it would be used

This is all high level
Questions?  Stop me to ask them.

---

## Before Containers

* Stateful Deployments
* Puppet / Ansible / Chef / bash
* Virtual Machine Images

Note:

Server that are Pets - Thor, Fester, Jayne Cobb, Skywalker, etc
Interactions between deployments could have undefined behavior
Complexity
Virtual Machines - lots of overhead

---

## Containers

Packaging to create a running process,

with encapsulation features applied keep it isolated from
the host and from other containers.

Note:

Containers have been around for decades - eg, OpenVZ Virtuozzo

---

## Benefits of Containers

* Portability
* Reproducibility
* Isolation

Note:

Portability helps you run your app anywhere - irregardless of the system
you're running on

Isolation is very important for these - state in the host and state in other
Containers won't impact your app

However, the isolation isn't as much as other techniques - intentionally

Containers most often will utilize OS virtualization & isolation features to
share multiple containers safely in one OS - instead of a full VM where the
OS is duplicated

---

## Docker

* Container Tooling
* Abstraction of multiple Virtualization APIs
* Provides a DSL for Container Filesystems

Note:

Filesystem provided by docker image

Virtualization APIs - libcontainer, libvirt, LXC, systemd-nspawn

An image includes everything needed to run an application -- the code or
binary, runtimes, dependencies, and any other filesystem objects required.

Docker is also supported by most of the big cloud providers -
AMZN AWS, GOOG Cloud, MSFT Azure, Heroku, Glitch, more - and the same docker
image can be run across all of them

---

## Let's install
## **Docker for Desktop**

https://docs.docker.com/install/

+++

## Verify Docker is Installed

```shell-session
$ docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
000000000000: Pull complete
Digest: sha256:0000000000000000000000000000000000000000000000000000000000000000
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## Docker Concepts
* Docker Container
* Docker Container Image
* Docker Hub
* Dockerfile

Note:

https://hub.docker.com/_/hello-world

https://github.com/docker-library/hello-world

---

## Docker Registry

Repositories for existing images because Sharing is Fun

https://hub.docker.com/

Note:

Public, official registry is Docker Hub but anyone can run a registry
Sharing is fun.

---

## Creating our Docker Container

A simple `Dockerfile`

```dockerfile
FROM busybox
CMD ["echo", "Hello World"]
```

+++

## Running our Docker Container

<div style="font-size: 0.8em">

```shell-session
$ docker image build --tag my-hello-world . # Build our image
Sending build context to Docker daemon   2.56kB
Step 1/2 : FROM busybox
 ---> 6d5fcfe5ff17
Step 2/2 : CMD ["echo", "Hello World"]
 ---> Using cache
 ---> 913929d7947e
Successfully built 913929d7947e
Successfully tagged my-hello-world:latest

$ docker container run my-hello-world       # Run our app
Hello World
```

</div>

---

## A More Complex Dockerfile

```dockerfile
FROM python:3
LABEL description="The Zen of Python Web Server"
WORKDIR /var/www
ADD https://i.imgur.com/VimNdyE.gif image.gif
RUN echo "<pre>$(python -m this)</pre>"\
         "<img src=image.gif>" > index.html
EXPOSE 8080
CMD ["python", "-m", "http.server", "8080"]
```

+++

## Running our Docker Container

```shell-session
$ docker image build --tag webserver . # Build our image
$ docker container run --name webserver \
$        --publish 8080:8080 --detach webserver  # Start our Server
$ docker container stop webserver      # Clean Up!
```

---

## Container Orchestration
If Containers are for *Packaging*,

Container Orchestration is for *Shipping*

&nbsp;

Tools to coordinate, scale, and maintain containerized applications.

Note:

Coordinating Containerized Apps across a Cluster
App Lifecycle & Deployment Techniques
Automating Scaling of Systems

---

## **Kubernetes** ☸️

* Container Orchestrator initially developed by *Google*
* Heavily influenced by *Borg*
* Written in *Go*

Note:

Kubernetes was started at Google and announced in 2014.  It's an open source
container orechestrator focused on automating application deployment, scaling,
and operations.  It works with many container solutions - including Docker.

Borg is an internal Google cluster manager that runs almost all of Google's
Internal systems.  It was originally started sometime around 2003 or 2004.

While Borg was written in C++, Kubernetes has been written in Go

Paper on Borg: https://pdos.csail.mit.edu/6.824/papers/borg.pdf

After working on Borg, some engineers started Kubernetes with the mission
to bring the concepts of Borg to a wider audience with an easier interface.
Kubernetes original name was even Seven of Nine - one of the more friendly borg.

---

## How does **Kubernetes** work anyway?

* Coordinators: runs `etcd`, controller manager, scheduler, and API server.
* Workers: run workloads assigned by the scheduler.

Note:

Distributed key-value store - highly reliable
Controller manager manages the state of the kubernetes systems - health checks, replication, etc
Scheduler watches for new workloads without assigned workers
API server is what users control kubernetes with

+++

## Kubernetes Concepts

* Manifests define Kubernetes Resources - usually in JSON or YAML
* Nodes are worker machines in a cluster.
* Pods are the basic workload execution unit that can be run.
    * Pods are a group of one or more containers.
    * Pods are mortal and ephemeral.
* Controllers create pods - Jobs, Deployments, etc.
* Services are groupings of pods and how to access them.
* Ingress exposes HTTP / HTTPS routes to Services.

Note:

Scheduler finds which nodes have resources available to run the pods.

---

## High Availability

Assume that Everything will go Wrong

`replicas` key in Deployment to create a `ReplicaSet` 

---

## Let's Enable
## **Kubernetes in Docker**

**OSX**: click Docker in your menu bar and ensure
`Kubernetes is Running` is green.

**Windows**: click Docker in the system tray and navigate
to Kubernetes, and ensure `Kubernetes is Running` is green. 

+++

## Verifying Kubernetes is Running

```shell-session
$ kubectl get nodes
NAME                 STATUS   ROLES    AGE   VERSION
kind-control-plane   Ready    master   15h   v1.17.0
```

---

## Let's create a Simple Kubernetes Deployment

Create `deployment.yaml`

<div style="font-size: 0.5em;">

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zen-of-python
  labels:
    app: zen-of-python
spec:
  selector:
    matchLabels:
      app: zen-of-python
  template:
    metadata:
      labels:
        app: zen-of-python
    spec:
      containers:
      - name: zen-of-python
        image: imnotjames/web-zen-of-python:latest
        ports:
          - containerPort: 8080
```

</div>

+++

## ... And the Service

Create `service.yaml`

<div style="font-size: 0.5em;">

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
  labels:
    app: zen-of-python
spec:
  type: NodePort 
  ports:
  - port: 8080
    targetPort: 8080
  selector:
    app: zen-of-python
```

</div>

+++

## Deploying our Application

```shell-session
$ kubectl apply -f deployment.yaml

$ kubectl apply -f service.yaml
service/web created

$ kubectl port-forward deployment/zen-of-python 8080:8080
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
```

---

## **Helm** Charts

Helm Charts are packages of pre-configured Kubernetes resources.

* Template Manifests
* Install Applications
* Upgrade Applications

---

## Let's Index Tweets about Dogs

![corgi](https://i.imgur.com/B3yGqGf.jpg?4)

+++

## Let's install Elasticsearch and Kibana

```shell-session
$ helm repo add elastic https://helm.elastic.co
$ helm install elasticsearch \
$              elastic/elasticsearch
$ helm install kibana elastic/kibana
$ kubectl port-forward deployment/kibana-kibana 5601
```

+++

## Getting data into Elasticsearch

```shell-session
$ helm repo add rc-tweet-listener \
$       https://notjam.es/recurse-center-tweet-listener
$ helm install rc-tweet-listener \
$       rc-tweet-listener/recurse-center-tweet-listener \
$       --values rctwl.yaml
```

---

# Fin.

+++

<small>(applause)</small>