import { ProductCardProps } from './ProductCsrd.props';
import styles from './ProductCard.module.css'
import { Link } from 'react-router';
import { cartActions } from '../../store/cart.slice';
import { useDispatch } from 'react-redux';
import { MouseEvent } from 'react';
import { AppDispatch } from '../../store/store'

export default function ProductCard (props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>()

	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id))
	}

	return (
		<Link to={`/product/${props.id}`} className={styles.link}>
		<div className={styles.card}>
			<div className={styles.head} style={{backgroundImage: `url('${props.image}')`}}>
				<div className={styles.price}>
					{props.price}&nbsp;
					<span className={styles.currency}>₽</span>
				</div>
				<button className={styles['add-to-cart']} onClick={add}>
					<img src='/Pizza-app/cart.svg' alt='Cart'/>
				</button>
				<div className={styles.rating}>
					{props.rating}&nbsp;
					<img src="/Pizza-app/star.svg" alt="Star" />
				</div>
			</div>
		
			<div className={styles.footer}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.description}>{props.description}</div>
			</div>
			</div>
		</Link>
	)
}