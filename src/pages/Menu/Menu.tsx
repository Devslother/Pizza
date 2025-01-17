import { Headling } from '../../components/Headling/Headling'
import Search from '../../components/Search/Search'
import styles from './Menu.module.css'
import { Product } from '../../interfaces/product.interface'
import { useState, useEffect } from 'react'
import { MenuList } from './MenuList'
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API'

export function Menu () {
	const[products, setProducts] = useState<Product[]>([])
	const[isLoading, setIsLoading] = useState<boolean>(false)
	const[error, setError] = useState<string | undefined>()
 
	const getMenu = async () => {
		setIsLoading(true)
		try {
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`)
			setProducts(data)
			setIsLoading(false)
		} catch(e) {
			console.error(e)
			if (e instanceof AxiosError) {
				setError(e.message)
			}
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getMenu()
	}, [])

	return <>
		<div className={styles.head}>
			<Headling>Menu</Headling>
			<Search placeholder='Введите блюдо или состав' />
		</div>

    <div>
      {error && <>{error}</>}
      {!isLoading && <MenuList products={products} />}
      {isLoading && <>Is loading products...</>}
    </div>
	</>
}
  
  /*const filterProducts = initialProducts.filter((product) => {
    const query = search.toLowerCase();
    const nameMatches = product.name.toLowerCase().includes(query);
    const ingredientsMatch = product.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(query)
    );
    return nameMatches || ingredientsMatch;
  });

	return <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     <div>
        {filterProducts.length > 0 ? (
          <MenuList products={filterProducts} />
        ) : (
          <>Ничего не найдено</>
        )}
      </div> 
    </>
} */

    