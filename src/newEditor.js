import EditorJS from "@editorjs/editorjs"
import Link from "@editorjs/link"
import { SimpleImage } from "@editorjs/simple-image"
import { List } from "@editorjs/list"
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import $ from 'jquery';

export default function () {
    const editorjs = new EditorJS({
        holder: 'editorjs',
        tools: {
            link: Link,
            list: List,
            header: Header,
            raw: Raw,
            simpleImage: SimpleImage
        },
        data: {},
        onReady: () => {
            var editor = $('.codex-editor');
            var toolbox = $('.ce-toolbox');
            var popover = $('.ce-popover');
            $('.ce-toolbox__plus').remove();
            toolbox.detach();
            toolbox.appendTo(toolbar);
            popover.addClass('ce-popover--opened');
            var toolboxTitle = $('<div></div>');
            toolboxTitle.addClass('page-module-header');
            toolboxTitle.append("Page Modules");
            toolboxTitle.prependTo(toolbar);
            editor.first().on('DOMNodeInserted', (e) => {
                var blocks = editor.find('.ce-block');
                if(blocks.length === 0){
                    editorjs.clear();
                }
            })
        }
        
    })

    saveButton.on('click', function(e){
        savePage();
    })

    function savePage() {
        editorjs.isReady.then(() => {
            const blockCount = editorjs.blocks.getBlocksCount();
            let valid = true;

            for(var i = 0; i < blockCount; i++){
                const block = editorjs.blocks.getBlockByIndex(i);
                if(!block.validate()){
                    valid = false
                }
            }
            if(valid){
                editorjs.save().then((outputData) => {
                    outputData.val(JSON.stringify(outputData, null, 4))
                }).catch((error) => {
                    console.log('Saving failed:', error)
                })
            }
            else{
                console.log('Some modules are not configured properly');
            }
        }).catch((e) => {
            console.log('error loading editorjs')
        })
    }
}