import React, { useEffect, useState } from 'react';

const TimeZoneWidget = () => {

    const [time, setTime] = useState('');

    useEffect(()=>{

        const getKoreanTime = () => {
            const currentTime = new Date();
            const options = {
                timeZone: 'Asia/Seoul', // 한국 시간대
                year: 'numeric',
                month: 'long', // 월을 긴 형식으로 표시 (예: "1월" 대신 "January")
                day: 'numeric',
                hour12: false, // 24시간 형식 사용
                hour: '2-digit',
                minute: '2-digit',
            };
      
            return currentTime.toLocaleTimeString('EUC-KR', options);
        };
      
        // 1초마다 한국 시간을 업데이트
        const intervalId = setInterval(() => {
            const kTime = getKoreanTime();
            setTime(kTime);
        }, 1000);
      
        // 컴포넌트 언마운트 시 인터벌 해제
        return () => clearInterval(intervalId);

    },[])
    
    
    return (
        <>
            <div className="map-address">
                {time}
            </div>
            {/* <div className="map-address">
                19℃
                <span className="text-blue ml-5">
                    ☀︎
                </span>
            </div> */}
        </>
    )
}

export default TimeZoneWidget;
