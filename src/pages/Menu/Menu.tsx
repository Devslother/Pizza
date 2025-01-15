import { Headling } from '../../components/Headling/Headling'
import Search from '../../components/Search/Search'
import styles from './Menu.module.css'
import { useLoaderData } from 'react-router'
import { Product } from '../../interfaces/product.interface'
import { useState } from 'react'
import { MenuList } from './MenuList'

export function Menu () {
  const { data: initialProducts } = useLoaderData() as { data: Product[] };
	const [search, setSearch] = useState<string>('');
	
	const filterProducts = initialProducts.filter((product) => {
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
}


