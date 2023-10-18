//주제도 config 
const ThematicTreeConfig = [

  {
      "id": "1",
      "name": "유역도",
      "children": [
          {
              store: 'watershed_map',
              id: 'WKMBBSN',
              name: '대권역',
              parent: '1'
          },{
              store: 'watershed_map',
              id: 'WKMMBSN',
              name: '중권역',
              parent: '1'
          },{
              store: 'watershed_map',
              id: 'WKMSBSN',
              name: '표준유역',
              parent: '1'
          }
      ]
  },{
      "id": "2",
      "name": "행정구역",
      "children": [
            {
                store: 'administrative_district',
                id: 'ctprvn',
                name: '시도',
                parent: '2'
            },{
                store: 'administrative_district',
                id: 'sig',
                name: '시군구',
                parent: '2'
            },{
                store: 'administrative_district',
                id: 'emd',
                name: '읍면동',
                parent: '2'
            },{
                store: 'administrative_district',
                id: 'li',
                name: '동리',
                parent: '2'
            }
      ]
    },{
        "id": "3",
        "name": "하천망도",
        "children": [
            {
                store: 'river_network',
                id: 'W_NATL',
                name: '국가하천',
                parent: '3'
            },{
                store: 'river_network',
                id: 'W_FRST',
                name: '구지방1급하천',
                parent: '3'
            },{
                store: 'river_network',
                id: 'W_SCND',
                name: '구지방2급하천',
                parent: '3'
            }
        ]
    }
];


export default ThematicTreeConfig;
