# Axiom - A Hugo Theme

Axiom is designed to make the readers of your content and the search engines happy. A typical "Article" with Adsense ads, web fonts, syntax highlighting, and large Hero image has a __Mobile PageSpeed__ of __95__ running on the lowest tier cloud server plan.

SEO and Social Media features include Article sharing via Facebook and Twitter (without heavy Javascript libraries), Google Structured Data `ld+json` with a full Schema.org `Article` fieldset, Open-Graph tags, Serverless CDN support (Netlify), Asset CDN support (Cloudinary) with image transformations for responsive images, ATOM feed Syndication XML format, asset preloading, third-party prefetching, SVG icons, syntax highlighting with Prism.js, custom 404 error page, custom CSS/JS support, and a full Multilingual implementation. Built with Tailwind CSS, Alpine JS, and an NPM Scripts (task-runner-free) build process, the Axiom Hugo theme is feature packed.

# Support / Questions

Please refer to the official [Hugo Documentation](https://gohugo.io/documentation/) and the [Hugo Community Discourse](https://discourse.gohugo.io/) to find answers and solutions. If you need help with something Axiom specific, please ask your question via Twitter, Stack Overflow, or - as a last resort - email. For a full list of options, visit our [Contact](https://www.jhaurawachsman.com/contact/) page. __Please DO NOT open a Github Issue unless it is related to Axiom specific code__. Hugo error messages generally are due to improper settings in the Config file added after installation.

# Prerequisite 

In order to install Axiom, you need the minimum required Hugo website structure.

The instructions below, assume we have a working directory named `sites`.

> When typing/copying the terminal commands below, don't include the prompt portion: `~ %`

## New Website

If you don't have an existing Hugo website, you can use the provided `exampleSite` as a starting point:

```shell
~ % cd sites
sites % git clone https://github.com/jhauraw/axiom.git example.com/themes/axiom
sites % cd example.com
# Copy the exampleSite contents to site root
example.com % cp -r themes/axiom/exampleSite/* .
```

Proceed to "Installation" next.

## Existing Website

If you already have an existing Hugo website, change directories into it's project root:

> Replace `example.com` with your own project's directory name.

```shell
~ % cd sites/example.com
```

You'll need to remove your existing Hugo Config file, or merge Axiom's Config file with your current file. The recommended method is to backup your current Config file, and replace it with Axiom's Config file. You can then add any needed Config options from your backup.

__After__ you complete the "Installation" step below, copy Axiom's example Config file into the root directory of your website:

```shell
example.com % cp themes/axiom/exampleSite/config.toml .
```

# Installation

Hugo themes can be installed in two main ways. You can choose to install via Submodule or Clone/Download.

## Via Submodule

Install Axiom as a Git Submodule:

```shell
# Only if not already a git repository
example.com % git init

# Add submodule to the 'themes' directory
example.com % git submodule add https://github.com/jhauraw/axiom.git themes/axiom
example.com % git submodule init
example.com % git submodule update
```

To update the theme in the future:

```shell
example.com % git submodule update --remote themes/axiom
```

Submodules have the advantage of being much easier to update and keep in sync.

## Via Clone

Install Axiom as a Git clone:

```shell
example.com % git clone https://github.com/jhauraw/axiom.git themes/axiom
```

Optionally, remove the .git directory.

To update the theme in the future, you'll need to delete the theme and re-clone it.

Axiom is now installed in your project's `themes` folder. Next, let's set it up and configure the options.

# Config Options

Options to customize Axiom, starting from the top of the _Config_ file ([config.toml](https://github.com/jhauraw/axiom/blob/master/exampleSite/config.toml)). Many of the options are detailed in the Hugo Configuration Documentation.

If you followed the "Prerequisite" step above, the Config file will be located at `~/sites/example.com/config.toml`. Open this file now and change/add/remove options as we work down the list of options.

## Core

Options related to Hugo's Core build settings:

```toml
# Change to your website's URL (NO trailing slash)
# For local dev, change to: http://localhost:1313
baseURL = "https://example.com"

# Change to your Brand or Website Title
title = "Axiom A Hugo Theme"
# Language codes (lowercase)
languageCode = "en-us"
defaultContentLanguage = "en-us"

# Which theme to use
theme = "axiom"

# Canonify relative URLs using baseURL
canonifyURLs = false
# Max posts to show in atom feed
rssLimit = 100
# Enable Emoji's in posts
enableEmoji = true
# Length of snippet on post index and structured data
summaryLength = 40
# Output a robots.txt file (see the 'Frontmatter' section below)
enableRobotsTXT = true
# Don't automatically mangle titles
pluralizelisttitles = false
# Footnote entity (broken in Hugo currently)
footnoteReturnLinkContents = "&#8617;"

# Don't output tags or categories (remove to re-enable)
disableKinds = ["taxonomy", "taxonomyTerm"]
```

> If you change the `defaultContentLanguage` you must add the new language in the Config `[languages]` table, and an i18n language file in `/i18n/lang-code.toml`.

There are many more Core options that can be added to suit your needs. See the Hugo Configuration Documentation for more information.

## Permalinks

Axiom is configured to use the file name slug as the publicly accessible URL:

```shell
[permalinks]
post = "/:filename"
```

The `post` variable name refers to individual files in the `post` content Section.

## Paths

When entering paths in the Config file or in Content files, the most portable and robust option is to use a __relative__ path:

- Don't use a beginning forward slash: NO:`/images/example.png`, YES:`images/example.png`
- Local file paths are relative to the `publishDir` Config option (default: `public`)
- CDN file paths are relative to the `params.cdn` constructed URL
- Local file URLs will be output as absolute or root-relative based on the `canonifyURLs` Config setting
- CDN file URLs are always absolute

Examples of where relative paths are recommended:

- In the `params.logo` Config section
- In the `params.images` Config section
- In a Page or Post's Frontmatter when setting the Feature image
- In a Page or Post's Content when linking to a PDF, or using the Figure shortcode to display an image
- Anywhere else an asset path is entered, excepting links to other websites' assets

## Params

Options related to Hugo's Param settings:

```toml
[params]
# Sections to include in lists and indexes
mainSections = ["post"]

# Footer copyright start year, prepended to current year, e.g., 2000-2020
copyrightYear = 2000
```

There are many more Param options that can be added to suit your needs. See the Hugo Configuration Documentation for more information.

## Branding

Config options related to your brand or website:

```toml
[params.brand]
# Just domain name, no www
domain = "example.com"
# Contact email address
email = "info@example.com"
```

Mainly used for Contact options.

## Social

Settings relating to social networks:

```toml
[params.social]
# Replace USERNAME with your own
facebook = "https://www.facebook.com/USERNAME"
github = "https://github.com/USERNAME"
instagram = "https://instagram.com/USERNAME"
linkedin = "https://www.linkedin.com/in/USERNAME"
pinterest = "https://www.pinterest.com/USERNAME"
stackoverflow = "https://stackoverflow.com/users/USERNAME"
twitter = "https://twitter.com/USERNAME"
youtube = "https://www.youtube.com/USERNAME"

# Show these linked icons in the footer
footer = ["twitter", "github", "instagram"]
```

The `footer` option allows you to show specific social network icons with links in the footer of the website. Each entry must match one of the network names defined.

## Services

Options for third party services, such as analytics, tracking, ads, and APIs:

```toml
[params.services]
# Google Analytics Id
analyticsId = "UA-DEV"
# Google Adwords Id, provided when you setup a Conversion
adwordsId = "AW-DEV"
# Google Adwords Conversion Id
adwordsConversionId = "ID-DEV"
# Google Adwords Conversion value (integer, no quotes, 00.00)
adwordsConversionValue = 0
# Google Adsense Id
adsenseId = "CA-PUB-DEV"
# Google Adsense Ad Slot Id, for ad unit shown below Posts
adsenseAdSlotId = "ID-DEV"
# Google Adsense Lazy Load
adsenseLazy = false
# Facebook App Id
facebookApp = "FB-DEV"
# Facebook Pixel Id
facebookPixel = "FB-DEV"
# Disqus Comments Username
disqusUser = "na"
```

> Tip: create a `config.dev.toml` file with test values for each service to prevent false positives on trackers.

## Custom Logo

The logo in the website's Header can be shown as 1) styled text, 2) an image, or 3) an inline svg.

1) TEXT: Show the website's Title (`.Site.Title` param) in styled text instead of a logo:

```toml
[params.logo]
inline = false
path = ""
```

2) IMAGE: Display the logo as an image (`<img>`):

```toml
[params.logo]
inline = false
path = "image/brand/logo.png"
```

Note: any file type (extension) may be used, i.e., .jpg, .gif, .svg, etc.

3) INLINE SVG: Display the logo as an inline svg (`<svg>`):

> Note: Axiom uses Hugo's `readFile` function to get the contents of the SVG as a string. To make this work, enter a project `root-relative` path, typically to the `/static/` or `/assets/` directory. A CDN URL cannot be used with `readFile`.

```toml
[params.logo]
inline = true
path = "/static/image/brand/logo.svg"
```

Advantages with this option include the ability to manipulate the SVG with styles, such as changing the color or adding a hover effect. Also, it reduces http requests by one.

__Sizing and CSS__: Axiom uses flexible default CSS sizing on the logo, which works for square, or rectangular images. The `height` is set to a fixed value, and the width is set to `auto`, allowing the logo to scale proportionately. You can override these settings and set your own CSS by using the _Custom CSS_ feature (`/assets/custom.css`, see "Extending" below). For example, to make the logo larger, you only need to increase the height:

```css
.logo img, .logo svg {
    height: 3.15rem;
}
```

Of course, you can add additional styles such as color or shadow.

## Image

```toml
[params.image]
# Dimensions of the 'Feature' image (pixels)
width = "2048"
height = "1024"
# Favicons (suggest to store .ico at root of website or CDN)
faviconIco = "favicon.ico"
faviconAlt = "image/brand/favicon.png"
# High-res square version of your Icon or Logo (recommended 2048x2048 px)
icon1To1 = "image/brand/icon-1-1.png"
# High-res rectangular version of your Icon or Logo (recommended 2048x1024 px)
icon2To1 = "image/brand/icon-2-1.png"
# Default 'Feature' image
default = "image/page-default.webp"
```

The Default image (`default`) will be used for Structured Data and Open-Graph when Pages/Posts don't have a Feature image set in the Frontmatter. It should be sized to match the settings entered for `width` and `height`. Choose an image that represents the overall theme of the brand or website.

## Font

The Font section controls if the  _Type CSS_ (`/assets/type.css`) stylesheet is used, and if font files are preloaded:

```toml
[params.font]
# MIME type of font files
type = ""
# Path to font files
path = ""
# List of font files from 'type.css' to preload (setting to empty, disables)
files = []
```

If the `files` array is populated, Axiom will preload the list of font files, and link the Type CSS stylesheet in the website's `<head>` section. You'll need to have the font files either stored locally in an `example.com/static/font/` directory or hosted on a CDN supported by Axiom. You can set the directory where the font files are located with the `path` option.

Example settings to load fonts:

```toml
type = "font/woff"
path = "font/"
files = ["title-400-font.woff", "sans-400-font.woff", "serif-italic-400-font.woff"]
```

If you have many font files added in the Type CSS file, you don't have to preload all of them. You can list a subset of the most important ones in the Config, and let the others load normally. As long as at least one font file is in the `files` array, the Type CSS features will be enabled.

An Example Type CSS file ([EXAMPLE-TYPE.css](https://github.com/jhauraw/axiom/blob/master/exampleSite/assets/EXAMPLE-TYPE.css)) is included in the Example Site assets directory.

> Note: In `type.css` begin each URL with the `{{ .host }}` variable so that proper paths/URLs are substituted on build.

If the `files` array is empty, Axiom will use the Tailwind CSS font-family fallback settings. Either way, the display will look very similar, unless your eye is trained to typography.

If you're not using the Type CSS features, you can delete the corresponding files in the _Assets_ directory (`/assets/type.css` and `/assets/EXAMPLE-TYPE.css`) to prevent Hugo from copying empty files on build.

See the _Typography_ section below for more details.

## CDNs

Configure asset file delivery via local storage, or a CDN provider:

```toml
[params.cdn]
# Asset delivery provider (values: local, cloudinary)
provider = "local"
# Default asset type (values: image, video, raw)
type = "image"

# Cloudinary CDN
[params.cloudinary]
# Base URL for your account (replace CLOUD_NAME, note: add trailing slash)
host = "https://res.cloudinary.com/CLOUD_NAME/"
# URL versioning, e.g., "v12345/"
version = ""
# Cloudinary Internal paths. DON'T EDIT!
image = "image/upload/"
raw = "raw/upload/"
video = "video/upload/"

# Cloudinary asset transformation presets
# Applied internally by Axiom or when using Shortcodes in Content
[params.cloudinary.presets]
# Image: general use, all-around
base = "f_auto,q_auto/"
# Image: content body
page = "w_auto,dpr_auto,c_scale,f_auto,q_auto/"
# Image: content feature
feature = "w_auto,dpr_auto,c_scale,f_auto,q_auto/"
# Image: content summary
summary = "w_auto,dpr_auto,c_scale,f_auto,q_auto/"
```

When `provider` is set to one of the supported CDN values, all asset paths will be output as absolute URLs. The URL structure will be assembled based on each CDN's design. See the `/axiom/layouts/partials/cdn-src.html` file for details.

> Alert: CDN Config paths/URLs must end with a trailing slash `/`!

## Menus

Axiom comes with three configurable menus. Refer to the Hugo Menus Documentation to learn how to add or remove links:

```toml
[menu]
[[menu.main]]
[[menu.mobile]]
[[menu.foot]]
```

> NOTE: Be careful adding too many items to the menus, as this could degrade mobile user experience.

## Languages

Axiom is multi-language ready:

```toml
[languages]
[languages."en-us"]
weight = 1
languageName = "US English"
```

> NOTE: If additional languages are added, be sure to create the corresponding lang file in the `i18n` directory, and menus in the Config file.

Refer to the Hugo Multilingual Documentation to learn how to add additional language support.

# Theme Features

## Flexible Asset Delivery

Out-of-the-box, Axiom is configured to support assets (images, pdfs, fonts, etc.) which are self-hosted or served via a CDN. Currently, Cloudinary is the only CDN implemented.

## Frontmatter

__Private__: Optional. Exclude a page or post from robots indexing, sitemaps, and feeds:

```toml
+++
private = true
+++
```

Useful for pages such as 404, Privacy Policy, or Disclosures that you don't want indexed.

__Feature__: Optional. Add a featured image to an Index, Section, Page, or Post:

```toml
+++
# Image name
feature = "path/filename.ext"
# Optional 'Caption'
caption = "Caption text (will also be used for alt)."

# Using 'public_id' (uuid), instead of filename
feature = "5e39e315-c06c-4d81-9b4a-35fca661621c"
+++
```

> Remember to output the image in the size set in the _Image_ Config (`params.image` `width` and `height`) option and store it locally or on a CDN.

__Author__: Optional. Author of the content:

```toml
+++
# Author Id from /data/author.toml
author = "default"
+++
```

See the Author section below for details on configuration.

__Subtitle__: Optional. Short blurb enhancing the Title. Used in Structured Data "alternativeHeadline" field:

```toml
+++
subtitle = "25 words / 125 chars."
+++
```

SEO potential, write something relevant.

__Summary__: Optional. Description of Page, Post content. Used Summary index pages, Open-Graph and Structured Data "description" fields:

```toml
+++
summary = "Summary, and meta description. Optional, automatically generated if not provided."
+++
```

SEO potential, write something relevant.

## Shortcodes

> Note: Shortcodes are CDN aware.

__Site Title__: Outputs the website's Config `title` value. Hugo doesn't give access to these values in Content files.

```markup
{{< site-title >}}
```

__CDN URL__: Output a CDN aware URL for the specified asset. Useful when linking to an asset directly, such as for download. Only the `src` parameter is required.

```markup
{{< cdn-url src="image.svg" >}}
{{< cdn-url src="image.jpg" preset="page" >}}
{{< cdn-url src="video.mp4" type="video" >}}
{{< cdn-url src="font.woff" type="raw" >}}
```

__PDF Download__: A small float-right PDF download widget.

```markup
{{< pdf-download "pdf/Document.pdf" >}}
```

__Email SVG__: An email SVG icon. Shown with Hugo's built-in param shortcode. This example could be used on a Contact page.

```markup
{{< email-svg >}} {{< param "brand.email" >}}
```

__Figure__: Axiom comes with a custom Figure image shortcode which uses the same API as the built in Hugo shortcode, but has been enhanced to support CDN images and the `page` preset is applied. You only need to pass it the image name (e.g., `path/filename.ext`, `public_id` [uuid]) with or without extension and Axiom will do the rest - no need to copy/paste complicated URLs in your Markdown files.

Only the `src` parameter is required. See the Hugo Figure Shortcode Documentation for all of the options.

```markup
{{< figure src="image/data-chart.webp" alt="Data Chart" caption="Data Chart" attr="Big Data" attrlink="https://www.example.com/" >}}
```

__Blockquote__: The first parameter is required, while the other two are optional:

```markup
# Definition
{{< blockquote "Quote text" "Footer text" "Cite text" >}}

# Example
{{< blockquote "You can trade hours for dollars or ideas for millions." "Cactus Jack on" "The Shark Tank" >}}
```

> Tip: You can also use standard Markdown blockquote syntax as described below in the _Markdown_ section, if you prefer.

## Archetypes

__New Post__: Create a new entry in the "Post" section:

```shell
hugo new post/new-post.md
```

If you prefer the plural form of "Posts" there is also a generator for that variant:

```shell
hugo new posts/new-post.md
```

__New Page__: Create a new static page:

```shell
hugo new about.md
```

The Archetype generators don't include all of the _Frontmatter_ options. Refer to the _Frontmatter_ section above for more details.

## Markdown

__Headings__: While headings in sizes H3-H6 are supported, they are styled to match H2. Anything smaller than H2 is smaller than a `<p>` and that doesn't look right.

The first H1 of an element with the `cdata` class (`class="cdata"`) is a special case and is considered the main heading or Title, and will be styled uniquely from the rest to make it standout.

__Blockquotes__:

Quote only:

    > Don't communicate by sharing memory, share memory by communicating.

With citations:

    > Don't communicate by sharing memory, share memory by communicating.</p>
    > — <cite>Rob Pike[^1]</cite>

```html
[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.
```

For citations to work, the Config file needs the Goldmark Renderer setting `unsafe = true`. This is not specific to this theme, but part of how Hugo treats HTML in Markdown content:

```toml
[markup]
[markup.goldmark]
[markup.goldmark.renderer]
unsafe = true
```

> Tip: You can also use the `blockquote` shortcode mentioned in the _Shortcodes_ section above, which offers a cleaner API.

Refer to the official [Markdown documentation](https://daringfireball.net/projects/markdown/syntax) for more details.

## Typography

TODO.

## Authors

Axiom supports multiple content authors for your Posts. You can set individual Author contact data and profile images. To configure Authors, edit the _Authors_ data file (`/data/author.toml`) and output and Author profile image locally or on a CDN. Recommended size is `256x256` pixels.

See the Hugo Data File Documentation for more information.

## Sharing

Axiom is configured to allow users to share your content via Facebook and Twitter. The implementation uses non-javascript library techniques, so your website speed won't be slowed down.

For Twitter sharing, set the Author's Twitter username in the Author's Data file. For Facebook sharing, set the website's Facebook App Id in the _Services_ Config (`params.services` `facebookApp`) option.

## Comments

TODO.

## ATOM Feed

Axiom uses an ATOM syndication feed format which includes full post content in each entry.

If set in the _Image_ Config (`params.image` `icon1To1` and `icon2To1`), an icon and logo tag will be added to the feed template.

## Services

__Google Adsense__: Axiom is ready for Ads if you choose to serve them. There is a single responsive Ad Slot at the bottom of the Post content. If you set an Adsense Id in the _Services_ Config (`params.services` `adsenseId`), Ads will be activated, otherwise all Ads related javascript and code will not be output. Be sure to also set your `adsenseAdSlotId`.

Setting the `adsenseLazy` to true will delay the loading of the javascript slightly to enhance page speed.

__Facebook__: If you set a Facebook Pixel Id in the _Services_ Config (`params.services` `facebookPixel`), the lightweight pixel tracker will be activated, otherwise all related javascript and code will not be output.

## Extending

__Custom CSS, JS__: Axiom is setup so you can add your own custom CSS and JS code to extend the theme base files. To take advantage of this feature, add a file named `custom.css` and/or `custom.js` to the  _Assets_ directory (`/assets/`). Axiom will bundle the custom files with the base, minify, and preload the bundle to enhance performance.

The _Example_ site _Assets_ directory contains a pair of empty custom CSS and JS files to get you started.

If you're not using the _Custom CSS, JS_ feature, you can delete the corresponding files (`/assets/custom.css` and `/assets/custom.js`).

# Misc.

IDE search scope:

```shell
-*/node_modules/*,-*/resources/*,-*/public/*,-*/assets/*.js,-*/assets/*.css,-*.min.js,-*.min.css,-*-lock.json,-*prism.js,-*alpine.js,-*.*project,-*.*workspace,<project>
```

# License

Creative Commons Attribution-ShareAlike 4.0 International License: [CC-BY-SA-4.0](https://github.com/jhauraw/jhaurawachsman.com/blob/master/LICENSE).

Copyright 2020 [Jhaura Wachsman](https://www.jhaurawachsman.com/)
