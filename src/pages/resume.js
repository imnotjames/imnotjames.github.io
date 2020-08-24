import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const WORK_LIMIT = 4;

function ResumeExperience ({ experience }) {
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
      <article>
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
            <a
                style={{
                  color: `inherit`,
                  textDecoration: `none`,
                }}
                href={experience.website || '#'}
              >
              {experience.company}
            </a>
          </h4>
          <h5 style={{ margin: 0 }}>
            <span title={ experience.startDate }>
              {experience.startMonth} {experience.startYear}
            </span>
            {` `}
            &mdash;
            {` `}
            <span title={ experience.endDate || 'Current' }>
              {experience.endMonth} {experience.endYear || 'Current' }
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

function ResumeHeader({ name, label, email, profiles }) {
  return (
      <header
          style={{
            display: "flex",
            width: "100%",
            marginBottom: `18px`,
          }}
        >
        <div style={{
          textAlign: "right",
          marginLeft: 'auto',
          order: 2,
        }}>
          <h1
              style={{
                fontSize: `28px`,
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

function ResumeSectionHeader({ style, children, ...props }) {

  return (
      <header
          {...props}
          style={{
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
              lineHeight: `16px`,
              letterSpacing: `2px`,
              textTransform: `uppercase`,
              fontWeight: `bold`,
              backgroundColor: `#FFF`,
              paddingRight: `4px`,
              whiteSpace: `nowrap`,
              overflow: `hidden`,
            }}
          >
          {children}
        </h2>
      </header>
  )
}

function ResumeSection ({ style, children, ...props }) {
  return (
      <section
          {...props}
          style={{
            display: `flex`,
            flexDirection: `column`,
            rowGap: `16px`,
            ...style
          }}
      >
        { children }
      </section>
  )
}

function ResumeIndex(
    {
        data: {
            site: {
              siteMetadata: {
                title: siteTitle
              }
            },
            resumeJson: resume
        },
        location
    }
) {
  const work = resume.work.slice(0, WORK_LIMIT);

  const earliestDisplayedWork = work.length > 0 ? work[work.length - 1] : null;

  const extraXPAvailable = (
      <footer>
        <small
            style={{
              fontSize: '12px'
            }}
          >
          Experience points truncated for optimal viewing.
          Points prior to
          {earliestDisplayedWork ? ` ${earliestDisplayedWork.startMonth} ${earliestDisplayedWork.startYear} ` : ' these '}
          available upon request.
        </small>
      </footer>
  );

  return (
      <Layout location={location} title={siteTitle}>
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
                gap: '42px',
                flexDirection: `row`,
              }}
            >

            <ResumeSection
                style={{
                  order: 0,
                  flex: 1
                }}
            >
              <ResumeSection>
                <ResumeSectionHeader style={{ marginBottom: '0px' }}>
                  Experience Points
                </ResumeSectionHeader>

                {work.map(xp => (<ResumeExperience experience={xp} />))}

              </ResumeSection>
            </ResumeSection>

            <ResumeSection
                style={{
                  order: 1,
                  flex: 0,
                  minWidth: `140px`,
                }}
              >
              <ResumeSectionHeader
                  title={`In order of what makes the list visually pleasing`}
                >
                  Tools I Enjoy
              </ResumeSectionHeader>
              <ul style={{ padding: 0, margin: 0 }}>
                { resume.skills.map(skill => (
                    <li
                        key={skill.name}
                        style={{
                          listStyle: `none`,
                          textAlign: `right`,
                          fontSize: `16px`,
                          lineHeight: `22px`,
                          margin: 0,
                        }}
                      >
                        {skill.name}
                        <div
                          style={{
                            fontSize: '10px'
                          }}
                        >
                          { skill.keywords.map(k => k.replace(/\s/, "\xa0")).join(', ') }
                        </div>
                    </li>
                ))}
              </ul>
            </ResumeSection>
          </div>

          { resume.work.length > WORK_LIMIT ? extraXPAvailable : ``}
        </div>
      </Layout>
  )
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
                endMonth:endDate(formatString: "MMMM")
                endYear:endDate(formatString: "YYYY")
                highlights
                position
                startDate
                startMonth:startDate(formatString: "MMMM")
                startYear:startDate(formatString: "YYYY")
                website
            }
            languages {
                fluency
                language
            }
        }
    }
`;
