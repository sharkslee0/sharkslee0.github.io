import React from "react"
import Giscus from "@giscus/react"

const MyGiscus = ({ theme }) => {
  return (
    <Giscus
      id="comments"
      repo="sharkslee0/giscus"
      repoId="R_kgDOJqNN5Q"
      category="Announcements"
      categoryId="DIC_kwDOJqNN5c4CW4sz"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
      async="true"
    />
  )
}

export default MyGiscus
