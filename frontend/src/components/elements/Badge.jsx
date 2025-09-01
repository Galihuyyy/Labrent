
const Badge = ({ variant, className, children }) => {
	let variantStyle = "";
	switch (variant) {
		case 'success' :
			variantStyle = "bg-green-100 text-green-700"
		    break
		case 'warning' :
			variantStyle = "bg-orange-100 text-orange-700"
		    break
		case 'danger' :
			variantStyle = "bg-red-100 text-red-700"
		    break
		default :
			variantStyle = "bg-gray-300 text-gray-700"
		    break
	}

	return (
		<span className={`sm:ms-6 inline-flex w-fit items-center px-3 py-0.5 cursor-default rounded-full text-[12px] ${variantStyle} mt-3 ${className}`}>
			{children}
		</span>
	)
}

export default Badge