# FoGUWA
[![Maintainability](https://api.codeclimate.com/v1/badges/73fea3d6e2460e707e00/maintainability)](https://codeclimate.com/github/codersforcauses/FoGUWA/maintainability)
![Travis (.com)](https://img.shields.io/travis/com/codersforcauses/FoGUWA.svg?style=flat)

> A web app to display an interactive map that shows information about the various native flora growing on the UWA campus. The map is open for all to access but the main focus is mainly the FoGUWA community.

## Build Setup

* Make sure you have node v12 or higher and yarn installed.
* If you're working on windows, I would recommend you use Git-bash for your Git needs and as the main terminal for this project. Make sure that you have configured Git to use `LF` as your line endings and not `CRLF` which is default on windows.

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Project Brief

The University of Western Australia’s gardens are listed on the National Estate, and are registered with the Australian Heritage Commission. The Friends of the Grounds UWA was established with the objective of encouraging the UWA, and wider WA community to take an active interest in the grounds via events, publications, lectures, and projects related to the university grounds.

FoGUWA have recruited Coders for Causes to create a map-based application, which will allow users to actively track their location, and that of the plant species on the grounds. The application will allow users to click on specific clusterings of plant species in areas for more information on the plant via the [Kwongan Foundation’s Facebook page](https://www.facebook.com/kwonganfoundation). The primary contact for FoGUWA is Senior Honorary Research Fellow, Emeritus Professor Hans Lambers, a highly cited, and influential biological sciences doctor.

The project will expose developers to Progressive Web Applications (PWAs), a design system which allows developers to subvert the Android, and iOS app stores (if you’d like) in creating an application, whilst making it compatible on all devices.

## Tech-stack used for this project
- NodeJS (JS Framework)
- ExpressJS (Back-end Framework)
- NuxtJS (Front-end Framework which is based off VueJS)
- MongoDB (NoSQL Database to be used if needed. Doesn't seem like it's required for phase 1)
- Jest (Test Framework)

## Project Working

### Phase 1 - Winter 2019

During the winter, we hope to complete phase 1 by July 22nd. In phase 1, the scope for the project will be to:
1) display a map
2) the map must be interactive and user-friendly
3) the user must be able to view the required flora on the map as icons(?/image)
4) when the user clicks on the icon, a pop-up appears that displays more information on the said plant
5) a navigation drawer that has links to pages such as about, facebook pages, etc.
6) the map must be easily accessible for those that are visually impaired (stretch goal)
7) add docker containers to standardize a dev environment (stretch goal)

### Phase 2 - Summer 2019

During the summer, to make it easier for the client to modify the data on the website, the following will need to be completed:
1) create logins for admins
2) create a map that will return lat-long of coordinates on click
3) ability to add/remove/update the icons and info for each of the plants

the scope may be increased later down the line.

## Useful APIs

For the maps, the majors mapping-software to display on the web are:
- [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial)
- [HERE Maps](https://developer.here.com/documentation)

For the Back-end, a good resource to learn how to use NodeJS, ExpressJS and MongoDB: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

For the Front-end, I would suggest how to use VueJS first before moving onto NuxtJS as you will find more resources there. The [VueJS documentation](https://vuejs.org/v2/guide/) is pretty helpful for this 

If you would like to use youtube to watch tutorials, here are a few reputed ones:
- [Net Ninja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
- [Traversy Media](https://www.youtube.com/user/TechGuyWeb)
- [Design Course](https://www.youtube.com/user/DesignCourse)
- [Free Code Camp](https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ)

## Development Team
- Jeremiah Pinto (Project Manager/ Tech Lead)
- Thai Nguyen (Committee Member)
- Ethan Pui
- Jordi Hermoso
- Sean Sim
- Zahra Ussi
- Latrice Kong
- Cassie Ritchie
- Adrian Tan
- Jurek Malarecki
