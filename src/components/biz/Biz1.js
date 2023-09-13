import React from "react";

const Biz1 = () => {
    return (
        <div className="tab-float-box">
            <div className="tab-float-box-list-wrap">
                <h1 className="tab-float-box-list-head">
                    유역별 통계 보기
                </h1>
                <ul className="tab-float-box-list-main">
                    <li><button>한강 유역</button></li>
                    <li><button>금강 유역</button></li>
                    <li><button className="active">낙동강 유역</button></li>
                </ul>
            </div>
        </div>
    )
}

export default React.memo(Biz1);
