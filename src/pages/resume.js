import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const WORK_LIMIT = 4;

class ResumeExperience extends React.Component {
  render() {
    const { experience } = this.props;

    /*
            <ul>
              {% for highlight in experience.highlights %}
              <li>{{highlight}}</li>
              {% endfor %}
            </ul>
     */

    return (
        <article>
          <h3 className="title">{experience.position}</h3>
          <h4 className="organization">
            <Link to={experience.website || '#'}>
              {experience.company}
            </Link>
          </h4>
          <h5 className="timeframe">
            <span title={ experience.startDate }>
              {experience.startDate}
            </span>
            &mdash;
            <span title={ experience.endDate || 'Current' }>
              {experience.endDate || 'Current' }
            </span>
          </h5>
          <blockquote>
            { experience.summary }
          </blockquote>
        </article>
    );
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
            <header className="clearfix">
              <div className="rightColumn">
                <h1>
                  {resume.basics.name}
                </h1>
                <span className="level">Level 13</span>
                <span className="position">
                  {resume.basics.label}
                </span>
              </div>
              <div className="leftColumn">
                <div className="contact contact-email">
                  <Link to={`mailto:${resume.basics.email}`}>
                    Email: {resume.basics.email}
                  </Link>
                </div>
                { resume.basics.profiles.map(profile => (
                    <div className={'contact'} key={profile.network}>
                      <Link to={profile.url}>{profile.network}: {profile.username}</Link>
                    </div>
                ))}
              </div>
            </header>

            <div className="rightColumn">
              <section id="skills_tools">
                <header title="In order of what makes the list visually pleasing">
                  <h2 className="title">
                    Tools I Use
                  </h2>
                </header>
                <ul>
                  { resume.skills.map(skill => (
                      <li key={skill.name} title={ skill.keywords.join(', ') }>{skill.name}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="leftColumn">
              <section id="about_summary">
                <header>
                  <h2 className="title">
                    Summary
                  </h2>
                </header>
                <blockquote>
                  {resume.basics.summary}
                </blockquote>
              </section>

              <section id="about_experience">
                <header>
                  <h2 className="title">
                    Experience Points
                  </h2>
                </header>

                {resume.work.slice(0, WORK_LIMIT).map(xp => (<ResumeExperience experience={xp} />))}

              </section>

              { resume.work.length > WORK_LIMIT ? extraXPAvailable : ``}
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
                highlights
                position
                startDate
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
