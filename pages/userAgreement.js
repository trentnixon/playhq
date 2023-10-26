import React from "react";
import PageBanner from "../components/Common/PageBanner";
import Meta from "../components/Layouts/Meta";

const TermsConditions = () => {
  return (
    <>
      <Meta
        title="User Agreements - Fixtura: Our Commitment to You"
        description="Understand your rights and responsibilities as a user of Fixtura's digital media tools for sports clubs. Our agreement ensures mutual respect and understanding."
        keywords="User agreements, Fixtura user terms, sports club rights, digital media responsibilities, user commitment"
      />
      <PageBanner
        pageTitle="User Agreement"
        BGImage="/images/BG-Images/f157110576.jpg"
        position={`top center`}
      />

      <div className="text-container ptb-100">
        <div className="container">
          <h1>USER AGREEMENT</h1>
          <p>
            This User Agreement (&quot;Agreement&quot;) is between Fixtura and
            the cricket associations (each, a &quot;Party&quot; and together,
            the &quot;Parties&quot;). This Agreement outlines the terms and
            conditions under which Fixtura will access and use the PLAYHQ API
            and player game data, as well as the storage and access to such
            data.
          </p>
          <h2>Purpose of Agreement</h2>
          <p>
            Fixtura requires access to the PLAYHQ API and player game data in
            order to provide personalized digital assets to subscribed users.
            These assets may include video content, images, and AI-generated
            content that is tailored to the specific needs and goals of our
            clients.
          </p>
          <h2>Use of PLAYHQ API and Player Game Data</h2>
          <p>
            Fixtura will use the PLAYHQ API and player game data solely for the
            purpose of creating personalized digital assets for subscribed
            users. This data will not be used for any other purpose, and Fixtura
            will not share or disclose this data to any third party.
          </p>
          <h2>Storage and Access to Data</h2>
          <p>
            Fixtura will store the PLAYHQ API and player game data in a secure
            manner, and access to this data will be restricted to authorized
            Fixtura personnel and subscribed users only. The data will be
            retained for as long as necessary to fulfill the purposes outlined
            in this Agreement, and will be securely deleted upon termination of
            this Agreement or upon request by the cricket associations.
          </p>
          <h2>Compliance with Data Protection Regulations</h2>
          <p>
            Fixtura will comply with all relevant data protection regulations,
            including but not limited to the General Data Protection Regulation
            (GDPR), in relation to the collection, use, and storage of the
            PLAYHQ API and player game data.
          </p>
          <p>
            By accepting this Agreement, the cricket associations confirm that
            they have read, understood, and agree to the terms and conditions
            outlined above.
          </p>
          <p>Date: [Insert Date]</p>
          <p>Signed,</p>
          <p>
            [Insert Name and Title of Authorized Representative for Fixtura]
          </p>
          <p>
            [Insert Name and Title of Authorized Representative for Cricket
            Associations]
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;

/*
This User Agreement ("Agreement") is between Fixtura and the cricket associations (each, a "Party" and together, the "Parties"). This Agreement outlines the terms and conditions under which Fixtura will access and use the PLAYHQ API and player game data, as well as the storage and access to such data.

Purpose of Agreement
Fixtura requires access to the PLAYHQ API and player game data in order to provide personalized digital assets to subscribed users. These assets may include video content, images, and AI-generated content that is tailored to the specific needs and goals of our clients.

Use of PLAYHQ API and Player Game Data
Fixtura will use the PLAYHQ API and player game data solely for the purpose of creating personalized digital assets for subscribed users. This data will not be used for any other purpose, and Fixtura will not share or disclose this data to any third party.

Storage and Access to Data
Fixtura will store the PLAYHQ API and player game data in a secure manner, and access to this data will be restricted to authorized Fixtura personnel and subscribed users only. The data will be retained for as long as necessary to fulfill the purposes outlined in this Agreement, and will be securely deleted upon termination of this Agreement or upon request by the cricket associations.

Compliance with Data Protection Regulations
Fixtura will comply with all relevant data protection regulations, including but not limited to the General Data Protection Regulation (GDPR), in relation to the collection, use, and storage of the PLAYHQ API and player game data.

By accepting this Agreement, the cricket associations confirm that they have read, understood, and agree to the terms and conditions outlined above.

Date: [Insert Date]

Signed,
[Insert Name and Title of Authorized Representative for Fixtura]
[Insert Name and Title of Authorized Representative for Cricket Associations]
*/
