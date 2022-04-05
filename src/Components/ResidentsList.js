import React from 'react';

function ResidentsList({student}) {

	return (
		<ul className="list-group list-group-flush list-group-numbered" data-testid="residentsNameList">

			{student ? 
			<div> <hr /> <h3>Residents List</h3></div> 
			: ""}

			{student.map((i, id) => <li key={id} className="list-group-item"> {i} </li>)}

		</ul>
	);
}

export default ResidentsList;