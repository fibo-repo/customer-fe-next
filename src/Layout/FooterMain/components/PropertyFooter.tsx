import React from "react";
import "./PropertyFooter.css";

const PropertyFooter = ({ data }) => {
  //TODO: REMOVE IF NOT NEEDED
  return (
    <div className="footer">
      <h2 className="heading">Stay Guidelines</h2>
      <div className="footer-main">
        <div className="footer-section">
          <h4 style={{ minWidth: "fit-content" }}>House rules</h4>
          <p>Check-in after {data?.checkInTime}</p>
          <p>Checkout before {data?.checkOutTime}</p>
          <p>12 guests maximum</p>
        </div>
        {data?.restrictions &&
          data.restrictions.filter((item) => item.trim().length > 0).length >
            0 && (
            <>
              <div className="footer-section">
                <h4>Restrictions</h4>
                {data.restrictions
                  .filter((item) => item.trim().length > 0)
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
            </>
          )}
        <div className="footer-section-last">
          <h4 style={{ minWidth: "fit-content" }}>Cancellation policy</h4>
          {data?.refundPolicy?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFooter;
