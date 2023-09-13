import React from "react";
import Switch from '@mui/material/Switch';

const Biz3 = () => {
    return (
      <div className="tab-float-box">
          <div className="tab-float-box-button-wrap">
              <button className="tab-float-box-btn">부유물</button>
              <button className="tab-float-box-btn active">수변피복</button>
          </div>
        <div className="tab-float-box-button-wrap">
          <button className="tab-float-box-btn btn-round">
            변화탐지
            <Switch className="float-box-switch"/>
          </button>
        </div>
      </div>
    )
}

export default React.memo(Biz3);
