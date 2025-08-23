export const updateToastToSuccess = (id, message = "") => {
	toast.update(id, {
		type : 'success',
		render : message,
		isLoading : false,
		hideProgressBar : false,
		autoClose : true,
		closeButton : true
	})
}

export const updateToastToError = (id, message = "") => {
	toast.update(id, {
		type : 'error',
		render : message,
		isLoading : false,
		hideProgressBar : false,
		autoClose : true,
		closeButton : true
	})
}