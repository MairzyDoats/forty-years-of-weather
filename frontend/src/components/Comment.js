import React, { useState } from 'react'
import '../css/comment.css'

export default function Comment({ heading, text }) {
	const [textToggle, setTextToggle] = useState(false);

	return (
		<div className="comment">
			<div>
				<h2 className="comment__heading">{heading} <button onClick={() => { setTextToggle(prevToggle => !prevToggle) }} className={textToggle ? "comment__btn comment__btn--toggled" : "comment__btn"}>&gt;</button></h2>
			</div>
			<p className={textToggle ? "comment__text" : "comment__text comment__text--invisible"}>{text}</p>
		</div>
	)
}
