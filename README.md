# [44-563 Developing Web Apps and Services Syllabus](https://denisecase.github.io/44-563-webapps-syllabus)

![CI](https://github.com/denisecase/44-563-webapps-syllabus/workflows/CI/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cf28398117374422ab14e715916852fb)](https://www.codacy.com/manual/denisecase/44-563-webapps-syllabus?utm_source=github.com&utm_medium=referral&utm_content=denisecase/44-563-webapps-syllabus&utm_campaign=Badge_Grade)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/denisecase/44-563-webapps-syllabus?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

[![Lighthouse Performance Badge](./test_results/lighthouse_performance.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Accessibility Badge](./test_results/lighthouse_accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](./test_results//lighthouse_best-practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse SEO Badge](./test_results/lighthouse_seo.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse PWA Badge](./test_results/lighthouse_pwa.svg)](https://github.com/emazzotta/lighthouse-badges)

- Denise Case
- Assistant Professor
- Northwest Missouri State University

## Links

- Site: <https://denisecase.github.io/44-563-webapps-syllabus>
- Source: <https://github.com/denisecase/44-563-webapps-syllabus>

## Prerequistes

- [Follow these guides for Windows users](https://denisecase.github.io/windows-dev-list/) to get set up for development.

## Recommended

Host

- [GitHub Pages](https://pages.github.com/) - free & easy hosting for client-side sites

Basic Tools

- [Git](https://git-scm.com/download/win) version control system
- [VS Code](https://code.visualstudio.com/) - editor
- [VS Code extension - Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - hot refresh

Windows Tools

- [Powershell](https://docs.microsoft.com/en-us/powershell/) - Windows CLI
- [Chocolatey](https://chocolatey.org/) - software manager for Windows
- [TortoiseGit](https://tortoisegit.org/) - integrates with Windows File Explorer

CI/CD Tools

- [Husky](https://github.com/typicode/husky) - Git hooks to auto-lint and more
- [Node](https://nodejs.org/en/) - JavaScript without the browser
- [npm, npx](https://www.npmjs.com/) - package manager and script runner (see package.json)

Code Tools

- [W3C Markup Validation Service](https://validator.w3.org/)
- [W3C Css Validation Service](https://jigsaw.w3.org/css-validator/validator)
- [Airbnb JavaScript Style](https://github.com/airbnb/javascript) - semicolons and more
- [Prettier](https://prettier.io/) - formats JavaScript, CSS, JSON, and more
- [ESLint](https://eslint.org/docs/user-guide/getting-started) - linting
- [Sort package.json](https://www.npmjs.com/package/sort-package-json) - consistant, std format
- [Mark.js](https://markjs.io/) - JS keyword highlighter

Responsive Design

- [Bootstrap](https://getbootstrap.com/) - responsive design
- [Material Design for Bootstrap](https://mdbootstrap.com/) - nice looking styles, great tutorials
- [Bootstrap 5 alpha](https://mdbootstrap.com/docs/standard/bootstrap-5/) - drops jQuery
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (custom properties)
- [2020 JavaScript](https://auth0.com/blog/javascript-whats-new-es2020/) - dynamic imports, ??, and more

Audits

- [Google Measure](https://web.dev/measure/)
- [Lighthouse Badges](https://github.com/emazzotta/lighthouse-badges) - PWA audits
- [Codacy](https://app.codacy.com/) - online static analysis

Browsers

- [Firefox](https://www.mozilla.org/en-US/firefox/) web browser or
- [Chrome](https://www.google.com/chrome/) web browser

PWA

- [Google Workbox](https://developers.google.com/web/tools/workbox/) - Service worker API

Analytics

- [Google Analytics](https://analytics.google.com/analytics/web/)

Speech Synthesis

- [Built-in Speech Synthesis](SpeechSynthesisUtterance)

As Needed

- [Tables Generator (HTML)](https://www.tablesgenerator.com/html_tables)
- [PurifyCSS](https://github.com/purifycss/purifycss) - reduce size
- [PurifyCSS](https://purifycss.online/) - online
- [Icons8](https://icons8.com)
- [JSDoc](https://jsdoc.app/)
- [JsDoc Cheatsheet](https://devhints.io/jsdoc)
- [Test JavaScript Regular Expressions](https://regexr.com/)
- [Code styles guide](https://medium.com/@uistephen/style-guides-for-linting-ecmascript-2015-eslint-common-google-airbnb-6c25fd3dff0)

## Getting Started

- Fork contents to a new repository.
- Clone your repository down to your local machine.
- From Windows File Explorer, open index.html in Chrome to view.
- Using Visual Studio Code, open the folder to edit.
- Open GitHub repository, under Settings / GitHub Pages, set Source to master branch and click Save.
- Go to your Google Analytics dashboard. Add a new property for your GitHub Page, generate your tracking id, and replace the analytics code in index.html with yours.

## Progressive Web App

This syllabus is a progressive web app and can be installed on mobile and other devices.

Track your outcomes with local storage.

## Semester Updates

- Update the CDN styles in index.html.
- Update the Canvas course URL in the navigation bar.
- Update outcomes.
- Update tools and requirements.
- Update schedule.
- Update office hours.

## Create Custom PWA Icons

PWA require lots of icons.

### First, create initial favicons

Basic icon built with [Favicon.io](https://favicon.io)

- Generate from Text
- Text: DATA
- Background: Rounded
- Font family: Hanalei Fill
- Font size: 50
- Color: #FFFFFF
- Background: #006747

Download and save favicon_io.zip file to images folder. Extract and delete the zipfile.

Copy favicon.ico into the root project folder (the one that has the index.html file).

### Second, create a full set of PWA icons

Full set of PWA icons built with [PWA Builder App Image Generator](https://www.pwabuilder.com/imageGenerator). Upload your largest favicon (e.g., the 512 size created above) and update settings as desired (these used 0.3 padding with custom color #006747). Check all the boxes. Click the button below the color option to generate a zipfile. Save the AppImages.zip file to images folder. Extract and delete the zipfile.

Update icons property in manifest.json as needed (if the names are the same, updates can be copied from a reference project).

### Third, create additional Android icons (optional)

- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)

- [Stack Overflow](https://stackoverflow.com/questions/12768128/android-launcher-icon-size)

- 48 × 48 (mdpi) , with 1 dp padding
- 72 × 72 (hdpi), with 1 dp padding
- 96 × 96 (xhdpi), with 1 dp padding
- 144 × 144 (xxhdpi), with 1 dp padding
- 192 × 192 (xxxhdpi) , with 4 dp padding

## Try It

- To test automatic formatting and linting and PWA testing, open a PowerShell Window in this folder as an adminstrator.
- Run the following commands to install packages, format the code, and view any recommendations.

```PowerShell
npm run sort
npm install
npm run prettier
npm run lint
npm run lint-fix
```

## Current

- Removing jQuery to increase performance
- Moving to JavaScript modules
- Shared custom elements using only JavaScript (components use general page styling)
- Shared web components encapsulate their own styles (not currrently used)

## See also

- Source: <https://github.com/denisecase/44-517-bigdata-syllabus> - uses content from here
