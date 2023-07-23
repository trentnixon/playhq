import React from "react";

const Partner = ({associations}) => {

  return (
    <>
      <div className="partner-area pt-100 pb-60">
        <div className="container">
          <div className="section-title">
            <h2>Is my Club or Association available?</h2>
            <p>
            Fixtura partners with cricket clubs and associations to provide personalized digital assets that help them connect with their fans and promote their teams and events.
            </p>
            search
          </div>
          <div className="row align-items-center justify-content-center">
    {
      associations.data.slice(0,5).map((ass,i)=>{
        return(
        
            <div className="col-lg-2 col-6 col-sm-4" key={i}>
              <div className="single-partner">
                <a href="#" target="_blank">
                 {/*  <img src="/images/partners/partner1.png" alt="image" /> */}
                 {ass.attributes.Name}
                </a>
              </div>
            </div>
        )
      })
    }
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
