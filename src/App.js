
import RulesPage from "./components/RulesPage"
import QuestionPage from "./components/QuestionPage"
import LoadCircle from "./components/LoadCircle"
import ThemeSwitcher from "./components/ThemeSwitcher"
import rules from "./rules.js"
// import questions from "./questions.js"
import { useState, useEffect } from "react"

export default function App() {

	const [ startQuiz, setStartQuiz ] = useState(false)
	const [ questions, setQuestions ] = useState([])

	function start() {
		setStartQuiz(true)
		setQuestions([])
		getData()
	}

	async function getData() {
		await new Promise(r => setTimeout(r, 1000))
		fetch("https://the-trivia-api.com/api/questions")
			.then(res=>res.json())
			.then(data=>parseData(data))	
	}

	function parseData(data) {
		let qArr = data.map(q => {
			let options = q.incorrectAnswers
			options.splice(Math.floor(Math.random() * (options.length + 1)),
			 0, q.correctAnswer)
			return ({
				ask: q.question,
				options,
				answer: q.correctAnswer
			})				
		})
		setQuestions(qArr)
	}		

	let color = getComputedStyle(document.querySelector(":root")).getPropertyValue("--button-color")

	return (

		<>
			{startQuiz && questions.length > 0 && 
				<QuestionPage questions={questions.slice(0,5)} maxTime={15000} getQuestions={start} />}
			{startQuiz && questions.length === 0 && <LoadCircle radio={40} width={3} color={color} />}
			{!startQuiz && <RulesPage rules={rules} start={start} />}
			<div className="theme-div">
				<ThemeSwitcher theme={true} />
			</div>
		</>

	)
}