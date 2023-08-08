import './App.css';
import { useState } from 'react';
import ProductList from './components/product-list';
import CategoryListBar from './components/category-list-bar.js';
import { ProductProvider } from './context/ProductContext';
import Basket from './components/basket';

function ProductTable({ products, filterText, inStockOnly }) {
  const categories = [];
  const rows = [];
  const filteredProducts = [];

  products.forEach((product) => {

    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) == -1) {
      return;
    }
      
    if (inStockOnly && !product.stocked) {
      return;
    }

    filteredProducts.push(product);

  });

  filteredProducts.forEach((product) => {
    if (categories.indexOf(product.category) == -1)
      categories.push(product.category);
  });

  categories.forEach((category) => {
    rows.push(<ProductCategoryRow category={category} products={filteredProducts}></ProductCategoryRow>)
  });

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
} 

function ProductCategoryRow({ category, products }) {
  
  const productLines = [];

  products.forEach((product) => {
    if (product.category == category) {
      productLines.push(
        <ProductRow product={product}></ProductRow>
      );
    }
  });
  
  return (
    <>
      <CategoryRow category={category}></CategoryRow>
      {productLines}
    </>
  );

}

function CategoryRow({category}) {
  return (
    <tr>
      <td colSpan="2">
        {category}
      </td>
    </tr>
  );  
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name : 
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input 
        type='text' 
        placeholder='search..' 
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}></input>
      
      <label>
        <input 
          type='checkbox' 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}></input>
        {' '}
        Show only stocked products
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {

  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}></SearchBar>

      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}></ProductTable>
    </div>
  );
}

function App() {
  return (
    <ProductProvider>

    
    <div className='container'>
      <div className='row'>
        <div className='col-md-10'>
          <h2>Çarşı Pazar.dev</h2>
          <span>hoş geldiniz..</span>
        </div>
        <div className='col-md-2'>
          <div className='position-relative'>
            <Basket></Basket>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <FilterableProductTable products={PRODUCTS}></FilterableProductTable>
        </div>
        <div className='col-md-9'>
          
            <ProductList products={PRODUCTS} categories={CATEGORIES}></ProductList>
          
          
        </div>
      </div>
    </div>
    </ProductProvider>
  );
}

const PRODUCTS = [
  {id: 1, category: "Fruits", categoryId: 2, price: 24.99, stocked: true, name: "Apple", image: 'apple.jpg'},
  {id: 2, category: "Fruits", categoryId: 2, price: 149.99, stocked: true, name: "Dragonfruit", image: 'dragonfruit.jpg'},
  {id: 3, category: "Fruits", categoryId: 2, price: 232.0, stocked: false, name: "Passionfruit", image: 'passionfruit.jpg'},
  {id: 4, category: "Vegetables", categoryId: 1, price: 64.99, stocked: true, name: "Spinach", image: 'spinach.jpg'},
  {id: 5, category: "Vegetables", categoryId: 1, price: 34.99, stocked: false, name: "Pumpkin", image: 'pumpkin.jpg'},
  {id: 6, category: "Vegetables", categoryId: 1, price: 79.99, stocked: true, name: "Peas", image: 'peas.jpg'}
];

const CATEGORIES = [
  {id: 1, name: 'Sebzeler'},
  {id: 2, name: 'Meyveler'},
  {id: 3, name: 'Yeşillikler'},
  {id: 4, name: 'Kuruyemişler'}
]

export default App;
