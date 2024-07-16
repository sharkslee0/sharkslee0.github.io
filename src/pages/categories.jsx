import React from "react"
import { flow, map, groupBy, sortBy, filter, reverse } from "lodash/fp"
import styled from "styled-components"
import SEO from "components/SEO"

import { graphql, Link } from "gatsby"

import Layout from "components/Layout"
import Title from "components/Title"
import CategoriesList from "components/CategoriesList"
import VerticleSpace from "components/VerticalSpace"
import NoContent from "components/NoContent"

import { title, description, siteUrl } from "../../blog-config"

const TagListWrapper = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const CategoriesPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const categories = flow(
    map(post => ({ ...post.frontmatter, slug: post.fields.slug })),
    groupBy("category"),
    map(categories => ({
      name: categories[0].category,
      posts: categories,
      lastUpdated: categories[0].date,
    })),
    sortBy(categories => new Date(categories.lastUpdated)),
    filter(categories => categories.name),
    reverse
  )(posts)

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <TagListWrapper>
        {categories.length > 0 && (
          <Title size="sm">There are {categories.length} categories.</Title>
        )}
      </TagListWrapper>

      {categories.length === 0 && <NoContent name="categories" />}

      <VerticleSpace size={32} />

      <CategoriesList categoriesList={categories} />
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          category
        }
      }
    }
  }
`
