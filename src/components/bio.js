/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const BioContainer = styled.div`
  margin-bottom: 4.375rem;
`;

const Bio = () => {
  const { site } = useStaticQuery(
      graphql`
        query GetBio {
            site {
                siteMetadata {
                    social {
                        email
                        twitter
                        linkedin
                        github
                    }
                }
            }
        }
    `
  );

  const social = site.siteMetadata.social;

  return (
    <BioContainer>
      <p>
        I'm not <i>the</i> James, just a James.
      </p>

      <p>
        I love retro science fiction, video games, comics, food, making things,
        entrepreneurship, and I'm <b>always</b> looking to learn something new.
      </p>

      <p>
        I want to bring incredible people together to make the unbelievable into reality.
        If we approach problems with a thorough understanding of technology and a lot of
        imagination.. anything is possible.
      </p>

      <p>
        Okay?  Let's make something amazing.
      </p>

      <p>
        You can
        {` `}
        <a href={`mailto:${social.email}`}>send me an email</a>,
        {` `}
        <a href={`https://linkedin.com/in/${social.linkedin}`}>connect on LinkedIn</a>,
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>tweet at me</a>,
        {` `}
        or <a href={`https://github.com/${social.github}`}>check out my Github</a>.

      </p>
    </BioContainer>
  );
};

export default Bio
