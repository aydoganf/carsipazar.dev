import { useState } from "react";
import CategoryListBar from "./category-list-bar";
import AddProductToBasket from "./add-product-to-basket";

function ProductList({ products, categories }) {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const filteredProducts = [];
    products.forEach((product) => {
        if (selectedCategoryId != null) {
            if (product.categoryId === selectedCategoryId) {
                filteredProducts.push(
                    <ProductListItem product={product}></ProductListItem>
                );
            }
        } else {
            filteredProducts.push(<ProductListItem product={product}></ProductListItem>);
        }
    });

    return (
        <div className="row">
            <CategoryListBar
                categories={categories}
                setSelectedCategoryId={setSelectedCategoryId}></CategoryListBar>
            {filteredProducts}
        </div>
    )
}

function ProductListItem({product}) {
    return (
        <div className="col-md-4 border border-2 rounded-2 mb-2">
            <div>
                <img src={'img/' + product.image} className="img-fluid"></img>
            </div>
            <div>
                {product.name}
            </div>
            <div>
                {product.price}
            </div>
            <div>
                <AddProductToBasket product={product} onAddToBasket={null}></AddProductToBasket>
            </div>
        </div>
    );
}

export default ProductList;