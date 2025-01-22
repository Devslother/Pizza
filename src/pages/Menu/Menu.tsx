import { Headling } from '../../components/Headling/Headling'
import Search from '../../components/Search/Search'
import styles from './Menu.module.css'
import { Product } from '../../interfaces/product.interface'
import { useState, useEffect, ChangeEvent } from 'react'
import { MenuList } from './MenuList'
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API'

export function Menu () {
	const[products, setProducts] = useState<Product[]>([])
	const[isLoading, setIsLoading] = useState<boolean>(false)
	const[error, setError] = useState<string | undefined>()
  const[filter, setFilter] = useState<string>();

  useEffect(() => {
		getMenu(filter)
	}, [filter])
 
	const getMenu = async (name?: string) => {
		setIsLoading(true)
		try {
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {name}
      })
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

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
	  setFilter(e.target.value)
  }

	return <>
		<div className={styles.head}>
			<Headling>Menu</Headling>
			<Search placeholder='Введите блюдо или состав' id='search' onChange={updateFilter} />
		</div>

    <div>
      {error && <>{error}</>}
      {!isLoading && products.length > 0 && <MenuList products={products} />}
      {isLoading && <>Is loading products...</>}
      {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
    </div>
	</>
}

    