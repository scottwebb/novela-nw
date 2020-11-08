require("dotenv").config();

const siteMetadata = {
  title: `London in Motion | London Ontario Video Clips`,
  name: `London in Motion`,
  siteUrl: `https://londoninmotion.com`,
  description: `Cool collection of curated short video clips of London Ontario to help you explore the city in motion. Videos are also purchasable for licensing in your own work.`,
  hero: {
    heading: `Hi, I’m Scott, <br/> photographer.`,
    writingHeading: `Short video <br/> clips of <br/>London <br/>Ontario.`,
    filesHeading: `Awesome <br/> ways to support London in Motion`,
    filesSub: `Ways to support Us! If you'd like to advertise here, please connect at londoninmotion@gmail.com`,
    pluginsHeading: `Awesome <br/> Resources`,
    pluginsSub: `A list of resources and gear used to bring the videos and website to you. I love them so much and I want to share with you all my favorite ones.`,
    maxWidth: 900,
  },
  social: [
    {
      url: `https://twitter.com/scotty_webb`,
    },
    {
      name: 'unsplash',
      url: `https://unsplash.com/scottwebb`,
    },
    {
      name: 'instagram',
      url: `https://www.instagram.com/scottwebb`,
    },
    {
      name: 'facebook',
      url: `https://facebook.com/scottwebbphotography`,
    },
  ],
};

const plugins = [
  {
    resolve: "@narative/gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      rootPath: "/",
      basePath: "/",
      authorsPage: false,
      mailchimp: true,
      sources: {
        local: true,
        contentful: false,
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `London in Motion`,
      short_name: `London in Motion`,
      start_url: `/`,
      background_color: `#090A0B`,
      display: `standalone`,
      icon: `src/assets/favicon.jpg`,
      include_favicon: false,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-55380266-5",
    },
  },
  {
    resolve: "gatsby-plugin-mailchimp",
    options: {
      endpoint:
        "https://medium.us16.list-manage.com/subscribe/post?u=bd56b6b313e273cdd466f5abc&amp;id=736a1779cd",
    },
  },
];

/**
 * For development purposes if there's no Contentful Space ID and Access Token
 * set we don't want to add in gatsby-source-contentful because it will throw
 * an error.
 *
 * To enanble Contentful you must
 * 1. Create a new Space on contentful.com
 * 2. Import the Contentful Model from @narative/gatsby-theme-novela/conteful
 * 3. Add .env to www/ (see www/env.example)
 * 4. Enable contentful as a source in this file for @narative/gatsby-theme-novela
 */
if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
  plugins.push({
    resolve: "gatsby-source-contentful",
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  });
}

module.exports = {
  siteMetadata,
  plugins,
};
