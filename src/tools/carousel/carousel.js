import { Button, TextField, Typography, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import {default as React, useState} from 'react'

const DEFAULT_INITIAL_DATA = () => {
    return{
        urls: [
            {
                "value": ""
            },
            {
                "value": ""
            },
            {
                "value": ""
            }
        ],
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '8px',
        //backgroundColor: '#efefef',
        border: "2px solid black"
    },
    urlBtn: {
        backgroundColor: "#efc12e",
    },
    urlInput: {
        width: "500px",
        padding: "8px",
        textOverflow: "ellipsis",
    },
    label: {
        flex: '0.2',
        padding: '8px',
        marginTop: '6px',
        textOverflow: 'ellipsis',
    }
})
);



const ImageCarousel = (props) => {

    const classes = useStyles();
    const [imageUrlData, setImageUrlData] = useState(props.data.urls.length > 0 ? props.data : DEFAULT_INITIAL_DATA);
    console.log(imageUrlData)
    const updateImageUrlData = (newData) => {
        setImageUrlData(newData);
        if(props.onDataChange){
            props.onDataChange(newData);
        }

    }
    const onAddImageUrl = (e) => {
        const newData = {
            ...imageUrlData,
    
        }
        newData.urls.push({
            "value": e.target.value
        })
        updateImageUrlData(newData);    
    }

    const onContentChange = (index, fieldData) => {
        return(e) => {
            const newData = {
                ...imageUrlData
            }
            newData.urls[index][fieldData] = e.target.value;
            updateImageUrlData(newData);
            
        }
    }

    return(
        <>
            <Box className={classes.root}>
                {imageUrlData.urls.map((url, index) => (
                    
                    <FormControl key={index}>
                        <Typography className={classes.label} color='textPrimary'>{index + 1}</Typography>
                        <TextField variant='outlined' className={classes.urlInput} placeholder='Image URL' required type="text" color="primary" onChange={onContentChange(index, 'value')} />
                    </FormControl>
                ))}
                {
                    console.log(imageUrlData.urls.value)
                }
                {!props.readOnly &&
                <div>
                    <Button variant='contained' onClick={onAddImageUrl} className={classes.urlBtn} size="medium">Add URL</Button>
                </div>}
            </Box>
        </>
    )
}

export default ImageCarousel;