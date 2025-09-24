
const ActionButton = ({ variant = "primary", children, ...props }) => {

	let btnClass
	switch (variant) {
		case 'primary':
			btnClass = 'btn btn-sm btn-outline-primary !bg-blue-100 hover:!bg-blue-500 hover:!text-white'
			break;
		case 'danger':
			btnClass = 'btn btn-sm btn-outline-danger !bg-red-100 hover:!bg-red-500 hover:!text-white'
			break;
		case 'success':
			btnClass = 'btn btn-sm btn-outline-success !bg-green-50 hover:!bg-green-700 hover:!text-white'
			break;
		case 'warning':
			btnClass = 'btn btn-sm btn-outline-warning !bg-yellow-50 hover:!bg-yellow-700 hover:!text-white'
			break;
		default:
			btnClass = 'btn btn-sm btn-outline-dark !bg-gray-50 hover:!bg-gray-700 hover:!text-white'
			break;
	}
	
	return (
		<button {...props} className={btnClass}>
			{children}
		</button>
	)
}

export default ActionButton