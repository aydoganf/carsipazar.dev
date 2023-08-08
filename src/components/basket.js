import { useState } from "react";
import { useBasketProducts, useProductDispatch } from "../context/ProductContext";
import BasketModal from "./basket-modal";

function Basket() {
    const items = useBasketProducts();
    const [isModalHidden, setIsModalHidden] = useState(true);

    function calculateItemCount() {
        if (items == null) 
            return 0;
        
        let count = 0;
        items.forEach((item) => {
            count += parseInt(item.count);
        });

        return count;
    }

    return (
        <>
        <button 
            className="btn btn-light position-absolute end-0" data-bs-toggle="modal" data-bs-target="#basket"
            onClick={() => setIsModalHidden(!isModalHidden)}>Basket ({calculateItemCount()})
        </button>
        <BasketModal products={items} hide={isModalHidden}></BasketModal>
        </>
    );
}

export default Basket;