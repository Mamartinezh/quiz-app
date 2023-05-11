

export default function LoadCircle({ radio, width, color }) {

	return (
		<div className="loadcircle">
		   <svg 
		    	x="0px" 
		    	y="0px" 
		    	className="loadcircle-svg" 
		    	viewBox={`0 0 ${radio * 2 + width} ${radio * 2 + width}`} 
		    	fill="blue"
		    	width={`${radio * 2 + width}px`}
		    	height={`${radio * 2 + width}px`}
	    	>
				<circle 
					cx={`${radio + width / 2}`} 
					cy={`${radio + width / 2}`}  
					r={`${radio}`} 
					stroke={color} 
					className="loadcircle-svg--circle"
					strokeWidth={width.toString()} 
					fill="none" 
				/>
	    	</svg>
		</div>
	)
}