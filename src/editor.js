import {default as React, useEffect, useRef, useState} from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import Raw from '@editorjs/raw';
import Link from '@editorjs/link';
import Timeline from './tools/timeline/tools';

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

const EDITOR_HOLDER_ID = 'editorjs'

const Editor = () => {
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const editorInstance = useRef();

    useEffect(() => {
        if(!editorInstance.current){
            initEditor()
        }
    }, []);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            logLevel: "ERROR",
            onReady: () => {
               editorInstance.current = editor
            },
            // onChange: async () => {
            //     let content = await this.editorjs.saver.save();
            //     setEditorData(content);
            //     console.log("data is set")
            // },
            autofocus: true,
            tools: {
                header: Header,
                list: List,
                embed: Embed,
                simpleImage: SimpleImage,
                link: Link,
                raw: Raw,
                timeline: Timeline
            },
            data: editorData,
        });
        
    }

    return(
        <div id={EDITOR_HOLDER_ID}>
 
        </div>
    )
}


export default Editor
