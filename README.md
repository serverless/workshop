# Serverless Framework - Workshop

This includes a full-stack example application as well as a walkthrough, to help others learn how to *build*, *test* and *monitor* apps with the Serverless Framework.

You will be building a landing page with an email submission form:

![Example Preview](https://s3.amazonaws.com/assets.github.serverless/workshop/serverless-framework-workshop-example.png)

The landing page also has a Utility Panel, which contains ways to call your API, cause it to behave strangely, or even crash it.  The purpose of this is to fill the [Serverless Framework Dashboard](https://dashboard.serverless.com) with data and alerts, for demonstration purposes:

![Example Preview 2](https://s3.amazonaws.com/assets.github.serverless/workshop/serverless-framework-workshop-example-utils.png)

<br/>

## Prerequisites

These are the items you will need for the Workshop.

* **Amazon Web Services Accounts –** Each developer must have their own AWS account which they can freely deploy into and treat as a general sandbox.  Sharing accounts can and most often will result in collision of infrastructure resource names as well as API throttle limits on provisioning of infrastructure resources.  Every workshop we've ever done where the participants shared accounts has resulted in those problems mentioned, so please ensure your developers can have their own accounts, so we can focus our time on building and operating serverless applications.  (Keep in mind these developer accounts are for sandbox use only. In the workshop, we will discuss how to control and govern access to the AWS accounts that run your mission critical infrastructure and environments.)  Sign up for an AWS account here: https://aws.amazon.com/

* **Amazon Web Services Account Credentials** – Each developer must have Access Keys to their own AWS account with Admin Access.  These Access Keys must be saved on the developer's machine.  The Serverless Framework will use these to provision resources on the account.  You can learn how to create these Access Keys here: https://serverless.com/framework/docs/providers/aws/guide/credentials/

* **Node.js** – Each developer must have the current LTS version of Node.js installed on their machine. You can find it here:  https://nodejs.org/en/download/

* **Serverless Framework** – Each developer must have the current LTS version of Node.js installed on their machine. You can learn how to install the Serverless Framework here:  https://serverless.com/framework/docs/providers/aws/guide/installation/

<br/>

## Setup

Clone this repository

```text
$ git clone https://www.github.com/serverless/workshop
```

In the repository, there are a few folders, each containing part of a serverless fullstack application demo.

The demo use-case is a simple form for collecting and saving email signups.  The demo includes a frontend built with React (via Create React App), a REST API containing 1 endpoint built on AWS Lambda and AWS Cloudfront, a DynamoDB database table, as well as a scheduled task.

The frontend also includes a "Demo Utilities" panel which includes a way to send multiple requests to the backend as well as different buttons that will crash the backend, cause it to timeout, cause it to run for an unusually long duration.  The purpose of these is to fill the Serverless Dashboard with data on invocations and errors, as well as to see how the Framework's auto-alerting features work.

**Note:** The `backend-tasks` directory containing the scheduled task is an optional part.  It contains an AWS Lambda that runs on a function and calls your back-end every 5 minutes, and once a day causes the function to generate different errors and alerts so you can see what they look like in the Serverless Dashboard.

---

In `/backend-restapi` install npm dependencies.

```text
$ npm i
```

---

In `/frontend` install npm dependencies.

```text
$ npm i
```

---

The front-end application is a React application.  Run `npm run build` to build the front-end application so that it's ready to deploy.

```text
$ npm run build
```

The front-end application is a React application.  Run `npm run start` to run the front-end application locally.

```text
$ npm run start
```

---

In `/frontend` run `login`

```text
$ serverless login
```

Login or register for Serverless Framework.  Verify your email if you are just signing up for the first time.

Make sure you create a `tenant` and then an `app`.

---

In `/database/serverless.yml`, `/backend-restapi/serverless.yml` & `/frontend/serverless.yml` change the following...

```yaml
tenant: mytenant # Put your Tenant name here from your Serverless Framework Enterprise account.
app: myapp # put your App name here from your Serverless Framework Enterprise account.
service: myservice # Customize your Service name
```

In `/frontend/serverless.yml` change the bucket name to be universally unique, since all AWS S3 buckets must have unique names.

```yaml
custom:
  client:
    bucketName: myWebsiteBucket # put a universally unique bucket name here
```

<br/>

## Deployment

Note: You may need to login twice if you registered for the first time and just verified your email address.

In `/database` run `deploy` to deploy the backend database.

```text
$ serverless deploy
```

You will need to deploy this first in order for the outputs to be available to `backend-restapi`.
---

In `/backend-api` run `deploy` to deploy the backend code.

```text
$ serverless deploy
```

Copy the URL of the function that is listed after successful deploy.

---

In `/frontend` run `deploy` to deploy the frontend service to Serverless Framework.

```text
$ serverless deploy
```

---

In `/frontend` run `client deploy` to deploy the website via the [Serverless Finch Plugin](https://github.com/fernando-mc/serverless-finch).   Make sure you ran the build command first, in the step above.

```text
$ serverless client deploy
```

After you deploy the front-end, go to the live website URL which is returned to you after you deploy with `serverless-finch`, click on `Demo Utilities` and add the API URL in the side panel.  This is given to you after successful deploy of the `/functions` Service.  Run `serverless info` in the `/functions` Service to see your API endpoint at any time.

---

**See Everything In The Dashboard**

View everything that was just deployed in the dashboard - https://dashboard.serverless.com

Test the application by entering some information into the submission form.  Review the Developer Tools and inspect the Network request.

Check out the Serverless Framework Dashboard to see the invocation.  The Dashboard link should appear in your `/backend-restapi` Service after deployment.  Or, just go to [https://dashboard.serverless.com](https://dashboard.serverless.com)

<br/>

## Development

In `/backend-restapi`, check to see what has been deployed.

```text
$ sls info
```

---

Here are some handy ways to develop and test your Serverless Application.

In `/backend-restapi`, invoke the live function via this command:

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff","email":"jeff@lebowski"}}'
```

---

In `/backend-restapi`, invoke the function locally.

```text
$ sls invoke local -f formSubmit --data '{"body":{"name":"jeff2","email":"jeff@lebowski2"}}'
```

---

In `/backend-restapi`, add a log statement to the beginning of your function.

```javascript
console.log('hello world')
```

Then run this command to deploy only your function and not trigger a CloudFormation update.  This is a much faster way to deploy.

```text
$ sls deploy function -f formSubmit
```

---

In `/backend-restapi`, invoke the live function, but also pass in the logs flag.

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff3","email":"jeff@lebowski3"}}' -l
```

You should see the logs from Cloudwatch come with the response.

---

In `/backend-restapi`, open up a new CLI session and run this command to stream logs into your CLI.

```text
$ sls logs -f formSubmit -t
```

Call the function again to see logs stream in:

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff4","email":"jeff@lebowski4"}}' -l
```

The logs should stream in.

---

In `/backend-restapi`, remove the log statement and run a full deploy again.

```text
$ sls deploy --force
```

(Use `--force` in case it tries to skip deployment because it hasn't detected a change.)

---

In `/backend-restapi`, list recent deployments.

```text
$ sls deploy list
```

Timestamps are used to identify deployments.  The Framework saves old CloudFormation templates for you.  You can use them to rollback.  This is great if you get into trouble.

Alternatively, you can also see recent deployments in the Serverless Dashboard.

```text
$ sls rollback -t 1476790110568
```

<br/>

## Operations

### Deployment Difference

Add `environment` variable `foo:bar` in serverless.yml and redeploy.  Review the change in the deployment record in the dashboard.

See the dashed lines on the charts in the Dashboard indicating deployments.

### Multiple Requests

Use the Demo Utils to send multiple requests.

See them in the Dashboard.

### Charts: Invocations & Errors

Click on the invocations and errors charts

### Alert: Generate A Function Error

### Alert: Approaching Timeout Error

### Alert: Timeout Error

### Alert: Unusual Error Rate

### Invocation Explorer

<br/>

## Stage Setup

### Profile

Within Serverless Framework Enterprise, you can set Stages for each Application, which all of its Services can use.

In each Stage, you can set Secrets (sensitive information, like keys), Safeguards (policies) and Notification settings for all Services.

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], create a `dev`, `qa` and `prod` Stage in your Application.

---

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], create a Profile for development called `profile-dev` and associate it with your Application's `dev` stage.

---

### Secrets

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], go to your Profile for development called `profile-dev` and create a Secret called `foo`.

In `/backend-restapi`, put the Secret in the environment variables of the `formSubmit` functions, like this:

```yaml
provider:
  name: aws
  runtime: nodejs8.10
  region: us-east-1
  environment:
    foo: ${secret:foo}
```

This changes across stages automatically.  Deploy this.

View the deployment record in Serverless Framework.

### Notifications

---

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], go to your Profile for development called `profile-dev` and add a Safeguard for `allowed-regions`

In `/backend-restapi`, run a full deployment and look at the Safegaurds outputs.

---

### Safeguards


# Q&A















<br/>

## Testing

In `/backend-restapi`, run the test command.

```text
$ sls test
```

This uses `serverless.test.yml` to test the live cloud deployment and should return a successful response.

---

Here is what a common configuration of Serverless Framework looks like in CI/CD.  Source is here:  (CI/CD Workflow For Serverless Apps with CircleCI)[https://serverless.com/blog/ci-cd-workflow-serverless-apps-with-circleci/]

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
