module.exports = {
  siteMetadata: {
    title: `歌詞大好き`,
    description: `歌詞歌詞歌詞大スキ`,
    github: `https://github.com/aulb`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-glamor`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
  pathPrefix: `/`
};
