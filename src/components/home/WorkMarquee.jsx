import React from 'react';
import { portfolioProjects } from '../../data/portfolioData';

const BEHANCE_URL = 'https://www.behance.net/iconictechglbltd';

export default function WorkMarquee() {
  // Even index projects in row 1, odd index projects in row 2 for diverse category balance
  const row1Projects = portfolioProjects.filter((_, idx) => idx % 2 === 0);
  const row2Projects = portfolioProjects.filter((_, idx) => idx % 2 === 1);

  // Duplicate arrays to ensure seamless infinite looping without gaps
  const row1Duplicated = [...row1Projects, ...row1Projects];
  const row2Duplicated = [...row2Projects, ...row2Projects];

  return (
    <div className="work-area has_fade_anim">
      <div className="container-hd">
        <div className="work-area-inner pt-0 pb-0">
          <div className="works-wrapper-box">
            {/* Top Marquee Row (Scrolling Left) */}
            <div className="marquee-container" style={{ marginBottom: "8px", padding: 0 }}>
              <div className="marquee-track marquee-left">
                {row1Duplicated.map((project, index) => (
                  <a
                    href={BEHANCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-box"
                    key={`row1-${project.id}-${index}`}
                    title={`${project.title} - View on Behance`}
                  >
                    <div className="thumb">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        width="680"
                        height="420"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Marquee Row (Scrolling Right) */}
            <div className="marquee-container" style={{ marginBottom: 0, padding: 0 }}>
              <div className="marquee-track marquee-right">
                {row2Duplicated.map((project, index) => (
                  <a
                    href={BEHANCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-box"
                    key={`row2-${project.id}-${index}`}
                    title={`${project.title} - View on Behance`}
                  >
                    <div className="thumb">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        width="680"
                        height="420"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
