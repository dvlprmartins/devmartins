import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import Layout from '../components/PageLayout/index'
import SEO from '../components/SEO'

export default function Template({ data, location }) {
  const { markdownRemark: post } = data
  return (
    <Layout
      location={location}
      crumbLabel={post.frontmatter.title}
      page="post"
      title={post.frontmatter.title}
      titleMainClass="default-page-title"
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt || ' '}
        // image={image}
        pathname={post.frontmatter.path}
        article
      />
      <Helmet title={'Martins - ' + post.frontmatter.title} />
      <hr></hr>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

Template.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
