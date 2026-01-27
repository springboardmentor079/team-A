import { useState } from 'react';
import './Help.css';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Register" button in the top right corner, fill in your details including name, email, and password, then submit the form. You\'ll be logged in automatically.'
        },
        {
          q: 'What is the difference between User and Admin accounts?',
          a: 'Users can create petitions, vote on polls, and submit reports. Admins have additional privileges to sign petitions and manage platform content.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page, enter your email, and you\'ll receive a 6-digit verification code. Enter the code and set your new password.'
        }
      ]
    },
    {
      category: 'Petitions',
      questions: [
        {
          q: 'How do I create a petition?',
          a: 'Navigate to the Petitions page, click "Create New Petition", fill in the title and description, then submit. Your petition will be visible to all users.'
        },
        {
          q: 'Who can sign petitions?',
          a: 'Only Admin users can sign petitions. Regular users can view and create petitions but cannot sign them.'
        },
        {
          q: 'Can I delete my petition?',
          a: 'Currently, petitions cannot be deleted once created. Please ensure your petition details are correct before submitting.'
        }
      ]
    },
    {
      category: 'Polls',
      questions: [
        {
          q: 'How do polls work?',
          a: 'Create a poll with a question and multiple options. Both users and admins can vote. Each person can vote only once per poll.'
        },
        {
          q: 'Can I change my vote?',
          a: 'No, votes are final once submitted. Please review your choice carefully before voting.'
        },
        {
          q: 'How do I see poll results?',
          a: 'Poll results are displayed in real-time on the Polls page, showing the percentage and count for each option.'
        }
      ]
    },
    {
      category: 'Reports',
      questions: [
        {
          q: 'What can I report?',
          a: 'You can report civic issues like infrastructure problems, safety concerns, environmental issues, or any community-related problems.'
        },
        {
          q: 'Can I attach images to reports?',
          a: 'Yes! You can upload images when creating a report to provide visual evidence of the issue.'
        },
        {
          q: 'How do I track my reports?',
          a: 'All your submitted reports are visible on the Reports page and in your Dashboard history.'
        }
      ]
    }
  ];

  const guides = [
    {
      title: 'Creating Your First Petition',
      steps: [
        'Log in to your account',
        'Navigate to the Petitions page',
        'Click "Create New Petition" button',
        'Enter a clear, concise title',
        'Write a detailed description explaining the issue and proposed solution',
        'Submit and share with your community'
      ]
    },
    {
      title: 'Submitting a Report',
      steps: [
        'Go to the Reports page',
        'Click "Create New Report"',
        'Enter the subject of your report',
        'Specify the location of the issue',
        'Provide a detailed description',
        'Upload supporting images (optional)',
        'Submit your report'
      ]
    },
    {
      title: 'Participating in Polls',
      steps: [
        'Browse available polls on the Polls page',
        'Read the poll question carefully',
        'Review all available options',
        'Select your preferred option',
        'Click "Vote" to submit',
        'View real-time results'
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="help-page">
      <div className="help-container">
        <div className="help-header">
          <h1>Help & Support</h1>
          <p>Find answers to common questions and learn how to use the platform</p>
        </div>

        <div className="help-tabs">
          <button 
            className={activeTab === 'faq' ? 'active' : ''} 
            onClick={() => setActiveTab('faq')}
          >
            📋 FAQ
          </button>
          <button 
            className={activeTab === 'guides' ? 'active' : ''} 
            onClick={() => setActiveTab('guides')}
          >
            📖 Guides
          </button>
          <button 
            className={activeTab === 'contact' ? 'active' : ''} 
            onClick={() => setActiveTab('contact')}
          >
            📧 Contact
          </button>
        </div>

        <div className="help-content">
          {activeTab === 'faq' && (
            <div className="faq-section">
              {faqs.map((category, catIndex) => (
                <div key={catIndex} className="faq-category">
                  <h2>{category.category}</h2>
                  <div className="faq-list">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = `${catIndex}-${faqIndex}`;
                      return (
                        <div 
                          key={faqIndex} 
                          className={`faq-item ${openFaq === globalIndex ? 'open' : ''}`}
                        >
                          <div 
                            className="faq-question" 
                            onClick={() => toggleFaq(globalIndex)}
                          >
                            <h3>{faq.q}</h3>
                            <span className="faq-icon">
                              {openFaq === globalIndex ? '−' : '+'}
                            </span>
                          </div>
                          {openFaq === globalIndex && (
                            <div className="faq-answer">
                              <p>{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="guides-section">
              {guides.map((guide, index) => (
                <div key={index} className="guide-card">
                  <h2>{guide.title}</h2>
                  <ol className="guide-steps">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="contact-section">
              <div className="contact-card">
                <h2>Need More Help?</h2>
                <p>If you couldn't find the answer you're looking for, we're here to help!</p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">📧</div>
                    <h3>Email Support</h3>
                    <p>support@civicx.com</p>
                    <span className="response-time">Response within 24 hours</span>
                  </div>
                  
                  <div className="contact-method">
                    <div className="contact-icon">💬</div>
                    <h3>Community Forum</h3>
                    <p>Join our community discussions</p>
                    <span className="response-time">Get help from other users</span>
                  </div>
                  
                  <div className="contact-method">
                    <div className="contact-icon">📱</div>
                    <h3>Social Media</h3>
                    <p>Follow us for updates</p>
                    <span className="response-time">@CivicXPlatform</span>
                  </div>
                </div>

                <div className="quick-tips">
                  <h3>Quick Tips</h3>
                  <ul>
                    <li>🔍 Use the search function to find specific topics</li>
                    <li>📚 Check our guides for step-by-step instructions</li>
                    <li>🔄 Make sure you're using the latest version</li>
                    <li>🔐 Keep your account credentials secure</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
