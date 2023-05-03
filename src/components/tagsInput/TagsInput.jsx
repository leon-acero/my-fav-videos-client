import "./tagsInput.css"

const TagsInput = ({ setTags, tags}) => {

	/***************************    removeTags    *************************/
	// Quito tags del Array
	const removeTags = (indexToRemove) => {
		setTags([...tags.filter((_, index) => 
			index !== indexToRemove)]);
	};
	/****************************************************************************/

	// console.log("tags", tags)

	/***************************    addTags    ***************************/
	// agrego tags al Array
	const addTags = (event) => {

		if (event.target.value !== "") {

			setTags([...tags, event.target.value]);
			// selectedTags([...tags, event.target.value]);

			event.target.value = "";
		}
	};
	/****************************************************************************/


	return (
		<div className="tagsInput">
      
			<ul id="tags">

				{tags.map((tag, index) => (
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

			{/* Por cada tecla presionada checo si le di Enter
				de ser asi mando llamar addTags
			*/}
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Agrega tags y presiona Enter"
			/>
		</div>
	);
};

export default TagsInput;