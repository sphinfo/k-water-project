import React from "react";

const Biz2 = () => {
    return (
        <div className="tab-float-box">
            <div className="tab-float-box-button-wrap">
                <button className="tab-float-box-btn active">수체 탐지</button>
                <button className="tab-float-box-btn">수위 탐지</button>

            </div>
        </div>
    )
}

export default React.memo(Biz2);
