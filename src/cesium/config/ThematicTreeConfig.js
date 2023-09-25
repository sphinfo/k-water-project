//주제도 config 
const ThematicTreeConfig = [

  {
      "id": "1",
      "name": "유역",
      "children": [
          {
              store: 'watershed_map',
              id: 'WKMBBSN',
              name: '유역(대)',
              parent: '1'
          },{
              store: 'watershed_map',
              id: 'WKMMBSN',
              name: '유역(중)',
              parent: '1'
          },{
              store: 'watershed_map',
              id: 'WKMSBSN',
              name: '유역(소)',
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
      store: 'river_network',
      id: 'W_FRST',
      name: 'W_FRST'
  },{
      store: 'river_network',
      id: 'W_NATL',
      name: 'W_NATL'
  },{
      store: 'river_network',
      id: 'W_SCND',
      name: 'W_SCND'
  }
];


export default ThematicTreeConfig;
