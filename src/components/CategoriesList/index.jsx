import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"

import Title from "components/Title"
import Divider from "components/Divider"

const CategoriesListWrapper = styled.div`
  margin-bottom: 60px;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const CategoriesWrapper = styled.div`
  position: relative;
  top: 0;
  transition: all 0.5s;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`

const CategoriesInform = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.tertiaryText};

  & > span {
    margin: 0 5px;
  }
`

const Date = styled.p`
  font-size: 14.4px;
`

const PostCount = styled.p`
  font-size: 14.4px;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const CategoriesList = ({ categoriesList }) => {
  const [categoriesCount, setCategoriesCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && categoriesCount < categoriesList.length) {
      setTimeout(() => setCategoriesCount(categoriesCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [categoriesCount, categoriesList])

  useEffect(() => {
    setCategoriesCount(10)
  }, [categoriesList])

  return (
    <CategoriesListWrapper>
      {categoriesList.slice(0, categoriesCount).map((categories, i) => {
        return (
          <>
            <CategoriesWrapper>
              <Title size="bg">
                <Link
                  to={`/categories/${_.replace(categories.name, /\s/g, "-")}`}
                >
                  {categories.name} ({categories.posts.length})
                </Link>
              </Title>
              <CategoriesInform>
                <Date>Last updated on {categories.lastUpdated}</Date>
              </CategoriesInform>
            </CategoriesWrapper>

            {categoriesCount - 1 !== i && categoriesList.length - 1 !== i && (
              <Divider mt="48px" mb="32px" />
            )}
          </>
        )
      })}
    </CategoriesListWrapper>
  )
}

export default CategoriesList
