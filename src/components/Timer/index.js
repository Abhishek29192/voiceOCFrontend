// import React from "react";
// import { Typography, SxProps, Theme } from "@mui/material";



// export class CountDownTimer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { timer: props.time || 900, startTime: props.time || 900 };
//     }

//     componentDidMount() {
//         const interval = setInterval(() => {
//             this.setState((prevState) => ({ timer: prevState.timer - 1 }));
//             this.props.returnUpdatedValue &&
//                 this.props.returnUpdatedValue(this.state.timer);
//         }, 1000);
//         this.setState({ interval });
//     }

//     componentDidUpdate() {
//         if (this.state.timer === 0) {
//             this.state.interval && clearInterval(this.state.interval);
//             this.props.onStopTimer && this.props.onStopTimer();
//         }
//     }

//     static getDerivedStateFromProps(
//         nextProps,
//         prevState,
//     ) {
//         if (nextProps.time !== prevState.startTime) {
//             return {
//                 timer: nextProps.time,
//                 startTime: nextProps.time,
//             };
//         }
//         return null;
//     }

//     componentWillUnmount() {
//         this.state.interval && clearInterval(this.state.interval);
//     }

//     renderTime() {
//         const hours = Math.floor(this.state.timer / 3600);
//         // console.log(this.state.timer, "dfghhjhgf")
//         const minutes = Math.floor(this.state.timer / (60 * 24));
//         console.log(minutes, "hhhhhhhhhhhhhhh")
//         // const minutes = this.state.timer - hours * 60;
//         return `${hours.toString().length < 2 ? "0" + hours : hours} : ${minutes.toString().length < 2 ? "0" + minutes : minutes
//             }`;
//     }
//     render() {
//         return (
//             <Typography sx={this.props.sx} variant={this.props.variant}>
//                 {this.renderTime()}{" "}
//             </Typography>
//         );
//     }
// }




import React, { useState, useRef, useEffect } from 'react'


export const CountDownTimer = () => {

    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }


    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes)
                // + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next	
        setTimer('24:00');

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(86400);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    return (
        <div className="App">
            <h2>{timer}</h2>
            {/* <button onClick={onClickReset}>Reset</button> */}
        </div>
    )
}

