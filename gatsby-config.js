module.exports = {
  siteMetadata: {
    title: `Plantmunity Admin Frontend`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-top-layout",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          `Arvo`,
          `Raleway`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Plantmunity`,
        short_name: `Plantmunity`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#5C6D63`,
        display: `standalone`,
        icon: "src/images/PlantmunityIconAlt.png",
      },
    },
  ],
};
