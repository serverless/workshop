# The Serverless Way - Workshop

<br/>

## Prerequisites

These are the items you will need for the Workshop.

* **Amazon Web Services Accounts –** Each developer must have their own AWS account which they can freely deploy into and treat as a general sandbox.  Sharing accounts can and most often will result in collision of infrastructure resource names as well as API throttle limits on provisioning of infrastructure resources.  Every workshop we've ever done where the participants shared accounts has resulted in those problems mentioned, so please ensure your developers can have their own accounts, so we can focus our time on building and operating serverless applications.  (Keep in mind these developer accounts are for sandbox use only. In the workshop, we will discuss how to control and govern access to the AWS accounts that run your mission critical infrastructure and environments.)  Sign up for an AWS account here: https://aws.amazon.com/

* **Node.js** – Each developer must have the current LTS version of Node.js installed on their machine. You can find it here:  https://nodejs.org/en/download/

* **Serverless Framework** – Each developer must have the current LTS version of Node.js installed on their machine. You can learn how to install the Serverless Framework here:  https://serverless.com/framework/docs/providers/aws/guide/installation/

* **Amazon Web Services Account Credentials** – Each developer must have Access Keys to their own AWS account with Admin Access.  These Access Keys must be saved on the developer's machine.  The Serverless Framework will use these to provision resources on the account.  You can learn how to create these Access Keys here: https://serverless.com/framework/docs/providers/aws/guide/credentials/

<br/>

## Hands-On: Fullstack – Setup

Clone `the-serverless-way` repository

```text
$ git clone https://www.github.com/serverless/the-serverless-way
```

---

In `/workshop/template-fullstack/backend/functions` install npm dependencies.

```text
$ npm i
```
---

In `/workshop/template-fullstack/frontend` install npm dependencies.

```text
$ npm i
```
---

Build the front-end application.

```text
$ npm run build
```
---

In `/workshop/template-fullstack/backend/frontend` run `login`

```text
$ serverless login
```

Login or register for Serverless Framework Enterprise.  Verify your email if you are just signing up for the first time.

Make sure you create a `tenant` and an `app`.

---

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

## Hands-On: Fullstack – Deployment

Note: You may need to login twice if you registered for the first time and just verified your email address.

In `/workshop/template-fullstack/backend/database` run `deploy` to deploy the backend database.

```text
$ serverless deploy --stage dev
```
---

In `/workshop/template-fullstack/backend/functions` run `deploy` to deploy the backend code.

```text
$ serverless deploy --stage dev
```

Copy the URL of the function that is listed after successful deploy.

---

In `/workshop/template-fullstack/backend/frontend` run `deploy` to deploy the frontend service to Serverless Framework Enterprise.

```text
$ serverless deploy --stage dev
```

---

In `/workshop/template-fullstack/backend/frontend` run `client deploy` to deploy the website via the [Serverless Finch Plugin](https://github.com/fernando-mc/serverless-finch)

```text
$ serverless client deploy
```

Go to the link, click on `Demo Utilities` and add the API URL in the side panel.

Enter some information into the submission form.  Review the Developer Tools and inspect the Network request.

Check out the Serverless Framework Enterprise Dashboard to see the invocation.

<br/>

## Hands-On: Fullstack – Development

In `/workshop/template-fullstack/backend/functions`, check to see what has been deployed.

```text
$ sls info
```

You can also see this information in the Serverless Framework Enterprise Dashboard.

---

In `/workshop/template-fullstack/backend/functions`, invoke the live function.

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff","email":"jeff@lebowski"}}'
```

(You can check the DynamoDB table to see if this was saved in the AWS Dashboard)

---

In `/workshop/template-fullstack/backend/functions`, invoke the function locally.

```text
$ sls invoke local -f formSubmit --data '{"body":{"name":"jeff2","email":"jeff@lebowski2"}}'
```

(You can check the DynamoDB table to see if this was saved in the AWS Dashboard)

---

In `/workshop/template-fullstack/backend/functions`, add a log statement to the beginning of your function.

```javascript
console.log('hello world')
```

Then run this command to deploy only your function and not trigger a CloudFormation update.  This is a much faster way to deploy.

```text
$ sls deploy function -f formSubmit
```

---

In `/workshop/template-fullstack/backend/functions`, invoke the live function, but also pass in the logs flag.

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff3","email":"jeff@lebowski3"}}' -l
```

You should see the logs from Cloudwatch come with the response.

---

In `/workshop/template-fullstack/backend/functions`, open up a new CLI session and run this command to stream logs into your CLI.

```text
$ sls logs -f formSubmit -t
```

Call the function again to see logs stream in:

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff4","email":"jeff@lebowski4"}}' -l
```

The logs should stream in.

---

In `/workshop/template-fullstack/backend/functions`, remove the log statement and run a full deploy again.

```text
$ sls deploy --force
```

(Use `--force` in case it tries to skip deployment because it hasn't detected a change.)

---

In `/workshop/template-fullstack/backend/functions`, list recent deployments.

```text
$ sls deploy list
```

Timestamps are used to identify deployments.  The Framework saves old CloudFormation templates for you.  You can use them to rollback.  This is great if you get into trouble.

```text
$ sls rollback -t 1476790110568
```

<br/>

## Hands-On: Fullstack – Stages

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], create a `dev`, `qa` and `prod` Stage in your Application.

---

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], create a Profile for development called `profile-dev` and associate it with your Application's `dev` stage.

---

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], go to your Profile for development called `profile-dev` and create a Secret called `foo`.

In `/workshop/template-fullstack/backend/functions`, put the Secret in the environment variables of the `formSubmit` functions, like this:

```yaml
provider:
  name: aws
  runtime: nodejs8.10
  region: us-east-1
  environment:
    foo: ${secret:foo}
```

This changes across stages automatically.

---

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], go to your Profile for development called `profile-dev` and add a Safeguard for `allowed-regions`

In `/workshop/template-fullstack/backend/functions`, run a full deployment and look at the Safegaurds outputs.

<br/>

## Hands-On: Fullstack – Testing

In `/workshop/template-fullstack/backend/functions`, run the test command.

```text
$ sls test
```

This uses `serverless.test.yml` to test the live cloud deployment and should return a successful response.

---

Here is what a common coniguration of Serverless Framework looks like in CI/CD.  Source is here:  (CI/CD Workflow For Serverless Apps with CircleCI)[https://serverless.com/blog/ci-cd-workflow-serverless-apps-with-circleci/]

```yaml
jobs:
  build:
    ...

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
            - dependencies-cache-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - dependencies-cache

      - run:
          name: Install Serverless CLI and dependencies
          command: |
            sudo npm i -g serverless
            npm install

      - run:
          name: Run tests with code coverage
          command: npm test --coverage

      - run:
          name: Deploy application
          command: sls deploy -v --stage qa # Add stage and -v flag to show CloudFormation activity

      - run:
          name: Deploy application
          command: sls test

      - save_cache:
          paths:
            - node_modules
          key: dependencies-cache-{{ checksum "package.json" }}
```
