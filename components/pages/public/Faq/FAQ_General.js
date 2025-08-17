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
];

const SectionData = {
  title: 'General',
  paragraphs: [`Frequently Asked Questions`],
};
const FAQ_General = () => {
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

export default FAQ_General;
