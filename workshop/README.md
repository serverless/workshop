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

```text
$ git clone https://www.github.com/serverless/the-serverless-way
```

In `/workshop/template-fullstack/backend/functions` install npm dependencies.

```text
$ npm i
```

In `/workshop/template-fullstack/frontend` install npm dependencies.

```text
$ npm i
```

Build the front-end application.

```text
$ npm run build
```

In `/workshop/template-fullstack/backend/database` run `login`

```text
$ serverless login
```

Login or register for Serverless Framework Enterprise.  Verify your email if you are just signing up for the first time.

Make sure you create a `tenant` and an `app`.

In `/workshop/template-fullstack/backend/database/serverless.yml`, `/workshop/template-fullstack/backend/functions/serverless.yml` & `/workshop/template-fullstack/backend/frontend/serverless.yml` change the following...

```yaml
tenant: mytenant # Put your tenant name here
app: myapp # put your app name here
service: myservice # put your service name here
```

In `/workshop/template-fullstack/backend/frontend/serverless.yml` change the bucket name to be universally unique.

```yaml
custom:
  client:
    bucketName: myWebsiteBucket # put a universally unique bucket name here
```

<br/>

### Deployment

Note: You may need to login twice if you registered for the first time and just verified your email address.

In `/workshop/template-fullstack/backend/database` run `deploy` to deploy the backend database.

```text
$ serverless deploy --stage dev
```

In `/workshop/template-fullstack/backend/functions` run `deploy` to deploy the backend code.

```text
$ serverless deploy --stage dev
```

Copy the URL of the function that is listed after successful deploy.

In `/workshop/template-fullstack/backend/frontend` run `deploy` to deploy the frontend service.

```text
$ serverless deploy --stage dev
```

In `/workshop/template-fullstack/backend/frontend` run `client deploy` to deploy the website via the [Serverless Finch Plugin](https://github.com/fernando-mc/serverless-finch)

```text
$ serverless client deploy
```

Go to the link, click on `Demo Utilities` and add the API URL in the side panel.

Enter some information into the submission form.  Review the Developer Tools and inspect the Network request.

Check out the Serverless Framework Enterprise Dashboard to see the invocation.

<br/>

### Development

In `/workshop/template-fullstack/backend/functions`, check to see what has been deployed.

```text
$ sls info
```

You can also see this information in the Serverless Framework Enterprise Dashboard.

In `/workshop/template-fullstack/backend/functions`, invoke the live function.

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff","email":"jeff@lebowski"}}'
```

In `/workshop/template-fullstack/backend/functions`, invoke the function locally.

```text
$ sls invoke local -f formSubmit --data '{"body":{"name":"jeff","email":"jeff@lebowski"}}'
```











<br/>

## Development Cheatsheet

```text
$ sls info
```

Get information about the current deployment.

```text
$ sls invoke local -f formSubmit --data '{"body":{"name":"jeff","email":"jeff@lebowski"}}'
```

Call the function locally.

```text
$ sls deploy
```

Trigger a CloudFormation Create/Update to deploy all infrastructure in `serverless.yml`

```text
$ sls deploy function -f formSubmit
```

Deploy a single function without triggering a CloudFormation deployment.  This is much faster.

```text
$ sls logs -f formSubmit -t
```

Stream logs for the specific function into your terminal.

```text
$ sls deploy list
```

List recent deployments.  Timestamps are used to identify them.

```text
$ sls rollback -t 1476790110568
```

Roll back to a previous deployment by specifying a timestamp found by first running `sls deploy list`.  This triggers a CloudFormation update to that CloudFormation state, which is automatically saved by the Serverless Framework.
