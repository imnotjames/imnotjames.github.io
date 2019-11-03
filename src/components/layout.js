import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class LayoutHeader extends React.Component {
  render() {
    return (
      <header
          style={{
            position: "relative",
            marginTop: "-2em",
          }}
      >
        <h1
            className="title"
            style={{
              lineHeight: `70px`,
              fontSize: `50px`,
              fontWeight: 200,
              textTransform: `uppercase`,
              textAlign: `left`,
            }}
        >
          <Link
              to={`/`}
              style={{
                textDecoration: `none`,
                color: `inherit`,
                margin: `0 auto`,
                position: `relative`,
                whiteSpace: `nowrap`,
                paddingRight: `30px`,
              }}
          >
            <span className="long-word">Definitively</span> Not
            <span
                className="my-name"
                style={{
                  fontSize: `12px`,
                  position: `absolute`,
                  top: 0,
                  right: `-14px`,
                  transform: "rotate(-90deg)"
                }}
            >
              ( James )
            </span>
          </Link>
        </h1>
        <nav>
          <ul>

            <li>
              <Link to={`/blog/`}>
                Blog
              </Link>
            </li>

            <li>
              <Link to={`/resume/`}>
                Resume
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(28),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <LayoutHeader
            location={location}
            title={title}
          />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}
        </footer>
      </div>
    );
  }
}

export default Layout
