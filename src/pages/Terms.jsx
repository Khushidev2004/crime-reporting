import React, { useState } from "react";
import "./Terms.css"; // External CSS

const Terms = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);

  const toggleAccordion = (index) => {
    if (activeIndex === index) setActiveIndex(null);
    else setActiveIndex(index);
  };

  const termsSections = [
    {
      title: "Introduction",
      content: "Welcome to our platform. Using our services means you agree to these terms and conditions.",
    },
    {
      title: "User Responsibilities",
      content: "Users must ensure that reports are accurate and truthful. Illegal content is strictly prohibited.",
    },
    {
      title: "Privacy Policy",
      content: "We value your privacy. Your data will not be shared without consent except under legal requirements.",
    },
    {
      title: "Content Ownership",
      content: "Users retain ownership of the content they submit but grant us rights to use it for platform purposes.",
    },
    {
      title: "Disclaimer",
      content: "We do not guarantee the accuracy of user-submitted content and disclaim all liability.",
    },
  ];

  // 🔍 Filter according to search keyword
  const filteredSections = termsSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔝 Scroll-to-top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Expand or collapse all sections
  const toggleAll = () => {
    setExpandedAll(!expandedAll);
    setActiveIndex(!expandedAll ? "all" : null);
  };

  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>

      <p className="terms-intro">
        Please read these terms and conditions carefully before using our platform.
        They govern your access and use of the services.
      </p>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search in terms..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🔄 Expand/Collapse all */}
      <div className="expand-toggle">
        <button onClick={toggleAll} className="expand-btn">
          {expandedAll ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Static List */}
      <ul className="terms-list">
        <li>Clear and accurate reporting is essential.</li>
        <li>Respect the rights and privacy of other users.</li>
        <li>Do not submit false or misleading information.</li>
        <li>Compliance with local laws is mandatory.</li>
      </ul>

      {/* Accordion Section */}
      {filteredSections.length > 0 ? (
        filteredSections.map((section, index) => {
          const realIndex = termsSections.indexOf(section); // Actual index from original array
          const isOpen =
            expandedAll || activeIndex === realIndex || activeIndex === "all";

          return (
            <div key={realIndex} className="accordion-item">
              <button
                onClick={() => toggleAccordion(realIndex)}
                className={`accordion-btn ${isOpen ? "active" : ""}`}
              >
                <span className="accordion-number">{realIndex + 1}.</span>
                <span>{section.title}</span>
                <span className={`accordion-icon ${isOpen ? "rotate" : ""}`}>
                  ▶
                </span>
              </button>
              <div className={`accordion-content ${isOpen ? "show" : ""}`}>
                {section.content}
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-results">No matching terms found.</p>
      )}

      <p className="terms-footer">
        © 2025 Crime Reporting Platform. All rights reserved.
      </p>

      {/* 🔝 Scroll to top button */}
      <button className="scroll-top" onClick={scrollToTop}>
        ⬆ Back to Top
      </button>
    </div>
  );
};

export default Terms;