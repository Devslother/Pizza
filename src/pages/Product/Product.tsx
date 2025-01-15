import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import type { Product } from '../../interfaces/product.interface';
import styles from './Product.module.css'
import Button from '../../components/Button/Button';

export function Product() {
  const { data } = useLoaderData() as { data: Promise<Product> };

  return (
    <Suspense fallback={<>Загрузка...</>}>
      <Await resolve={data}>
        {(product: Product) => (
          <div className={styles.all}>
            <div className={styles.head}>
              <div className={styles.name}>{product.name}</div>
             <Button 
              className={styles.button} 
              >
                <img src='/cart.svg' alt='csrt' />
                В корзину
              </Button>
            </div>
            <div className={styles.product}>
              <div className={styles.image}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.data}>
                <div className={styles.line}>
                  <div className={styles.elem}>Цена</div>
                  <div>{product.price}&nbsp;<span>₽</span></div>
                </div>
                <div className={styles.line}>
                  <div className={styles.elem}>Рейтинг</div>
                  <div>
                    {product.rating}&nbsp;<img src='/star.svg' alt='star'/>
                  </div>
                </div>
                <div>
                  Состав:
                  <ul className={styles.ingredients}>
                  {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}