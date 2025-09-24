const Button = (props) => {
    const {children, variant = "primary", onClick, type = "button", className} = props

  return (
    <button className={`btn btn-${variant} w-full ${className} max-sm:!text-xs sm:!text-sm`} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button
