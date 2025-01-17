import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styles from './Layout.module.css'
import Button from '../components/Button/Button'
import cn from 'classnames'


export function Layout () {
	const navigate = useNavigate()

		const logout = () => {
	  localStorage.removeItem('jwt');
	  navigate('/auth/login');
	};

	return <div className={styles.layout}>
	 <div className={styles.sidebar}>
		<div className={styles.user}>
			<img className={styles.avatar} src="/avatar.png" alt="Аватар" />
			<div className={styles.name}>Sveta</div>
			<div className={styles.email}>Sveta@mail.com</div>
		</div>
		<div className={styles.menu}>
		<NavLink to='/' className={({isActive}) => cn(styles['link'], {[styles.active] : isActive})}>
			<img src="/menu.svg" alt="Меню" />
				Меню
		</NavLink>

		<NavLink to='/cart' className={({isActive}) => cn(styles['link'], {[styles.active] : isActive})}>
			<img src="/cart.svg" alt="Корзина" />
			Корзина
		</NavLink>
		</div>  
		<Button className={styles.exit} onClick={logout}>
			<img src="/turn.svg" alt="Выход" />
			Выйти
		</Button>
	</div>
		<div className={styles.content}>
			<Outlet />
		</div>
	</div>
}