import { useSelector } from 'react-redux';
import { Headling } from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { selectTotalCount } from '../../store/cart.slice';

export function Cart () {
	const[cardPropsoducts, setCardProducts] = useState<Product[]>([]);
	const [promoCode, setPromoCode] = useState<string>('');
	const [discount, setDiscount] = useState<number>(0);
	const items = useSelector((s: RootState) => s.cart.items);
	const DELIVERY_FIX = 169;
	const totalCount = useSelector(selectTotalCount);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`)
		return data;
	}

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	}

	useEffect(() => {
		loadAllItems()
	}, [items])

	const applyPromoCode = async () => {
		try {
			const { data } = await axios.post(`${PREFIX}/promo-code`, { code: promoCode });
			setDiscount(data.discount);
			alert('Промокод успешно применён!');
		} catch (error) {
			console.error('Ошибка проверки промокода:', error);
			alert('Неверный или недействительный промокод');
			setDiscount(0);
		}
	};

	const total = items.map(i => {
		const product = cardPropsoducts.find(p => p.id === i.id);
		if(!product) {
			return 0
		}
		return i.count * product.price
	}).reduce((acc, i) => acc +=i, 0); 

	const discountedTotal = Math.max(total - discount, 0);

	return<>
		<Headling className={styles.headling}>Корзина</Headling>
		
		{items.map(i => {
			const product = cardPropsoducts.find(p => p.id === i.id);
			if(!product) {
				return
			}
			return <CartItem key={i.id} count ={i.count} {...product} />
		})}
		
		<div className={styles.promocode}>
			<Input
				placeholder="промокод"
				className={styles.promo}
				id='promo'
				value={promoCode}
				onChange={(e) => setPromoCode(e.target.value)}
			/>
			<Button onClick={applyPromoCode}>Применить</Button>	
		</div>
		
		<div className={styles.line}>
			<div className={styles.text}>Итог</div>
			<div className={styles.price}>{discount > 0 ? discountedTotal : total}&nbsp;<span>₽</span></div>
		</div>
		<div className={styles.line}>
			<div className={styles.text}>Доставка</div>
			<div className={styles.price}>{DELIVERY_FIX}&nbsp;<span>₽</span></div>
		</div>
		<div className={styles.line}>
			<div className={styles.text}>Итог <span className={styles.totalcount}>({totalCount})</span></div>
			<div className={styles.price}>{discount > 0 ? discountedTotal + DELIVERY_FIX : total + DELIVERY_FIX}&nbsp;<span>₽</span></div>
		</div>
	</>
}