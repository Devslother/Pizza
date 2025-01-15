import { LoaderFunctionArgs } from 'react-router';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';

export async function productLoader({ params }: LoaderFunctionArgs) {
	const data = await axios.get(`${PREFIX}/products/${params.id}`);
	return { data: data.data };
}