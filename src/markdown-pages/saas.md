---
slug: "/bootstrap-your-product-using-freemium-saas-and-open-source"
date: "2021-06-30"
title: "How to bootstrap your product using freemium SaaS and open-source software"
excerpt: "After creating countless web applications, I have come up with a set of freemium SaaS and open-source software that allow me to bootstrap a new app in no time and with basically no money."
---

I've created so many web applications over the years. Some were merely spaghetti I threw on the wall to see what would stick; others I just wanted for myself or experimented with for fun. Some were adequately planned products for an existing target group.

After all these iterations, I have rationalized away all the tedious boilerplate setup and building the same SaaS elements repeatedly. I would say I have a relatively solid foundation of open source software and freemium services that allow me to get from zero to something without wasting any time or money.

Of course, it's always subject to change, and I continuously add or replace stuff. But for now, this is how it looks.

## [Hasura](https://hasura.io)
An open-source GraphQL server. You just put it in front of your database to get all the CRUD operations you can imagine. It's truly amazing.

Who has time to write the same resolvers and mutations over and over again? Not this guy, I'll tell you that much. And, if you haven't checked it out, you should.

## [Auth0](https://auth0.com)
Auth0 is authentication and authorization as a service. I mean, I probably don't even have to tell you no one should ever roll their own auth mechanism. But just in case, repeat after me: no one should ever roll their own auth mechanism. That's right.

And you don't have to build all of the sign-up, confirm email, forgot password nonsense. Everything comes out of the box. You don't even have to implement transactional emails since Auth0 will send out welcome emails and password recovery links for you. And as a bonus, it works so well with Hasura. It's almost too good to be true; only, you better believe it's true.

## [Create React App](https://create-react-app.dev)
I sometimes have nightmares about the time before CRA. Imagine all the time I spent(strikethrough) wasted configuring webpack and installing all sorts of dependencies 😱 — tooling for testing, transpilers, optimizers, you name it. Now it's just one command, and **BAM!** I can start having fun.

## [TailwindCSS](https://tailwindcss.com)
If there's anything in the world of web-app development I hate, it is CSS. Luckily, Tailwind is more or less CSS that writes itself, so these guys had me at hello 💃

That's it! With just four components we, have a full GraphQL API with queries and mutations for all of our database entities, secured by Auth0. We also have sign-up and log-in functionality and transactional emails to confirm email addresses and reset lost passwords. We have a fully functioning client app with great DX, including all the bells and whistles to which the modern front-end developer has grown accustomed.

I've got two more bonus tips for you because your app isn't worth much unless you can get it out in the wild.

## [Heroku](https://www.heroku.com)
Unless you go with the hosted version of Hasura, you will have to deploy your instance somehow. That and any other backend services you might need. I am yet to see an easier way to get your backend services deployed than with Heroku.

## [Netlify](https://www.netlify.com)
Just connect your Github account, and your front-end is available to the world. Includes deploy previews and tons of other features I've rarely used.

_Do you have any additions? Or something better to replace any of the items in my list? I'd love to improve my setup! Tweet me [@robfalken](https://twitter.com/robfalken)_