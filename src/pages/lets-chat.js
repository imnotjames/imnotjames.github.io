import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LetsChatPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const siteEmail = data.site.siteMetadata.social.email;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Let's Chat" />
      <h2 style={{textAlign: "center"}}>
        An Open Invitation to Chat
      </h2>

      <section>
        <p>
          I'm an introvert, I'm shy, and I always had a fear of reaching
          out to others in the community.  It's something I'm still not
          entirely past, but I'm better than I've ever been.
          This is not an uncommon story.  It's incredibly prevalent in tech and
          is difficult for people to overcome.  I was worried
          I would be wasting other people's time by reaching out.
        </p>

        <p>
          This is a standing invitation: if you want to talk about
          Software, Hardware, or Startups &mdash;
          I want to talk to you.
        </p>

        <p>
          This applies doubly so for fellow
          {` `}
          <a href="https://recurse.com/">
            Recursers
            <img style={{"height": "1.25em", paddingLeft: "0.25em"}}
              src="/recurse.png" alt="Recurse Center Logo" />
          </a>.
        </p>
      </section>

      <section>
        <h4>I like Getting E-Mail</h4>

        <p>
          I will read nearly every email I receive from anyone interested
          in tech - be you an engineer, student, startup, or well, anyone.
          If you write something you think is worth reading, tell me.
          I will respond to most emails I receive.  The worst thing that
          has ever happened from someone sending me an email is me being
          a little busy and not having the time to respond.
        </p>

        <p>
          You can
          {` `}
          <a href={"mailto:" + siteEmail }>
            send an email to me via { siteEmail }
          </a>.
        </p>
      </section>

      <section>
        <h4>I like Meeting People</h4>

        <p>
          If you're in New York City and want to talk about tech -
          <b> I'll buy you coffee, no questions asked</b>.
        </p>

        <p>
          Software, hardware, or anything in between.
          I'm normally wandering lower Manhattan, but often trek out to
          Brooklyn for climbing.  E-Mail me and we can figure out a time
          and local coffee shop!
        </p>
      </section>

      <hr />

      <small>
        Shamelessly inspired by <a href={"https://www.kalzumeus.com/standing-invitation/"}>Patrick McKenzie</a>.
      </small>
    </Layout>
  );
}

export default LetsChatPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          email
        }
      }
    }
  }
`;
