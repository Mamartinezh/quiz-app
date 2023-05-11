
import { useState, useEffect, useRef, useContext } from "react"
import { ActiveContext } from "./QuestionPage"

export default function TimerHeader(props) {

	const [ progress, setProgress ] = useState(0)
	let interval = useRef()
	let headElement = useRef()
	let countdown = useRef(props.start/1000)
	let activeContext = useContext(ActiveContext)

	useEffect(() => {

		if (!activeContext.active) {
			clearInterval(interval.current)
			return
		}

		let dt = 0
		interval.current = setInterval(() => {
			dt ++
			if (!headElement.current) return
			let headWidth = parseInt(getComputedStyle(headElement.current).width)
			setProgress(dt * headWidth / props.start)
			countdown.current = Math.round((props.start - dt * 6)/1000)
		}, 6)	

		return(() =>{
			clearInterval(interval.current)
		})

	}, [activeContext.active])

	return (
		<div className="timer" ref={headElement}>
			<h2>Awesome Quiz App</h2>
			<span className="timer-left">
				Time Left&nbsp;
				<span className="timer-number">{countdown.current}</span>
			</span>
			<div className="timer-progress" style={{width: `${progress}%`}}></div>
		</div>
	)

}