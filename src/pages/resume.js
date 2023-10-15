import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components";
import {When} from "react-if";

const WORK_LIMIT = 4;

const ExperiencePointsList = styled.ul`
  padding: 0 0 0 0.75rem;
  margin-bottom: 0;
  list-style: '▶';
`;

const ExperiencePointsListItem = styled.li`
  font-size: 0.85rem;
  line-height: 1rem;
  margin-bottom: 0.25rem;
  padding-left: 0.25rem;
`;

function ResumeExperience ({ experience, truncated }) {
  const highlights = Array.isArray(experience.highlights) ? experience.highlights : [];

  if (truncated) {
      return (
          <article style={{
              marginBottom: '12px',
          }}>
              <header style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  alignItems: 'center',
                  fontSize: '14px',
              }}>
                  <h3
                      style={{
                          fontSize: `inherit`,
                          margin: 0,
                          padding: 0,
                      }}
                  >
                      {experience.position}
                  </h3>


                  <span style={{ fontSize: '60%' }}>
                      &#x25B6;
                  </span>

                  <h4
                      style={{
                          margin: 0,
                          padding: 0,
                          fontSize: 'inherit',
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
              </header>
              <h5 style={{ margin: 0, fontSize: '12px', }}>
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
          </article>
      )
  }

  return (
      <article
          style={{
              marginBottom: '14px',
          }}
      >
        <header
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                alignItems: 'center',
                fontSize: '20px',
            }}
          >
          <h3
              style={{
                fontSize: `inherit`,
                margin: 0,
                padding: 0,
              }}
            >
            {experience.position}
          </h3>

          <span style={{ fontSize: '60%' }}>
            &#x25B6;
          </span>

          <h4
              style={{
                margin: 0,
                padding: 0,
                fontSize: 'inherit',
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
        </header>
        <h5 style={{ margin: 0, fontSize: '12px' }}>
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

        <blockquote
            style={{
              margin: 0,
              padding: 0,
              marginTop: '8px',
              fontSize: `14px`,
              lineHeight: `22px`,
            }}
          >
          { experience.summary }
        </blockquote>

        <When condition={highlights.length > 0}>
            <ExperiencePointsList>
                {highlights.map(hl => (
                    <ExperiencePointsListItem key={hl}>
                        {hl}
                    </ExperiencePointsListItem>
                ))}
            </ExperiencePointsList>
        </When>
      </article>
  );
}

function ResumeHeader({ name, label, email, profiles }) {
  return (
      <header
          style={{
            display: "flex",
            width: "100%",
            marginBottom: `12px`,
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
                paddingBottom: '8px',
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
              display: 'flex',
                flexDirection: 'column',
                gap: '8px',
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

const ResumeSectionHeaderContainer = styled.header`
  height: 8px;
  line-height: 12px;
  margin-bottom: 18px;
  border-bottom: 1px solid black;
`;

const ResumeSectionHeading = styled.h2`
  margin: 0;
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: #FFF;
  padding-right: 4px;
  white-space: nowrap;
  overflow: hidden;
`;

function ResumeSectionHeader({ children }) {

  return (
      <ResumeSectionHeaderContainer>
        <ResumeSectionHeading>
          {children}
        </ResumeSectionHeading>
      </ResumeSectionHeaderContainer>
  )
}

function ResumeSection ({ style, children, ...props }) {
  return (
      <section
          {...props}
          style={{
            display: `flex`,
            flexDirection: `column`,
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
  const earliestDisplayedWork = resume.work.length >= WORK_LIMIT ? resume.work[WORK_LIMIT - 1] : null;

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
              <ResumeSectionHeader>
                Experience Points
              </ResumeSectionHeader>

              {resume.work.map((xp, index) => (<ResumeExperience key={`${xp?.company}-${xp?.position}-${xp?.startDate}`} experience={xp} truncated={index >= WORK_LIMIT} />))}
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

          <When condition={resume.work.length >= WORK_LIMIT}>
              <footer>
                  <small
                      style={{
                          fontSize: '12px'
                      }}
                  >
                      Experience points truncated for optimal viewing.
                      Detailed points prior to
                      {earliestDisplayedWork ? ` ${earliestDisplayedWork.startMonth} ${earliestDisplayedWork.startYear} ` : ' these '}
                      available upon request.
                  </small>
              </footer>
          </When>
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
                website
            }
            skills {
                keywords
                level
                name
            }
            work {
                summary
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
