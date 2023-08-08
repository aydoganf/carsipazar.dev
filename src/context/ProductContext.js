import { createContext, useContext, useReducer } from "react";

const ProductBasketContext = createContext(null);
const ProductDispatchContext = createContext(null);

export function ProductProvider({ children }) {
    const [products, dispatch] = useReducer(
        productReducer,
        initialProducts
    );

    return (
        <ProductBasketContext.Provider value={products}>
            <ProductDispatchContext.Provider value={dispatch}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductBasketContext.Provider>
    );
}

export function useBasketProducts() {
    return useContext(ProductBasketContext);
}

export function useProductDispatch() {
    return useContext(ProductDispatchContext);
}

function productReducer(products, action) {
    switch (action.type) {
        case 'added': {
            console.log(action);
            let x = [...products, {
                id: action.id,
                name: action.name,
                price: action.price,
                count: action.count,
                image: action.image
            }];
            console.log(x);
            return x;
        }
        case 'changed': {
            return products.map(p => {
                if (p.id === action.product.id) {
                    return action.product;
                } else {
                    return p;
                }
            });
        }
        case 'deleted': {
            return products.filter(p => p.id !== action.id);
        }
        default: {
            throw Error('Unknown action type: ' + action.type);
        }
    }
}

const initialProducts = [];