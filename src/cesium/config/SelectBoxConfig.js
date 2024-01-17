//검색조건 selectbox config 
const SelectBoxConfig = [
    {
        name:'댐', 
        code:'DAM',
        items: [ 
            {name:'용담댐', code:'YONGDAM',obscd:"3001690", x:35.9449283, y:127.5246387, z: 35000},
            {name:'황강댐', code:'HWANGGANG', x:38.3954103,  y:127.1831424, z: 35000},
            {name:'임남댐', code:'IMNAM', x:38.4222100, y:127.7908617, z: 35000},
            {name:'대청댐', code:'DAECHEONG',obscd:"3008690", x:36.4775000, y:127.4808330, z: 35000},
            {name:'안동댐', code:'ANDONG',obscd:"2001685", x:36.5848765, y:128.7739109, z: 35000},
            {name:'운문댐', code:'UNMUN',obscd:"2021620", x:35.7240461, y:128.9271935, z: 35000},
            {name:'영천댐', code:'YEONGCHEON',obscd:"2012615", x:36.0637638, y:129.0142288, z: 35000},
            {name:'사연댐', code:'SAYEON',obscd:"2201625", x:35.5800118, y:129.1957466, z: 35000},
            {name:'주암댐', code:'JUAM'},
            {name:'소양강댐', code:'SOYANG'},
        ]
    },{
        name:'보', 
        code: 'BO',
        items: [
            {name:'세종보', code:'SEJONG'},
            {name:'창녕함안보', code:'CHANGNYEONG'}
        ]
    },{
        name:'도시', 
        code: 'CITY',
        items: [
            {name:'서울', code:'SEOUL'},
            {name:'대전', code:'DAEJEON'},
        ]
    },{
        name:'하천', 
        code: 'RIVER',
        items: [
            {name:'내성천(낙동강)', code:'NAESEONGCHEON'},
            {name:'미호강', code:'MIHOCHEON'},
            {name:'남천(위천)', code:'WYECHEON'},
        ]
    },{
        name:'시설,사면', 
        code: 'SI',
        items: [
            {name:'논산천제방', code:'NONSAN'},
        ]
    }
];


export default SelectBoxConfig;
