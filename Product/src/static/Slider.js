import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
        color: 'white',
    },
    slider: {
        color:  'white',
    }
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const classes = useStyles();
    const end = new Date().getSeconds;
    const start = (new Date().getFullYear() - 3).getSeconds;
    const [value, setValue] = React.useState([start,end]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Date Range
      </Typography>
            <Slider
                min={start}
                max={end}
                className={classes.slider}
                value={value}
                onChange={handleChange}
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
            <div>{start}</div>
            <div>{end}</div>
        </div>
    );
}