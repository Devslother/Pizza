import styles from './AuthLayout.module.css'
import { Outlet } from 'react-router'

export function AuthLayout () {
	return <div className={styles.layout}>
	 	<div className={styles.logo}>
			<img src="/pizza.svg" alt="Pizza" />
		</div>
		<div className={styles.content}>
			<Outlet />
		</div>
	</div>
}