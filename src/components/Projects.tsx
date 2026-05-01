
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Projects.css';

const Projects: React.FC = () => {
  return (
    <div className="projects-section dark-bg">
      <div className="projects-container">
        <div className="Brinqo-section-title center">
          <h2>
            Have a wide range of{' '}
            <span className="Brinqo-title-animation">
              creative projects
              <span className="Brinqo-title-icon">
                <img src="https://img.icons8.com/fluency/48/star.png" alt="Star decoration" />
              </span>
            </span>
          </h2>
        </div>
      </div>

      {/* SWIPER SLIDER */}
      <Swiper
        modules={[Pagination, Mousewheel]}
        spaceBetween={24}
        direction="horizontal"
        mousewheel={{
          releaseOnEdges: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 18,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1600: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
        }}
        className="Brinqo-project-slider"
      >
        {/* PROJECT 1: PRODUCT DESIGN */}
        <SwiperSlide>
          <div className="Brinqo-project-thumb">
            <img src="https://picsum.photos/seed/brinqo-p1/800/600" alt="Product Design Project" referrerPolicy="no-referrer" />
            <div className="Brinqo-project-wrap">
              <div className="Brinqo-project-data">
                <a href="#">
                  <h3>Product Design</h3>
                </a>
                <p>Developing the look and feel of physical products, aesthetics, and functionality.</p>
              </div>
              <div className="Brinqo-project-icon">
                <a href="#" aria-label="View Product Design">
                  <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.9795 2C19.9795 2 20.5 8 25.9795 11.2C28.4887 12.6653 31.9795 14 31.9795 14M31.9795 14H2M31.9795 14C31.9795 14 28.5339 15.415 25.9795 16.8C19.9795 20.0533 19.9795 26 19.9795 26"
                      stroke="#FDFDE1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* PROJECT 2: LOGO & BRANDING */}
        <SwiperSlide>
          <div className="Brinqo-project-thumb">
            <img src="https://picsum.photos/seed/brinqo-p2/800/600" alt="Logo and Branding Project" referrerPolicy="no-referrer" />
            <div className="Brinqo-project-wrap">
              <div className="Brinqo-project-data">
                <a href="#">
                  <h3>Logo and Branding</h3>
                </a>
                <p>Creating or refreshing a company's logo and developing a cohesive visual identity.</p>
              </div>
              <div className="Brinqo-project-icon">
                <a href="#" aria-label="View Logo and Branding">
                  <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.9795 2C19.9795 2 20.5 8 25.9795 11.2C28.4887 12.6653 31.9795 14 31.9795 14M31.9795 14H2M31.9795 14C31.9795 14 28.5339 15.415 25.9795 16.8C19.9795 20.0533 19.9795 26 19.9795 26"
                      stroke="#FDFDE1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* PROJECT 3: APP UI/UX DESIGN */}
        <SwiperSlide>
          <div className="Brinqo-project-thumb">
            <img src="https://picsum.photos/seed/brinqo-p3/800/600" alt="App UI/UX Design Project" referrerPolicy="no-referrer" />
            <div className="Brinqo-project-wrap">
              <div className="Brinqo-project-data">
                <a href="#">
                  <h3>App UI/UX Design</h3>
                </a>
                <p>Designing the UI/UX for mobile apps and web applications to ensure usability &amp; engagement.</p>
              </div>
              <div className="Brinqo-project-icon">
                <a href="#" aria-label="View App UI/UX Design">
                  <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.9795 2C19.9795 2 20.5 8 25.9795 11.2C28.4887 12.6653 31.9795 14 31.9795 14M31.9795 14H2M31.9795 14C31.9795 14 28.5339 15.415 25.9795 16.8C19.9795 20.0533 19.9795 26 19.9795 26"
                      stroke="#FDFDE1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* PROJECT 4: PACKAGING DESIGN */}
        <SwiperSlide>
          <div className="Brinqo-project-thumb">
            <img src="https://picsum.photos/seed/brinqo-p4/800/600" alt="Packaging Design Project" referrerPolicy="no-referrer" />
            <div className="Brinqo-project-wrap">
              <div className="Brinqo-project-data">
                <a href="#">
                  <h3>Packaging Design</h3>
                </a>
                <p>Creating packaging solutions for products that not only protect attract customers on store.</p>
              </div>
              <div className="Brinqo-project-icon">
                <a href="#" aria-label="View Packaging Design">
                  <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.9795 2C19.9795 2 20.5 8 25.9795 11.2C28.4887 12.6653 31.9795 14 31.9795 14M31.9795 14H2M31.9795 14C31.9795 14 28.5339 15.415 25.9795 16.8C19.9795 20.0533 19.9795 26 19.9795 26"
                      stroke="#FDFDE1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SWIPER PAGINATION - Progress Indicators */}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Projects;
