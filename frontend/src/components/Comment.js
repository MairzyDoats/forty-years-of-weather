import React from 'react'
import '../css/comment.css'

export default function Comment({ heading, text }) {
    return (
        <div className="comment">
        	<h2 className="comment__heading">{heading}</h2>
    			<p className="comment__text">{text}</p>
        </div>
    )
}
