import { useState, useContext } from 'react';
import { useProductDispatch } from '../context/ProductContext';

function AddProductToBasket({ product, onAddToBasket }) {

    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [count, setCount] = useState(0);
    const dispatch = useProductDispatch();
    const disabled = count > 0 ? false : true;

    function addToBasket() {
        if (alreadyAdded) {
            dispatch({
                type: 'changed',
                product: {
                    ...product,
                    count: count
                }
            })
        } else {
            if (count > 0) {
                dispatch({
                    type: 'added',
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    count: count
                });
                setAlreadyAdded(true);
            }
        }
    }

    return (
        <div className='row'>
            <div className='col-md-2'>
                <button className='btn btn-light' disabled={disabled} onClick={() => setCount(count - 1 > 0 ? count - 1 : 0)}>-</button>
            </div>
            <div className='col-md-3'>
                <input type='number' className='form-control' placeholder='0' value={count}
                    onChange={(e) => setCount(e.target.value)}></input>
            </div>
            <div className='col-md-2'>
                <button className='btn btn-light' onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div className='col-md-5'>
                <button className='btn btn-primary' disabled={disabled} 
                    onClick={() => addToBasket() }>Sepete Ekle</button>
            </div>
        </div>
    );
}

export default AddProductToBasket;