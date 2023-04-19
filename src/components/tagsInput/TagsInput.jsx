import "./tagsInput.css"

const TagsInput = (props) => {

	const removeTags = indexToRemove => {
		props.setTags([...props.tags.filter((_, index) => index !== indexToRemove)]);
	};

	const addTags = event => {
		if (event.target.value !== "") {
			props.setTags([...props.tags, event.target.value]);
			props.selectedTags([...props.tags, event.target.value]);
			event.target.value = "";
		}
	};

	return (
		<div className="tagsInput">
      
			<ul id="tags">
				{props.tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>

			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};

export default TagsInput;