import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import { SET_END_DATE_SAFETY, SET_START_DATE_SAFETY, SET_TEXT_SAFETY } from "@redux/actions";
import TextInput from "@common/util/TextInput";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Checkbox } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

const SafetyResult = ({changeParam, ingre}) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.safety);

    const [exampleList, setExampleList] = useState([])

    const exampleEvent = () =>{
        if(exampleList.length > 0){
            setExampleList([])
        }else{
            setExampleList([
                {name:'대장지역 1', sub: '대상지역 설명1', checked: false },
                {name:'대장지역 2', sub: '대상지역 설명2', checked: false },
                {name:'대장지역 3', sub: '대상지역 설명3', checked: false },
                {name:'대장지역 4', sub: '대상지역 설명4', checked: false },
                {name:'대장지역 5', sub: '대상지역 설명5', checked: false },
                {name:'대장지역 6', sub: '대상지역 설명6', checked: false },
                {name:'대장지역 7', sub: '대상지역 설명7', checked: false },
                {name:'대장지역 8', sub: '대상지역 설명8', checked: false },
                {name:'대장지역 9', sub: '대상지역 설명9', checked: false },
                {name:'대장지역 10', sub: '대상지역 설명10', checked: false },
                {name:'대장지역 11', sub: '대상지역 설명11', checked: false },
                {name:'대장지역 12', sub: '대상지역 설명12', checked: false },

            ])
        }
    }

    //체크박스 다시 그리기
    const checkboxChange = (index) =>{
        const newList = exampleList.map((item, i) => {
            if (index === i) {
                return { ...item, checked: !item.checked };
            }
            return { ...item, checked: false };
        });
        setExampleList(newList);
    }


    //결과값 출력
    const renderResult = (obj, i) =>(
      <List className={'content-list'} sx={{
        overflow: 'auto',
      }}>
        <listItem key={i} selected={true}>
          <ListItemButton
            className={'content-list-item'}
            selected={true}
            disableTouchRipple={true}
            button={true}
            color={'primary'}
            onClick={() => checkboxChange(i)}
          >
            <div className="list-title-wrap">
            <h3 className={'list-title'}>{obj.name}</h3>
            <p className={'list-sub'}>{obj.sub}</p>
            </div>
            <div className="list-check">
            <Checkbox
              checked={obj.checked}
              onChange={() => checkboxChange(i)}
              className={'check-box'}
            />
            </div>
          </ListItemButton>
        </listItem>
      </List>
    )


    return (
        <>
            <div className="content-row">
            <div className={'content-list-wrap'}>
              <h2 style={{color:'black'}} onClick={()=>{exampleEvent()}}>검색결과 exampleClick</h2>
                {exampleList.length > 0 && exampleList.map((obj, i)=> renderResult(obj, i))}
            </div>
            </div>

        </>
    )
}

export default React.memo(SafetyResult);
