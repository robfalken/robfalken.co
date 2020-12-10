---
slug: "/fargate-on-aws-ecs-using-cdk"
date: "2020-12-07"
title: "Set up Fargate on AWS ECS using the CDK"
excerpt: "This article will walk you through how to get your application up and running as a Fargate task in the AWS Elastic Container Service using nothing but code."
---

Since you found your way to this post, I suspect you are already familiar with AWS, Elastic Container Service (ECS), Fargate, and possibly also the AWS Cloud Development Kit (CDK). But I will introduce them briefly.

ECS is a container orchestration service. So if you have a container, you can quickly deploy it to ECS. You can run your containers the old school way on EC2 instances or as Fargate tasks. Fargate is described as a serverless compute engine for containers. But it's not serverless in the hipster, "let's just get all of these lambdas to work together" way. You can certainly run your server on Fargate. That way, you can focus on your application instead of having to provision and manage servers all day long. Lastly, CDK is a development framework to set up your infrastructure as code. Actual code, not YAML configure files or any such nonsense. It is awesome. And it supports TypeScript, Python, Java, or C# and Javascript.

Okay, let's get to it!

If you haven't done so already, you will have to install the CDK, which you can quickly achieve using npm (or yarn).

`npm install -g aws-cdk`

As soon as you have the CDK installed on your machine, you can initialize a new project. I will call mine robfalken.

```bash
mkdir robfalken
cd robfalken
cdk init --language typescript
```

As you can tell, this guide will assume you prefer to use TypeScript. But you could use any of the supported languages.

The CDK will also pick up the name of the folder you are initializing the project in, so make sure it makes sense!

You could deploy your stack already. It wouldn't do much yet, so we will skip to the next part. But if you are curious or just want to make sure everything is working so far, the command looks like this.

`cdk deploy`

If you do, you can head to the CloudFormation service in the AWS management console, where you should see your newly created stack.

Next, we want to set up a VPC where all our services can live and then launch an ECS cluster in our brand new VPC.

To do so, we need to first install the constructs in our project. Don't worry; they are all available as node modules, so it is as easy as running an npm install command.

`npm i @aws-cdk/aws-ec2 @aws-cdk/aws-ecs`

One caveat is that you always want to have all of your CDK construct libraries using the same version. If you mix versions, you are likely to run into a whole bunch of incompatibility errors.

Now, it is finally time to write some code. I mean, it is supposed to be infrastructure as code, after all!

Bring up your editor of choice and open up the file that holds your stack.

`lib/robfalken-stack.ts`

Whenever you want to create some AWS resources, it is as easy as instantiating the construct of the service you wish to use and then passing in some configuration options. So to set up a VPC and an ECS cluster that would be something like this.

```ts
import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import { ApplicationStack } from "./application-stack";

export class RobfalkenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "VPC", {
      cidr: "10.0.0.0/24",
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, "ECSCluster", {
      vpc,
    });
  }
}
```

First, we create the VPC where we are going to put all of our resources. We will need to store it as a variable because we will pass it in as a reference into other constructs as we advance. We are also passing along some configurations. The `cidr` property sets the IP range for our subnets in this network. I won't go into more detail on this, but you can read up on CIDR blocks and networking if you are interested in further reading. We also set the max number of availability zones to two. You can, of course, set it to a higher number. But if you want to set up a load balancer, you will need at least two AZs.

Now, if you run `cdk deploy`, you will soon see your very own Elastic Container Service (ECS) cluster up and running.

[image]

An ECS cluster, of course, isn't worth a lot without anything running within it, so let's address that now!

First, you will need a dockerized application hosted in the Elastic Container Registry (ECR) for this guide. I will write-up and link to it later, but I will assume that you already have that set up for now.

All right, we need the ECR constructs to fetch the image from the repo, so let's first run `npm i @aws-cdk/aws-ecr`

With that out of the way, create a new file `lib/application-stack.ts`

```ts
import * as cdk from "@aws-cdk/core";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

interface IProps extends cdk.NestedStackProps {
  cluster: ecs.Cluster;
}

export class ApplicationStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props: IProps) {
    super(scope, id, props);

    const { cluster } = props;

    const repo = ecr.Repository.fromRepositoryName(
      this,
      "Repository",
      "dummy-service"
    );

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "FargateService",
      {
        cluster,
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(repo),
          containerPort: 3000,
        },
      }
    );
  }
}
```

Here we are creating a nested stack that will be nested under our "root" stack. We need access to the ECS cluster because we will put our service into it, so we're accepting the cluster as a property.

We then reference our application repository in ECR, which is basically all we need to set up a load-balanced Fargate service. Of course, we need to tell it which port our container is running on. Otherwise, it wouldn't know where to route our traffic. We also want the load balancer to be public, so we pass that option in as well. That's it!

We are cheating a little bit here, using the `ecs_patterns` module that provides a set of (very) high-level constructs for common use cases. I mean, it is provided by AWS, so I suppose it is okay. But personally, I find the ECS patterns more useful for diving into and learning from than they are to use. They are often a bit constraining, hiding away a lot of the logic and configuration. So putting together your infrastructure "by hand" offers more control and flexibility.

For our very simple example here, it's perfect to use the ECS patterns. It allows us to get up and running with very little code. One of the downsides here is that we can not re-use our load balancer if we add more services. We would have to create one load balancer per service, which is totally unnecessary, especially since they come with a relatively hefty price tag. I will cover how to set up your own, re-usable, load balancer with custom DNS records, and HTTPS listener in a later article. Stay tuned!

Alright, let's get back on topic.

Now that you have built a stack for your application, you need to instantiate it from your base stack, so let's go back to `lib/robfalken-stack.ts` and add a tiny piece of code to it.

```ts
import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import { ApplicationStack } from "./application-stack";

export class RobfalkenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "VPC", {
      cidr: "10.0.0.0/24",
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, "ECSCluster", {
      vpc,
    });

    // This part is new
    new ApplicationStack(this, "Application", {
      cluster,
    });
  }
}
```

At this point, you will need to bootstrap your stack. Luckily, that's just one command. Bootstrapping sets up an S3 bucket for access policies and other necessary assets to support your stack. If you are curious, you can read up on the details here https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html

Here is how you do it.

`cdk bootstrap aws://ACCOUNT_NUMBER/REGION`

With your stack all bootstrapped, you are ready to deploy your infrastructure.

`cdk deploy`

And then you wait. And wait. Working with the CDK, you will get used to waiting. Or find ways to cope, like watching videos of silly dogs on Youtube.

Oh, it finished! That means your application is now live and accepting traffic. To figure out the URL, head to the EC2 service in your AWS account and then to the load balancers section. There you have the DNS name that you can copy and paste into your address bar.

That's it for this guide. I hope this article helped you get started and see that the AWS CDK is a pretty straightforward tool. Next time I will dig deeper into the subject and hopefully get a little closer to a realistic, production-ready example.

Some topics I hope to cover in this CDK series are

* Re-usable, HTTPS-enabled load balancer with custom DNS
* How to set up a CI pipeline
* Scheduling Lambda (or Fargate) tasks
* Some tips that will save you migraines
