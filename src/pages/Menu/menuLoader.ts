import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';

export async function menuLoader() {
	const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
	return { data: data };
}