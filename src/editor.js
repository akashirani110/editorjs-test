import {default as React, useEffect, useRef, useState} from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import Raw from '@editorjs/raw';
import Link from '@editorjs/link';
import Timeline from './tools/timeline/tools';
import Carousel from './tools/carousel/tools';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const DEFAULT_INITIAL_DATA = () => {
    return{
        "time": new Date().getTime(),
        "blocks": [
            {
                "type": "header",
                "data": {
                    "text": "This is EditorJS",
                    "level": 1
                }
            },
        ]
    }
}

const useStyles = makeStyles(theme => ({
    
    saveBtn: {
        backgroundColor: "#efc12e",
    },    
})
);

const EDITOR_HOLDER_ID = 'editorjs'

const Editor = () => {
    const editorInstance = useRef();
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const [savedData, setSavedData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        if(!editorInstance.current){
            initEditor();
        }
        return () => {
            editorInstance.current = null;
        }
    }, [])
    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            data: {...editorData},
            onReady: () => {
                editorInstance.current = editor;
            },
            onChange: async () => {
                let content = await editor.isReady
                .then(() => {
                    editor.save().then((outputData) => {
                        setEditorData(outputData);
                        console.log('Article data: ', outputData)
                    })
                });
                setEditorData(content);
                console.log("data is set")
            },
            autofocus: true,
            tools: {
                header: Header,
                list: List,
                embed: Embed,
                simpleImage: SimpleImage,
                link: Link,
                raw: Raw,
                timeline: Timeline,
                carousel: Carousel,
            },
            
        });

    const saveData = async() => {
        try{
        await editor.isReady
        .then(() => {
            editor.save().then((outputData) => {
                setEditorData(outputData);
                console.log('Article data: ', outputData)
            })
        })
        console.log(editorData)
        }
        catch(error){
            console.log('Saving failed: ', error)
        }
    
    }
    }
        
    const handleSaveBtnClick = () => {
       console.log(editorData);
    }

    return(
        <div className="container">
            <div id = {EDITOR_HOLDER_ID}>

            </div>
            <Button variant='contained' className={classes.saveBtn} size="medium" onClick={handleSaveBtnClick}>Save</Button>
        </div>
    )
}


export default Editor
