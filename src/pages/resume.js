import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const WORK_LIMIT = 3;

class ResumeExperience extends React.Component {
  render() {
    const { experience } = this.props;

    const highlightsList = (
        <ul style={{padding: 0, marginBottom: 0}}>
          {experience.highlights.map(hl => (
              <li
                  key={hl}
                  style={{
                    fontSize: `14px`,
                    lineHeight: `22px`,
                    marginBottom: `4px`,
                  }}>
                {hl}
              </li>
          ))}
        </ul>
    );

    return (
        <article
            style={{
              marginBottom: `14px`,
            }}
          >
          <header
              style={{
                marginBottom: `14px`,
              }}
            >
            <h3
                style={{
                  fontSize: `20px`,
                  display: "inline-block",
                  margin: 0,
                  marginRight: `14px`,
                  padding: 0,
                }}
              >
              {experience.position}
            </h3>
            <h4
                style={{
                  display: "inline-block",
                  margin: 0,
                  padding: 0,
                }}
              >
              <Link
                  style={{
                    color: `inherit`,
                    textDecoration: `none`,
                  }}
                  to={experience.website || '#'}
                >
                {experience.company}
              </Link>
            </h4>
            <h5 style={{ margin: 0 }}>
              <span title={ experience.startDate }>
                {experience.startYear}
              </span>
              {` `}
              &mdash;
              {` `}
              <span title={ experience.endDate || 'Current' }>
                {experience.endYear || 'Current' }
              </span>
            </h5>
          </header>
          <blockquote
              style={{
                margin: 0,
                padding: 0,
                fontSize: `14px`,
                lineHeight: `22px`,
              }}
            >
            { experience.summary }
          </blockquote>
          { experience.highlights.length > 0 ? highlightsList : `` }
        </article>
    );
  }
}

class ResumeHeader extends React.Component {
  render() {
    const { name, label, email, profiles } = this.props;

    return (
        <header
            style={{
              display: "flex",
              width: "100%",
              marginBottom: `24px`,
            }}
          >
          <div style={{
            textAlign: "right",
            marginLeft: 'auto',
            order: 2,
          }}>
            <h1
                style={{
                  fontSize: `32px`,
                  margin: 0,
                }}
              >
              {name}
            </h1>
            <span style={{fontSize: `12px`}}>Level 13</span>
            {` `}
            <span style={{fontSize: `18px`}}>{label}</span>
          </div>
          <div
              style={{
                order: 1,
              }}
          >
            <div className="contact contact-email">
              <a style={{textDecoration: "none"}} href={`mailto:${email}`}>
                Email: {email}
              </a>
            </div>
            { profiles.map(profile => (
                <div className={'contact'} key={profile.network}>
                  <a style={{textDecoration: "none"}} href={profile.url}>
                    {profile.network}: {profile.username}
                  </a>
                </div>
            ))}
          </div>
        </header>
    );
  }
}

class ResumeSectionHeader extends React.Component {
  render() {
    const { style, ...props } = this.props;

    return (
        <header
            {...props}
            style={{
              marginBottom: `18px`,
              height: `8px`,
              lineHeight: `12px`,
              borderBottom: `1px solid black`,
              ...style,
            }}
          >
          <h2
              style={{
                margin: 0,
                display: `inline-block`,
                fontSize: `12px`,
                letterSpacing: `2px`,
                textTransform: `uppercase`,
                fontWeight: `bold`,
                backgroundColor: `#FFF`,
                paddingRight: `4px`,
                whiteSpace: `nowrap`,
                overflowX: `hidden`,
              }}
            >
            {this.props.children}
          </h2>
        </header>
    )
  }
}

class ResumeIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const resume = data.resumeJson;

    const extraXPAvailable = (
        <footer>
          <small>
            Experience points truncated for optimal viewing.
            More available upon request.
          </small>
        </footer>
    );

    return (
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Resume - James Ward" />
          <div>
            <ResumeHeader
                name={resume.basics.name}
                label={resume.basics.label}
                email={resume.basics.email}
                profiles={resume.basics.profiles}
              />

            <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                }}
              >

              <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    rowGap: `18px`,
                  }}
                >
                <section>
                  <ResumeSectionHeader>
                    Summary
                  </ResumeSectionHeader>
                  <blockquote
                      style={{
                        margin: 0,
                        padding: 0,
                        fontSize: `14px`,
                        lineHeight: `22px`,
                      }}
                    >
                    {resume.basics.summary}
                  </blockquote>
                </section>

                <section>
                  <ResumeSectionHeader>
                    Experience Points
                  </ResumeSectionHeader>

                  {resume.work.slice(0, WORK_LIMIT).map(xp => (<ResumeExperience experience={xp} />))}

                </section>

                { resume.work.length > WORK_LIMIT ? extraXPAvailable : ``}
              </div>
              <section
                  style={{
                    order: 1,
                    marginLeft: `42px`,
                    minWidth: `160px`,
                  }}
                >
                <ResumeSectionHeader
                    title={`In order of what makes the list visually pleasing`}
                  >
                    Tools I Use
                </ResumeSectionHeader>
                <ul style={{ padding: 0, margin: 0 }}>
                  { resume.skills.map(skill => (
                      <li
                          key={skill.name}
                          title={ skill.keywords.join(', ') }
                          style={{
                            listStyle: `none`,
                            textAlign: `right`,
                            fontSize: `16px`,
                            lineHeight: `22px`,
                            margin: 0,
                          }}
                        >
                          {skill.name}
                      </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Layout>
    )
  }
}

export default ResumeIndex

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
        resumeJson {
            basics {
                email
                label
                location {
                    city
                    countryCode
                    region
                }
                name
                profiles {
                    network
                    url
                    username
                }
                summary
                website
            }
            skills {
                keywords
                level
                name
            }
            work {
                company
                endDate
                endYear:endDate(formatString: "YYYY")
                highlights
                position
                startDate
                startYear:startDate(formatString: "YYYY")
                summary
                website
            }
            languages {
                fluency
                language
            }
        }
    }
`;
