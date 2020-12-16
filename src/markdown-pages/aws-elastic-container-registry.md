---
slug: "/aws-elastic-container-registry-repo"
date: "2020-12-17"
title: "How to set up a private repo for your docker image in AWS Elastic Container Registry"
excerpt: "This article will walk you through how to get your application up and running as a Fargate task in the AWS Elastic Container Service using nothing but code."
listed: false
---

I often prefer the docker hub registry over AWS's dito. But the **Elastic Container Registry** comes in quite handy when automating deploy pipelines using the AWS CDK.

Luckily, it's straightforward enough to use – despite AWS's infamously clunky UI.

Just head to Elastic Container Registry in your AWS console and click `Create repository`. Most of the time, you would want to keep it private, but if you don't care, you might as well change it to public. Give it a name, and then click "Create repository" at the bottom of the page.

Great! Now you have your very own repo in the list.

It is still empty and useless, but if you click into the repo and then hit the "View push commands" button, you will get a few copy/pastable commands. Run them all to push your Docker image to the repo.

That is pretty much all there is to it.

Now you are ready to put your image to work in a Fargate task in the Elastic Container Service. [Learn how to set it up using](/fargate-on-aws-ecs-using-cdk) the AWS CDK infrastructure-as-code framework.


