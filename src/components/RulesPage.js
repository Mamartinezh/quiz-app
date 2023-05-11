

export default function RulesPage({ rules, start }) {

	return (
		<div className="rules">
			<h2 className="rules-head">Some Rules of this Quiz</h2>
			<div className="rules-div">
			{rules.map((rule, id) => (
				<p key={id}>{rule.id + ". " + rule.text}</p>
				)
			)}
			</div>
			<div className="rules-buttons">
				{/*<span className="rules-exit">Exit Quiz</span>*/}
				<span className="rules-continue" onClick={start}>Continue</span>
			</div> 
		</div>
	)
}