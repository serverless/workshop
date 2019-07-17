# The Serverless Way - Workshop

This guide is for *building*, *testing* and *monitoring* a fullstack application using the Serverless Framework and Serverless Framework Enterprise.  

**UPDATE 07/12/19:**  In July 2019, all of the features of Serverless Framework Enterprise (monitoring, testing, security) will be made available to every Serverless Framework user, within a large free tier.  All of these features will become part of the default Serverless Framework experience, and made available to every user.  In the interim, everyone can now sign up for Serverless Framework Enterprise and use it for free, just follow the instructions included in the workshop below.

## Prerequisites

These are the items you will need for the Workshop.

* **Amazon Web Services Accounts –** Each developer must have their own AWS account which they can freely deploy into and treat as a general sandbox.  Sharing accounts can and most often will result in collision of infrastructure resource names as well as API throttle limits on provisioning of infrastructure resources.  Every workshop we've ever done where the participants shared accounts has resulted in those problems mentioned, so please ensure your developers can have their own accounts, so we can focus our time on building and operating serverless applications.  (Keep in mind these developer accounts are for sandbox use only. In the workshop, we will discuss how to control and govern access to the AWS accounts that run your mission critical infrastructure and environments.)  Sign up for an AWS account here: https://aws.amazon.com/

* **Node.js** – Each developer must have the current LTS version of Node.js installed on their machine. You can find it here:  https://nodejs.org/en/download/

* **Serverless Framework** – Each developer must have the current LTS version of Node.js installed on their machine. You can learn how to install the Serverless Framework here:  https://serverless.com/framework/docs/providers/aws/guide/installation/

* **Amazon Web Services Account Credentials** – Each developer must have Access Keys to their own AWS account with Admin Access.  These Access Keys must be saved on the developer's machine.  The Serverless Framework will use these to provision resources on the account.  You can learn how to create these Access Keys here: https://serverless.com/framework/docs/providers/aws/guide/credentials/

<br/>

## Hands-On: Setup

## Note: You will perform the setup and follow the workshop instructions in your Cloud9 environment

The first part of getting set up is to log into Serverless Framework Enterprise, enabling automatic set-up of Metrics, Alerts, Testing and much more, for free.

1. Open **https://dashboard.serverless.com** in your browser
2. Choose to Log In with GitHub or Google, or Sign Up using an email address.  Verify your email if you are just signing up for the first time.  Note: You may need to login twice if you are registering and verifying your email address.  We give a lot away for free, so we need to make sure you are a real human :)
3. Choose a username
4. Select the default app name `myapp` or choose your own.  **Note: this is the `app` value used in the workshop**

---

Once logged into Serverless Dashboard:

1. Your **tenant** is listed in the upper right corner of the browser.  **Note: this is the `tenant` value used in the workshop**
2. Click your tenant name in the upper right corner of the browser, and click **personal access keys**
3. Click the **add** button
4. Type `July17` as the key name, and click the **create** button
5. Copy your personal access key to be used in the workshop.  This is the only time it will be visible, but if you lose it, you can create another key using the same process.
6. Click the **done** button

---

In your Cloud9 Environment:

1. Open a terminal window
2. Save your personal access key in the **SERVERLESS_ACCESS_KEY** environment variable, replacing YOUR_KEY with the value you copied in the previous step.

    ```text
    $ echo "export SERVERLESS_ACCESS_KEY=YOUR_KEY" >> ~/.bashrc && source ~/.bashrc
    ```
3. Keep the terminal window open to complete the workshop

---

Clone `the-serverless-way` repository

```text
$ git clone https://www.github.com/serverless/the-serverless-way
```
---

There are three Services (a "Service" is a Serverless Framework project), containing functions, a database and a front-end React application.  You must `cd` into each and install the NPM dependencies.

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

The front-end application is a React application.  Run `npm run build` to build the front-end application.

```text
$ npm run build
```
---

In `/workshop/template-fullstack/backend/database/serverless.yml`, `/workshop/template-fullstack/backend/functions/serverless.yml` & `/workshop/template-fullstack/frontend/serverless.yml` change the following...

```yaml
tenant: mytenant # Put your Tenant name here from your Serverless Framework Enterprise account.
app: myapp # put your App name here from your Serverless Framework Enterprise account.
service: myservice # Customize your Service name
```

In `/workshop/template-fullstack/frontend/serverless.yml` change the bucket name to be universally unique, since all AWS S3 buckets must have unique names.

```yaml
custom:
  client:
    bucketName: myWebsiteBucket # put a universally unique bucket name here
```

<br/>

## Hands-On: Deployment

In `/workshop/template-fullstack/backend/database` run `deploy` to deploy the backend database.

```text
$ serverless deploy
```
---

In `/workshop/template-fullstack/backend/functions` run `deploy` to deploy the backend code.

```text
$ serverless deploy
```

Copy the URL of the function that is listed after successful deploy.

---

In `/workshop/template-fullstack/frontend` run `deploy` to deploy the frontend service to Serverless Framework Enterprise.

```text
$ serverless deploy
```

---

In `/workshop/template-fullstack/frontend` run `client deploy` to deploy the website via the [Serverless Finch Plugin](https://github.com/fernando-mc/serverless-finch).   Make sure you ran the build command first, in the step above.

```text
$ serverless client deploy
```

After you deploy the front-end, go to the live website URL which is returned to you after you deploy with `serverless-finch`, click on `Demo Utilities` and add the API URL in the side panel.  This is given to you after successful deploy of the `/functions` Service.  Run `serverless info` in the `/functions` Service to see your API endpoint at any time.

Test the application by entering some information into the submission form.  Review the Developer Tools and inspect the Network request.

Check out the Serverless Framework Enterprise Dashboard to see the invocation.  The Dashboard link should appear in your `/functions` Service after deployment.  Or, just go to [https://dashboard.serverless.com](https://dashboard.serverless.com)

<br/>

## Hands-On: Development

Here are some handy ways to develop and test your Serverless Application.

In `/workshop/template-fullstack/backend/functions`, invoke the live function via this command:

```text
$ sls invoke -f formSubmit --data '{"body":{"name":"jeff","email":"jeff@lebowski"}}'
```

(You can check the DynamoDB table to see if this was saved in the AWS Dashboard)

---

In `/workshop/template-fullstack/backend/functions`, invoke the function locally:

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

## Hands-On: Stage Set-up

Within Serverless Framework Enterprise, you can set Stages for each Application, which all of its Services can use.

In each Stage, you can set Secrets (sensitive information, like keys), Safeguards (policies) and Notification settings for all Services.

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
    foo: ${secrets:foo}
```

This changes across stages automatically.  Deploy this.

View the deployment record in Serverless Framework Enterprise.

---

In (https://dashboard.serverless.com)[https://dashboard.serverless.com], go to your Profile for development called `profile-dev` and add a Safeguard for `allowed-regions`

In `/workshop/template-fullstack/backend/functions`, run a full deployment and look at the Safegaurds outputs.

<br/>

## Hands-On: Testing

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

<br/>

## Follow Along: Operations

In the frontend website, click on `Demo Utilities` on the top right and click the button to generate a few function errors.  Also enter `1000` API Requests.

In your Serverless Framework Enterprise Dashboard, you will begin to see Metrics, Alerts, Notifications and more in real-time, for each of your Services.

