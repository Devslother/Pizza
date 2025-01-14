import { Link, Outlet } from 'react-router'
import styles from './Layout.module.css'
import Button from '../components/Button/Button'

export function Layout () {
	return <div className={styles.layout}>
	 <div className={styles.sidebar}>
		<div className={styles.user}>
			<img className={styles.avatar} src="/avatar.png" alt="Аватар" />
			<div className={styles.name}>Sveta</div>
			<div className={styles.email}>Sveta@mail.com</div>
		</div>
		<div className={styles.menu}>
			<Link to='/' className={styles.link}>
				<img src="/menu.svg" alt="Меню" />
				Меню
			</Link>
      <Link to='/cart' className={styles.link}>
				<img src="/cart.svg" alt="Корзина" />
				Корзина
			</Link>
		</div>  
		<Button className={styles.exit}>
			<img src="/turn.svg" alt="Выход" />
			Выйти
		</Button>
	</div>
		<div>
			<Outlet />
		</div>
	</div>
}