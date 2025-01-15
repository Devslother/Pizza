import { ProductCardProps } from './ProductCsrd.props';
import styles from './ProductCard.module.css'
import { Link } from 'react-router';

export default function ProductCard (props: ProductCardProps) {
	return (
		<Link to={`/product/${props.id}`} className={styles.link}>
		<div className={styles.card}>
			<div className={styles.head} style={{backgroundImage: `url('${props.image}')`}}>
				<div className={styles.price}>
					{props.price}&nbsp;
					<span className={styles.currency}>₽</span>
				</div>
				<button className={styles['add-to-cart']}>
					<img src='/cart.svg' alt='Cart'/>
				</button>
				<div className={styles.rating}>
					{props.rating}&nbsp;
					<img src="/star.svg" alt="Star" />
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