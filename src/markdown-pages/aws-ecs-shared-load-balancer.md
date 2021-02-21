---
slug: "/shared-load-balancer-ecs-services-aws-cdk"
date: "2021-02-21"
title: "Share Elastic Load Balancer between ECS services with AWS CDK"
excerpt: "..."
---

In the previous article, I described how to get a service up and running in Fargate. If you're new to the AWS Cloud Development Kit and didn't read that previous post, I'd recommend you to start with that article and then get back to this one. However, I did "cheat" a little bit in that guide. Using the `ecs_patterns` library is excellent to get started quickly. But as I pointed out, it does come with downsides. Not being able to share load balancer between services, for instance, isn't a problem if you're only running one service. But if you start adding services, you might want to share a load balancer to keep costs down.

In this article, I will show you how to set up a load balancer by hand so that you can use it for more than one service.

I will add a full code example in the end, but I will walk through the new parts step by step here.

First, you will have to create the actual load balancer. You will probably want it internet-facing, so we set that to `true`. Otherwise, it's pretty straightforward, but it will need some additional configuration to be of much use.

[code]

Next, you need to open up a listener for whatever protocol you want to listen to. If you are using Route53 for your domains, setting up a custom domain for the load balancer is also very straightforward.

[code]

Now you have a load balancer that listens to traffic. But it wouldn't be advantageous if it didn't know where to route that traffic. So you will also have to create a target group for your service and then add the target group to the listener.

[code]

Lastly, create a listener rule. Tell it what domain to match, pass it your listener with the rule, and give it a priority. That's all!

All in all, this would be a working example to set up a service with a load balancer:

[code]
