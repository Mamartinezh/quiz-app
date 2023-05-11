
import { useState, useEffect, useRef, createContext } from "react"
import TimerHeader from "./TimerHeader"

export const ActiveContext = createContext()

export default function QuestionPage({ questions, maxTime, getQuestions }) {

	const [ currentQuestion, setCurrentQuestion ] = useState(0)
	const [ answer, setAnswer ] = useState("")
	let timeOut = useRef()
	let score = useRef(0)
	let showScore = useRef(false)

	useEffect(() => {

		timeOut.current = setTimeout(() => {
			selAnswer("none")
		}, maxTime)

		return(() => {
			clearTimeout(timeOut)
		})

	}, [currentQuestion])

	function nextQuestion() {
		if (answer === question.answer) {
			score.current ++
		}
		setAnswer("")
		if (currentQuestion + 1 === questions.length) {
			showScore.current = true
			return
		}
		setCurrentQuestion(currentQuestion + 1)
	}

	function selAnswer(option) {
		if (answer) return
		setAnswer(option)
		clearTimeout(timeOut.current)
	}

	function reset() {
		showScore.current = false
		score.current = 0
		setCurrentQuestion(0)
	}

	function newQuestions() {
		reset()
		getQuestions()
	}

	let question = questions.at(currentQuestion)

	return (
		<>
		{showScore.current ? 
			<div className="score">
				Your score was: {score.current} out of {questions.length}!
				<span className="retry" onClick={reset}>retry</span>
				<span className="newquests" onClick={newQuestions}>new quests</span>
			</div>
		:
			<div className="questions">
				<ActiveContext.Provider value={{active: !answer ? true : false}}>
				<TimerHeader start={maxTime} />
				</ActiveContext.Provider>
				<div className="questions-options">
					<h1>{currentQuestion + 1 + ". " + question.ask}</h1>
					{question.options.map((option, id) => (
						<p 
							className={`option ${answer && option === question.answer ?
								"correct "
								:
								" "} 
								${answer && answer !== question.answer && answer === option ?
									"wrong"
									:
									""}
							`}
							key={id} 
							onClick={e => selAnswer(option)}
						>
							{option}
						</p>
						)
					)}
				</div>
				<div className="questions-buttons">
					<span className="questions-current">
						{currentQuestion + 1} of {questions.length} Questions
					</span>
					{answer && <span className="questions-next" onClick={nextQuestion}>Next</span>}
				</div>
			</div>		
		}
		</>
	)
}