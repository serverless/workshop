# The Serverless Way - Workshop

<br/>

## Prerequisites

These are the items you will need for the Workshop.

* **Amazon Web Services Accounts –** Each developer must have their own AWS account which they can freely deploy into and treat as a general sandbox.  Sharing accounts can and most often will result in collision of infrastructure resource names as well as API throttle limits on provisioning of infrastructure resources.  Every workshop we've ever done where the participants shared accounts has resulted in those problems mentioned, so please ensure your developers can have their own accounts, so we can focus our time on building and operating serverless applications.  (Keep in mind these developer accounts are for sandbox use only. In the workshop, we will discuss how to control and govern access to the AWS accounts that run your mission critical infrastructure and environments.)  Sign up for an AWS account here: https://aws.amazon.com/

* **Node.js** – Each developer must have the current LTS version of Node.js installed on their machine. You can find it here:  https://nodejs.org/en/download/

* **Serverless Framework** – Each developer must have the current LTS version of Node.js installed on their machine. You can learn how to install the Serverless Framework here:  https://serverless.com/framework/docs/providers/aws/guide/installation/

* **Amazon Web Services Account Credentials** – Each developer must have Access Keys to their own AWS account with Admin Access.  These Access Keys must be saved on the developer's machine.  The Serverless Framework will use these to provision resources on the account.  You can learn how to create these Access Keys here: https://serverless.com/framework/docs/providers/aws/guide/credentials/

<br/>

## Hands-On: Fullstack

### Setup

Clone `the-serverless-way` repository

```bash
$ git clone https://www.github.com/serverless/the-serverless-way
```

In `/workshop/template-fullstack/backend` install npm dependencies

```bash
$ npm i
```

In `/workshop/template-fullstack/frontend` install npm dependencies

```bash
$ npm i
```

Then build the front-end application

```bash
$ npm run build
```

In `/workshop/template-fullstack/backend/` run `login`

```bash
$ serverless login
```

Verify your email if you are just signing up for the first time.

In `/workshop/template-fullstack/backend/serverless.yml` change the following

```yaml
tenant: mytenant # Put your tenant name here
app: myapp # put your app name here
service: myservice # put your service name here

custom:
  client:
    bucketName: myWebsiteBucket # put a universally unique bucket name here
```

### Deployment

You may need to login twice if you are registering for the first time.

In `/workshop/template-fullstack/backend/` run `deploy` to deploy the backend

```bash
$ serverless deploy
```

Copy the backend URL

In `/workshop/template-fullstack/backend/` run `client deploy` to deploy the frontend via the [Serverless Finch Plugin](https://github.com/fernando-mc/serverless-finch)

```bash
$ serverless client deploy
```
Go to the link, click on `Demo Utilities` and add the API URL in the side panel.

### Use

<br/>

## Development Cheatsheet

```bash
$ sls info
```

Get information about the current deployment.

```
$ sls invoke local -f formSubmit
```

Call the function locally.

```bash
$ sls deploy
```

Trigger a CloudFormation Create/Update to deploy all infrastructure in `serverless.yml`

```console
$ sls deploy function -f formSubmit --data '{"name":"jeff","email":"jeff@lebowski"}'
```

Deploy a single function without triggering a CloudFormation deployment.  This is much faster.





