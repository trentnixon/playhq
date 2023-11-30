import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Section from "../UI/DefaultSection";

const faqs = [
    {
      question: "How do I access the digital assets?",
      answer: "Your assets, including weekly reports, are automatically scheduled for creation on a designated day of your choice. Once generated, we'll send a secure link to your email, leading to your personalized content hub. Here, you can view, review, and download any assets you need."
    },
    {
      question: "Can I download the digital assets?",
      answer: "Absolutely! After accessing your content hub via the provided secure link, you have the freedom to download any assets as per your requirements."
    },
    {
      question: "Can I use the digital assets for commercial purposes?",
      answer: "Yes, you have full rights to the assets, making them available for your commercial use."
    },
    {
      question: "How often are new digital assets added to the website?",
      answer: "We're open to requests for new types of assets. However, developing these assets may take some time, depending on their popularity and relevance."
    },
    {
      question: "Can I preview the digital assets before purchasing a subscription?",
      answer: "We offer a two-week free trial for all clubs and associations, allowing you to test and evaluate our assets to ensure they align with your club's needs."
    },
    {
      question: "Can I customize the AI-generated materials for my club or association?",
      answer: "With our bespoke graphics package, you can collaborate with Fixtura to adapt your designs to our platform. This service is available for a one-time fee of $399."
    },
    {
      question: "Are the digital assets only for cricket clubs and associations, or can they be used by other organizations?",
      answer: "Our digital assets are exclusively designed for cricket clubs and associations."
    },
    {
      question: "Can I request a specific type of digital asset that is not currently available on the website?",
      answer: "We welcome requests for new asset types. However, please note that the creation of these assets is subject to resource availability and may not always be feasible."
    },
  ];
  

const SectionData = {
  title: "Content and Customization",
  paragraphs: [
    `Frequently Asked Questions`,
  ],
};
const FAQ_ContentandCustomization = () => {
  return (
    <>
    <Section {...SectionData} color="grey">
    <div className="faq-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="faq-accordion">
                <Accordion allowZeroExpanded preExpanded={["a"]}>
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

export default FAQ_ContentandCustomization;
