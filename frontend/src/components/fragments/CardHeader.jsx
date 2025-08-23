const CardHeader = (props) => {
  return (
	<header className='flex items-center justify-between bg-white p-6 rounded-xl shadow-md shadow-neutral-200'>
		<h4 className="!mb-0 flex items-center gap-x-2 !text-gray-600">{props.icon ?? ""}{props.title}</h4>
		{props.withButton &&
			<button className="btn btn-primary" onClick={props.onClickBtn}>{props.buttonIcon} {props.buttonTitle}</button>
		}
		{props.children}
	</header>
  )
}

export default CardHeader