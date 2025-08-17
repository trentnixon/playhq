import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Section from '../UI/DefaultSection';

const faqs = [
  {
    question: 'How do I access the digital assets?',
    answer:
      "The digital assets can be accessed through the website or through any software or system that has been set up to integrate with the website's API.",
  },
  {
    question: 'How do I purchase a subscription for the digital assets?',
    answer:
      'To purchase a subscription for the digital assets, you can follow the instructions on the website to create an account and complete the payment process using the payment gateway, such as Stripe.',
  },
  {
    question: 'Can I download the digital assets?',
    answer:
      "The ability to download the digital assets will depend on the specific subscription and licensing agreement. It is recommended to review the terms of use or contact the website's customer support for more information on download availability.",
  },
  {
    question: 'Can I use the digital assets for commercial purposes?',
    answer:
      "The ability to use the digital assets for commercial purposes will depend on the specific subscription and licensing agreement. It is recommended to review the terms of use or contact the website's customer support for more information on commercial use.",
  },
  {
    question: 'How often are new digital assets added to the website?',
    answer:
      "The frequency of new digital asset releases will depend on the website's production schedule and resources. It is recommended to follow the website's newsletter or social media accounts to stay informed about new releases.",
  },
  {
    question: 'How accurate is the data in the AI-generated materials?',
    answer:
      'The accuracy of the data in the AI-generated materials will depend on the quality and reliability of the source data. The website uses PLAYHQ as the source for all data within the assets, and GTP-3 as the AI source for all AI-generated materials.',
  },
  {
    question:
      'Is my personal information kept private when I purchase a subscription?',
    answer:
      'Fixtura is committed to protecting your privacy and personal information. Please review our privacy policy for more information on how we collect, use, and share your personal information.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      "The ability to cancel a subscription will depend on the specific subscription and payment provider. It is recommended to review the terms of use or contact the website's customer support for instructions on cancelling your subscription.",
  },
  {
    question: 'How do I contact customer support?',
    answer:
      "You can contact the website's customer support through the contact form on the website, or by emailing or calling the support team using the contact information provided on the website.",
  },
  {
    question: 'Can I request a refund for my subscription?',
    answer:
      "The availability of refunds will depend on the specific subscription and payment provider, as well as the terms of use for the digital assets. It is recommended to review the terms of use or contact the website's customer support for more information on requesting a refund.",
  },
  {
    question:
      'Can I suggest new features or improvements for the website or digital assets?',
    answer:
      "We welcome feedback and suggestions for new features or improvements to the website and digital assets. You can submit your ideas through the website's feedback form or by contacting the customer support team.",
  },
  {
    question:
      'Do you offer any discounts for large orders or long-term subscriptions?',
    answer:
      "The website may offer discounts for large orders or long-term subscriptions. It is recommended to contact the website's customer support for more information on available discounts.",
  },
  {
    question: 'How do you protect my personal information?',
    answer:
      'Fixtura takes reasonable measures to protect your personal information from unauthorized access, use, or disclosure. Please review our privacy policy for more information on how we protect your personal information.',
  },
  {
    question:
      'Do you offer any guarantees or warranties for the website or digital assets?',
    answer:
      "The website may offer guarantees or warranties for the website or digital assets. It is recommended to review the terms of use or contact the website's customer support for more information on available guarantees or warranties.",
  },
  {
    question: 'What types of digital assets are available on the website?',
    answer:
      'The website offers videos, images, and AI-generated match reports, emails, and write-ups as digital assets.',
  },
  {
    question:
      'Can I preview the digital assets before purchasing a subscription?',
    answer:
      'It is possible that some digital assets may be available for preview on the website, but this will depend on the specific assets and whether the website has made them available for preview.',
  },
  {
    question: 'How do I access the AI-generated materials?',
    answer:
      "The AI-generated materials can be accessed through the website or through any software or system that has been set up to integrate with the website's API.",
  },
  {
    question:
      'Can I customize the AI-generated materials for my club or association?',
    answer:
      "It is possible that the website may offer customization options for the AI-generated materials, such as the ability to input specific team or player information. It is recommended to contact the website's customer support for more information on customization options.",
  },
  {
    question:
      'Are the digital assets only for cricket clubs and associations, or can they be used by other organizations?',
    answer:
      "The digital assets on the website are primarily intended for use by cricket clubs and associations, but they may also be suitable for other sports organizations or other types of organizations. It is recommended to contact the website's customer support for more information on the suitability of the digital assets for your specific needs.",
  },
  {
    question:
      'Are the digital assets compatible with all devices and software?',
    answer:
      "The digital assets should be compatible with most devices and software, but it is recommended to check with the website or the specific digital asset's documentation for more information on compatibility. The website may also have specific system requirements or recommended software for optimal use of the assets.",
  },
  {
    question:
      'How do I stay up to date on new digital assets and features on the website?',
    answer:
      "The website may have a newsletter or other communication channels through which they announce new digital assets and features. It is recommended to sign up for the newsletter or follow the website's social media accounts to stay informed about updates.",
  },
  {
    question:
      'Can I request a specific type of digital asset that is not currently available on the website?',
    answer:
      "It is possible to request specific types of digital assets from the website, but it will depend on the website's ability and resources to create the requested asset. It is recommended to contact the website's customer support to inquire about the possibility of creating a custom digital asset.",
  },
  {
    question:
      'How do I access the digital assets once I have purchased a subscription?',
    answer:
      'Once you have purchased a subscription, you should receive instructions on how to access the digital assets. This may involve logging in to your account on the website, or accessing the assets through a specific software or system.',
  },
  {
    question:
      'Can I share the digital assets with other members of my club or association?',
    answer:
      "The terms of use for the digital assets will depend on the specific subscription and licensing agreement. It is recommended to review the terms of use or contact the website's customer support for more information on sharing the digital assets.",
  },
  {
    question: 'Are the digital assets suitable for all age groups?',
    answer:
      "The suitability of the digital assets for different age groups will depend on the specific assets and their content. It is recommended to review the assets or contact the website's customer support for more information on the age appropriateness of the assets.",
  },
  {
    question: 'How do I provide feedback on the digital assets or the website?',
    answer:
      'The website may have a feedback form or other means of submitting feedback. It is recommended to use these channels to provide feedback on the digital assets or the website.',
  },
  {
    question: 'Can I access the digital assets from multiple devices?',
    answer:
      "The ability to access the digital assets from multiple devices will depend on the specific subscription and licensing agreement. It is recommended to review the terms of use or contact the website's customer support for more information on device access.",
  },
  {
    question:
      'Can I purchase a subscription for a limited time period, or is it a long-term commitment?',
    answer:
      "The website may offer subscriptions for different time periods, such as monthly, annually, or for a specific event. It is recommended to review the subscription options on the website or contact the website's customer support for more information.",
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      "The process for cancelling a subscription will depend on the specific subscription and payment provider. It is recommended to review the terms of use or contact the website's customer support for instructions on cancelling your subscription.",
  },
];

const SectionData = {
  title: 'Access and Usage',
  paragraphs: [`Frequently Asked Questions`],
};
const FAQ_AccessandUsage = () => {
  return (
    <>
      <Section {...SectionData} color='light'>
        <div className='faq-area ptb-100'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-12'>
                <div className='faq-accordion'>
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    {faqs.map((faq, i) => {
                      return (
                        <AccordionItem uuid={i} key={i}>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              {faq.question}
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <p>{faq.answer}</p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default FAQ_AccessandUsage;
