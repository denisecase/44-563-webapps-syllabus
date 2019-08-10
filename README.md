# [44-563 Developing Web Apps and Services Syllabus](https://profcase.github.io/44-563-webapps-syllabus)

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

* Denise Case
* Assistant Professor
* Northwest Missouri State University

## Links

* Site: <https://profcase.github.io/44-563-webapps-syllabus>
* Source: <https://github.com/profcase/44-563-webapps-syllabus>

## Recommended

* [Git](https://git-scm.com/download/win) version control system
* [TortoiseGit](https://tortoisegit.org/) - integrates with Windows File Explorer
* [Firefox](https://www.mozilla.org/en-US/firefox/) web browser or
* [Chrome](https://www.google.com/chrome/) web browser
* [Visual Studio Code](https://code.visualstudio.com/) - editor
* [Tables Generator (HTML)](https://www.tablesgenerator.com/html_tables)
* [Google Analytics](https://analytics.google.com/analytics/web/)
* [W3C Markup Validation Service](https://validator.w3.org/)
* [W3C Css Validation Service](https://jigsaw.w3.org/css-validator/validator)
* [PurifyCSS](https://purifycss.online/)
* [Icons8](https://icons8.com)
* [Google Workbox](https://developers.google.com/web/tools/workbox/)
* [JsDoc Cheatsheet](https://devhints.io/jsdoc)
* [Test JavaScript Regular Expressions](https://regexr.com/)

## Getting Started

* Fork contents to a new repository.
* Clone your repository down to your local machine.
* From Windows File Explorer, open index.html in Chrome to view.
* Using Visual Studio Code, open the folder to edit.
* Open GitHub repository, under Settings / GitHub Pages, set Source to master branch and click Save.
* Go to your Google Analytics dashboard. Add a new property for your GitHub Page, generate your tracking id, and replace the analytics code in index.html with yours.  

## Icons

This syllabus is a progressive web app, and can be installed on mobile and other devices. We need a lot of icons to cover all the options.

### First, Create Initial Favicons

Basic icon built with [Favicon.io](https://favicon.io)

* Generate from Text
* Text: DATA
* Background: Rounded
* Font family: Hanalei Fill
* Font size: 50
* Color: #FFFFFF
* Background: #006747

Download and save favicon_io.zip file to images folder. Extract and delete the zipfile.

Copy favicon.ico into the root project folder (the one that has the index.html file).

### Second, Create a Full Set of PWA Icons

Full set of PWA icons built with [PWA Builder App Image Generator](https://www.pwabuilder.com/imageGenerator).  Upload your largest favicon (e.g., the 512 size created above) and update settings as desired (these used 0.3 padding with custom color #006747). Check all the boxes. Click the button below the color option to generate a zipfile. Save the AppImages.zip file to images folder. Extract and delete the zipfile.

Update icons property in manifest.json as needed (if the names are the same, updates can be copied from a reference project).

### Third, Create Additional Android Icons (optional)

* [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)

* [Stack Overflow](https://stackoverflow.com/questions/12768128/android-launcher-icon-size)

* 48 × 48 (mdpi) , with 1 dp padding
* 72 × 72 (hdpi), with 1 dp padding
* 96 × 96 (xhdpi), with 1 dp padding
* 144 × 144 (xxhdpi), with 1 dp padding
* 192 × 192 (xxxhdpi) , with 4 dp padding
