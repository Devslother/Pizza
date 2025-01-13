import styles from './Button.module.css'
import { ButtonProps } from './Button.props'
import cn from 'classnames'

export default function Button ({children, className, ...props}: ButtonProps) {
	return (
		<button className={cn('button accent', className)} {...props}>
			{children}
		</button>
	)
}