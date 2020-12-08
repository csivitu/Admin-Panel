[![csivit][csivitu-shield]][csivitu-url]
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo">
    <img src="https://csivit.com/images/favicon.png" alt="Logo" width="80">
  </a>

  <h3 align="center">Admin-Panel</h3>

  <p align="center">
    An all-use API built in Typescript to perform admin operations on various databases 
    <br />
    <a href="https://github.com/csivitu/repo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/csivitu/repo">View Demo</a>
    ·
    <a href="https://github.com/csivitu/repo/issues">Report Bug</a>
    ·
    <a href="https://github.com/csivitu/repo/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contributors](#contributors-)



<!-- ABOUT THE PROJECT -->
## About The Project

**Admin-Panel** is REST API built in Typescript built for the purpose of performing admin operations on any database be it SQL or NOSQL. The API takes the user's database URL and connects to it. <br>
This API makes use of [Molecular](https://moleculer.services/docs/0.14/index.html) a fast, modern and powerful microservices framework for Node.js. It helps you to build efficient, reliable & scalable services. You can perform various **CRUD** operations with the help of this API.




### Built With

* [Typescript](https://www.typescriptlang.org/)
* [Node](https://nodejs.org/en/)
* [Molecular](https://moleculer.services/docs/0.14/index.html)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [npm](https://www.npmjs.com/)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [molecular](https://www.npmjs.com/package/moleculer)
* [molecular-web](https://www.npmjs.com/package/moleculer-web)



### Installation
 
1. Clone the repo
```sh
git clone https://github.com/csivitu/Admin-Panel.git
```
2. Install NPM packages using (npm or yarn).

#### Using npm
```sh
npm install
```
#### Using yarn

```sh
yarn install
```

**Note:**  If installing the packages with npm you get errors use yarn to install them.

<!-- USAGE EXAMPLES -->
## Usage

To run this project locally, you can run the following command. 

#### Using npm
```sh
npm start
```
#### Using yarn

```sh
yarn start
```

## API Endpoints

|Request Type| Route | Function |
|:-----------:|:------:|:---------:|
| GET| /project | To list all the projects present in the database |
| GET | /project/:name | To get a specific project from the database |
| POST | /project | To create a new project in the database |
|  PUT | /project/:name | To update anything in the project |
| DELETE | /project/:name | To delete a project in the database |
| GET | /export/:project | To a export a project present in our database | 
| GET | /export/:project/:collection | To export a collection present inside the project we are exporting |
| DELETE | /export/:project/:collection | To delete a collection present in our project |
| DELETE | /export/:project/:collection/document | To delete an document in a collection |
| POST | /export/:project/:collection | To add a document in a collection |
| PUT | /export/:project/:collection | To update a document in a collection |



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/github_username/repo/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

You are requested to follow the contribution guidelines specified in [CONTRIBUTING.md](./CONTRIBUTING.md) while contributing to the project :smile:.

<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[csivitu-shield]: https://img.shields.io/badge/csivitu-csivitu-blue
[csivitu-url]: https://csivit.com
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/csivitu/repo/issues

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ashikka"><img src="https://avatars1.githubusercontent.com/u/58368421?v=4" width="100px;" alt=""/><br /><sub><b>ashikka</b></sub></a><br /><a href="https://github.com/csivitu/Admin-Panel/commits?author=ashikka" title="Code">💻</a></td>
    <td align="center"><a href="https://alias-rahil.github.io/"><img src="https://avatars2.githubusercontent.com/u/59060219?v=4" width="100px;" alt=""/><br /><sub><b>Rahil Kabani</b></sub></a><br /><a href="https://github.com/csivitu/Admin-Panel/commits?author=alias-rahil" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
