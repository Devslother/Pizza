import { CartItemProps } from './CartItem.props';
import styles from './CartItem.module.css'
import { cartActions } from '../../store/cart.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store'

export default function CartItem (props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>()

	const increase = () => {
		dispatch(cartActions.add(props.id))
	}

	const decrease = () => {
		dispatch(cartActions.decrease(props.id))
	}

	const remove = () => {
		dispatch(cartActions.remove(props.id))
	}

	return (
		<div className={styles.item}>
			<div className={styles.image} style={{backgroundImage: `url('${props.image}')`}}></div>

			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.price}>{props.price}&nbsp;₽</div>
			</div>

			<div className={styles.actions}>
				<button className={styles.button} onClick={decrease}>
					<img src='/Pizza-app/minus.svg' alt='Удалить из корзины'/>
				</button>
				<div className={styles.number}>{props.count}</div>
				<button className={styles.button} onClick={increase}>
					<img src='/Pizza-app/plus.svg' alt='Добавить в корзину'/>
				</button>
				<button className={styles.remove} onClick={remove}>
					<img src='/Pizza-app/close.svg' alt='Удалить все'/>
				</button>
			</div>
		</div>
	)
}