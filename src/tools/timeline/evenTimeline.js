import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnecter from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { default as React, useState } from 'react';
import { getThemeProps } from '@material-ui/styles';

const DEFAULT_INITIAL_DATA = () => {
    return{
        events: [
            {
                "time": "Time",
                "description": "Description"
            }
        ],
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '8px',
        backgroundColor: '#efefef',
      },
      timelinedot: {
        boxShadow: 'none',
        marginTop: '20px',
      },
      time: {
        flex: '0.2',
        padding: '8px',
        marginTop: '6px',
        textOverflow: 'ellipsis',
      },
      oppositeInButton: {
        flex: '0.14',
      },
      addButton: {
        boxShadow: 'none',
        paddingLeft: '14px',
        paddingRight: '14px'
      },
      description: {
        padding: '8px',
        width: '400px',
        textOverflow: 'ellipsis',
      },
      addButtonText: {
        color: '#FFFFFF',
        fontSize: '1.3rem',
      }
})
);

const EventTimeline = (props) => {
    const classes = useStyles();
    const [timelineData, setTimelineData] = useState(props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA);

    const updateTimelineData = (newData) => {
        setTimelineData(newData);
        if(props.onDataChange){
            props.onDataChange(newData);
        }
    }

    const onAddEvent = (e) => {
        const newData = {
            ...timelineData
        }
        newData.events.push({
            "time": "Time",
            "description": "Description"
        })
        updateTimelineData(newData);
    }

    const onContentChange = (index, fieldName) => {
        return(e) => {
            const newData = {
                ...timelineData
            }
            newData.events[index][fieldName] = e.currentTarget.textContent;
            updateTimelineData(newData);
        }
    }

    return(
        <>
            <Box className={classes.root}>
                <Timeline align='left'>
                    {timelineData.events.map((event, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent className={classes.time}>
                                <Typography color='textSecondary' onBlur={onContentChange(index, 'time')} suppressContentEditableWarning={!props.readOnly} contentEditable={!props.readOnly}>
                                    {event.time}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot className={classes.timelinedot} />
                                <TimelineConnecter />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.description}>
                                    <Typography color="primary" onBlur={onContentChange('index', 'description')} suppressContentEditableWarning={!props.readOnly} contentEditable={!props.readOnly}>
                                        {event.description}
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                    {
                        !props.readOnly &&
                        <TimelineItem>
                            <TimelineOppositeContent className={classes.oppositeInButton} />
                            <TimelineSeparator>
                                <TimelineDot color='primary' className={classes.addButton} onClick={onAddEvent}>
                                    <Typography className={classes.addButtonText}> + </Typography>
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent />
                        </TimelineItem>
                    }
                </Timeline>
            </Box>
        </>
    );
}

export default EventTimeline;