# Recover Together
Please visit https://devpost.com/software/storm-recovery for up-to-date information.

Streamlines the recovery process for climate disasters. HackUTD Best Use of Google Cloud. (MongoDB/Express.js/React.js, Firebase Auth, Maps, Cloud Compute Engine deployment)

## Inspiration

A few weeks ago, a massive winter storm hit Texas. The storm damaged the state's power grid and subsequently deprived many Texans of power, water, and other necessities. This app was created with the intent to streamline the recovery process for these types of disasters.

## What it does

Our web application provides users with the ability to search for supply centers for power, water, and other necessities using a map derived from Google Maps. Suppliers can also add their own supply centers to the map so that other users can see them. To prevent abuse, authentication is required to access these features.

## How we built it

At the beginning of the hacking period, we split into 2 groups to work on the front-end and the back-end respectively. We used Google Cloud extensively. On the front-end, we used React along with the Google Maps API to create an easy to use UI. We used a Mongo Database with Express on the back-end to store information about user credentials and supply centers. We leveraged Firebase to incorporate authentication for our users who wish to create events. We later reconvened to focus more on the front-end and styling. We lastly deployed our solution using Google Cloud Compute Engine and associated with a domain.

## Challenges we ran into

Going into the development of the web application, we collectively had little working knowledge with back-end development and UIs in general. Building the map, in general, was also difficult. In addition, determining what functionality we could viably add to the application within the time period was a bit challenging, as we had some ambitious ideas that we could unfortunately not implement.

## Accomplishments that we're proud of

We are particularly proud of the fact that we were able to create a working full-stack solution under a 24 hour period, as there is a lot of moving parts in such a project. Knowledge of web development among our group varied from little to none, so we think it's even more impressive that we were able to work with React and APIs as well as we did.

## What we learned

For most of us, this was the first full-stack solution that we worked on. Because of this, we learned a lot regarding not only the front-end and the back-end, but also how to develop these components in tandem. In specific, we learned a lot concerning APIs, React, and databases.

## What's next for Recover Together

In the future, we hope to add the ability for users to donate to suppliers. We also want to add custom icons to the map pertaining to the types of resources corresponding supply centers provided. It also may be beneficial to add more types of search options to our map interface so users can find all supply centers by a certain organization for instance.

## Built With

-   [express.js](https://devpost.com/software/built-with/express-js)
-   [google-cloud](https://devpost.com/software/built-with/google-cloud)
-   [google-maps](https://devpost.com/software/built-with/google-maps)
-   [javascript](https://devpost.com/software/built-with/javascript)
-   [mongodb](https://devpost.com/software/built-with/mongodb)
-   [react](https://devpost.com/software/built-with/react)

## Try it out

-   [GitHub Repo/server](https://github.com/coolsupersquad/server "https://github.com/coolsupersquad/server")
-   [GitHub Repo/client](https://github.com/coolsupersquad/client "https://github.com/coolsupersquad/client")
-   [recovertogether.tech](http://recovertogether.tech "http://recovertogether.tech")
