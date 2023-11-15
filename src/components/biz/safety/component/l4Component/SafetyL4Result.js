import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SET_SELECT_4_LEVEL, SET_SELECT_4_LEVEL_RESET } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

const example = [{
    name: 'EAST-WEST',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_EW',
    checked: false
},{
    name: 'UP-DOWN',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
},{
    name: 'UP-DOWN',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
},{
    name: 'UP-DOWN',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
},{
    name: 'UP-DOWN',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
},{
    name: 'UP-DOWN',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
}]

const SafetyL4Result = () => {

    const dispatch = useDispatch()
    const {detailSearchTabType, select3Level} = useSelector(state => state.safety)

    const [exampleList, setExampleList] = useState([])
    useEffect(()=>{
        /**
         * select3Level : 3레벨값이 바뀌면 4레벨 데이터 LIST 가 변경되어야 한다 API 후 SET LIST
         * 현재는 임의로 버튼 추가
         * */
        const min = 2
        const max = example.length
        const random = Math.floor(Math.random() * (max - min + 1)) + min

        let randomArray = []
        example.map((obj, i)=>{
            if(random > i){
                randomArray.push(obj)
            }
        })

        setExampleList(randomArray)
    },[select3Level])

    /**
        const renderToggleButton = ({name, value, ...other}) =>{
            return <ToggleButton style={{margin:5, width: '100%'}} value={value}>{name}</ToggleButton>
        }
    */
    

    /* 데이터 형식이 없어서 example로 개발 */
    const selectButton = (index) =>{

        let select4Level = false
        const newList = exampleList.map((item, i) => {
            if (index === i) {
                if(!item.checked){
                  select4Level = item
                }
                return { ...item, checked: !item.checked };
            }
            return { ...item, checked: false };
        });
        setExampleList(newList)

        select4Level ? dispatch({type:SET_SELECT_4_LEVEL, select4Level:select4Level}) : dispatch({type:SET_SELECT_4_LEVEL_RESET})
        
    }


    //변위 성분 List
    const renderResult = (obj, i) =>(
        <List className={'content-list'} sx={{ overflow: 'auto'}}>
          <ListItem key={i} selected={true}>
            <ListItemButton
              className={`content-list-item ${obj.checked ? 'item-on' : ''}`}
              selected={true}
              disableTouchRipple={true}
              button={true}
              color={'primary'}
              onClick={(e) => selectButton(i)}
            >
              <div className="list-title-wrap">
                <h3 className={'list-title'}>{obj.name}</h3>
              </div>
              {/* IMAGE */}
            </ListItemButton>
          </ListItem>
        </List>
    )

    return (
        <>
            <div style={{display: detailSearchTabType === 'datas' ? '' : 'none', justifyContent: 'center', margin: 5}}>
                <h1>변위 성분</h1>
                <div className={'content-list-wrap'}>
                    {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
                </div>
                

                {/*
                    <ToggleButtonGroup sx={{ flexDirection: 'column', width:'100%' }} exclusive value={select4Level ? select4Level.value : null} onChange={(e,newSelected)=>{selectButton(newSelected)}}>
                        {exampleList.length > 0 && exampleList.map((obj, i)=> renderToggleButton(obj, i))}
                    </ToggleButtonGroup>
                */}
                
            </div>
        </>
    )
}

export default React.memo(SafetyL4Result);
