# [44-563 Developing Web Apps and Services Syllabus](https://profcase.github.io/44-563-webapps-syllabus)

[![Lighthouse score: 92/100](https://lighthouse-badge.appspot.com/?score=92&category=Performance)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact&category=Accessibility)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 93/100](https://lighthouse-badge.appspot.com/?score=93&compact&category=Best%20Practices)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact&category=SEO)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 13/13](https://lighthouse-badge.appspot.com/?score=100&compact&category=Progressive%20Web%20App)](https://github.com/ebidel/lighthouse-badge)

[![Known Vulnerabilities](https://snyk.io//test/github/profcase/44-563-webapps-syllabus/badge.svg?targetFile=package.json)](https://snyk.io//test/github/profcase/44-563-webapps-syllabus?targetFile=package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1a4e281ec5fd4ebcaccb3b8b2c3fc66d)](https://www.codacy.com/app/profcase/44-563-webapps-syllabus?utm_source=github.com&utm_medium=referral&utm_content=profcase/44-563-webapps-syllabus&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/profcase/44-563-webapps-syllabus?style=flat)

- Denise Case
- Assistant Professor
- Northwest Missouri State University

## Links

- Site: <https://profcase.github.io/44-563-webapps-syllabus>
- Source: <https://github.com/profcase/44-563-webapps-syllabus>

## Prerequistes

- [Follow these guides for Windows users](https://denisecase.github.io/windows-dev-list/) to get set up for development.

## Recommended

- [Git](https://git-scm.com/download/win) version control system
- [TortoiseGit](https://tortoisegit.org/) - integrates with Windows File Explorer
- [Firefox](https://www.mozilla.org/en-US/firefox/) web browser or
- [Chrome](https://www.google.com/chrome/) web browser
- [Visual Studio Code](https://code.visualstudio.com/) - editor
- [Tables Generator (HTML)](https://www.tablesgenerator.com/html_tables)
- [Google Analytics](https://analytics.google.com/analytics/web/)
- [W3C Markup Validation Service](https://validator.w3.org/)
- [W3C Css Validation Service](https://jigsaw.w3.org/css-validator/validator)
- [PurifyCSS](https://purifycss.online/)
- [Icons8](https://icons8.com)
- [Google Workbox](https://developers.google.com/web/tools/workbox/)
- [JsDoc Cheatsheet](https://devhints.io/jsdoc)
- [Test JavaScript Regular Expressions](https://regexr.com/)

## Getting Started

- Fork contents to a new repository.
- Clone your repository down to your local machine.
- From Windows File Explorer, open index.html in Chrome to view.
- Using Visual Studio Code, open the folder to edit.
- Open GitHub repository, under Settings / GitHub Pages, set Source to master branch and click Save.
- Go to your Google Analytics dashboard. Add a new property for your GitHub Page, generate your tracking id, and replace the analytics code in index.html with yours.

## Automatic Code Formatting and Cleanup

Professional tools are available to format and clean up code automatically.

### Format Code with Prettier

- Many teams mandate code formatting
- [Prettier](https://prettier.io/) is one of the most popular formatters
- Prettier formats JavaScript, CSS, JSON, and more

### Fix Code with ESLint

- Many teams mandate code linting to analyze code and find possible bugs and other issues
- [ESLint](https://eslint.org/) is one of the most popular JavaScript linters

### Prettier-ESLint

- To perform formatting and linting automatically, we use an npm package
- [prettier-eslint](https://github.com/prettier/prettier-eslint)
- Formats first, then lints

### Select Code Style

- Many teams mandate a JavaScript coding style.
- [JavaScript Standard Style](https://standardjs.com/) is the choice for this app - it avoids unnecessary semicolons.
- Other popular options are [AirBnB](https://github.com/airbnb/javascript) (popular with React) and [Google](https://google.github.io/styleguide/jsguide.html).
- To choose, see [this guide](https://medium.com/@uistephen/style-guides-for-linting-ecmascript-2015-eslint-common-google-airbnb-6c25fd3dff0).

### Try It

- To test automatic formatting and linting, open a PowerShell Window in this folder as an adminstrator.
- Run the following commands to install packages, format the code, and view any recommendations.

```PowerShell
npm install
npm run prettier
npm run lint
```

## Create Custom Icons

This syllabus is a progressive web app, and can be installed on mobile and other devices. We need a lot of icons to cover all the options.

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
