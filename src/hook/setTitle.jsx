import { useEffect } from "react";

const setTitle = title =>{
    useEffect(()=>{
    document.title = `Elite-Sports | ${title}`;
    },[title])
}

export default setTitle;