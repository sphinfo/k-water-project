//검색조건 selectbox config 
const SelectBoxConfig = [
    {
        name:'댐', 
        code:'DAM',
        options: [ 
            {name:'용담댐', code:'YONGDAM',obscd:"3001690", x:35.9449283, y:127.5246387, z: 35000},
            {name:'황강댐', code:'HWANGGANG', x:38.3954103,  y:127.1831424, z: 35000},
            {name:'임남댐', code:'IMNAM', x:38.4222100, y:127.7908617, z: 35000},
            {name:'대청댐', code:'DAECHEONG',obscd:"3008690", x:36.4775000, y:127.4808330, z: 35000},
            {name:'안동댐', code:'ANDONG',obscd:"2001685", x:36.5848765, y:128.7739109, z: 35000},
            {name:'운문댐', code:'UNMUN',obscd:"2021620", x:35.7240461, y:128.9271935, z: 35000},
            {name:'영천댐', code:'YEONGCHEON',obscd:"2012615", x:36.0637638, y:129.0142288, z: 35000},
            {name:'사연댐', code:'SAYEON',obscd:"2201625", x:35.5800118, y:129.1957466, z: 35000},
            {name:'주암댐', code:'JUAM', x:35.0635085, y:127.2376671, z: 35000},
            {name:'소양강댐', code:'SOYANG', x:37.945556, y:127.814444, z: 35000},
        ]
    },{
        name:'보', 
        code: 'BO',
        options: [
            {name:'세종보', code:'SEJONG', x:36.5038281, y:127.2907172, z: 35000},
            {name:'창녕함안보', code:'CHANGNYEONG', x:35.3797885, y:128.5518737, z: 35000},
        ]
    },{
        name:'도시', 
        code: 'CITY',
        options: [
            {name:'서울', code:'SEOUL', x:37.5518911, y:126.9917937, z: 35000},
            {name:'대전', code:'DAEJEON', x:36.3398175, y:127.3940486, z: 35000},
        ]
    },{
        name:'하천', 
        code: 'RIVER',
        options: [
            {name:'내성천(낙동강)', code:'NAESEONGCHEON', x:36.6989192, y:128.5573419, z: 35000},
            {name:'미호강', code:'MIHOCHEON', x:36.515, y:127.3197222, z: 35000}, 
            {name:'남천(위천)', code:'WYECHEON', x:36.5570387, y:128.2778682, z: 35000},
        ]
    },{
        name:'시설,사면', 
        code: 'SI',
        options: [
            {name:'논산천제방', code:'NONSAN', x:36.1648899, y:127.1992794, z: 35000},
            {name:'세대터널', code: 'SAEDAE', x:37.3821712, y:128.6272039, z: 35000} 
        ]
    }
];


export default SelectBoxConfig;
