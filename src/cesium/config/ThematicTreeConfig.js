//주제도 config 
const ThematicTreeConfig = [

  {
      "id": "water",
      "name": "유역도",
      "children": [
          {
              store: 'watershed_map',
              id: 'WKMBBSN',
              name: '대권역',
              parent: 'water'
          },{
              store: 'watershed_map',
              id: 'WKMMBSN',
              name: '중권역',
              parent: 'water'
          },{
              store: 'watershed_map',
              id: 'WKMSBSN',
              name: '표준유역',
              parent: 'water'
          }
      ]
  },{
      "id": "adm",
      "name": "행정구역",
      "children": [
            {
                store: 'administrative_district',
                id: 'ctprvn',
                name: '시도',
                parent: 'adm'
            },{
                store: 'administrative_district',
                id: 'sig',
                name: '시군구',
                parent: 'adm'
            },{
                store: 'administrative_district',
                id: 'emd',
                name: '읍면동',
                parent: 'adm'
            },{
                store: 'administrative_district',
                id: 'li',
                name: '동리',
                parent: 'adm'
            }
      ]
    },{
        "id": "river",
        "name": "하천망도",
        "children": [
            {
                store: 'river_network',
                id: 'W_NATL',
                name: '국가하천',
                parent: 'river'
            },{
                store: 'river_network',
                id: 'W_FRST',
                name: '구지방1급하천',
                parent: 'river'
            },{
                store: 'river_network',
                id: 'W_SCND',
                name: '구지방2급하천',
                parent: 'river'
            }
        ]
    },{
        id: 'FS_IJ100',
        name: "토지피복도",
        store: 'thematic_map',
        legend: { params: { title:'토지 피복도 범례', datas: [{label:'시가지', color:'#ff0000'} ,{label:'농업지역', color:'#eee907'} ,{label:'산림지역', color:'#2a4b2d'} ,{label:'초지', color:'#399926'} ,{label:'습지', color:'#7c227e'} ,{label:'나지', color:'#59ceca'} ,{label:'수역', color:'#0602fa'}]} }
    }
];


export default ThematicTreeConfig;
