
function CategoryItem({category, onCategorySelect}) {
    return (
        <button 
            className="btn btn-outline-primary m-1"
            onClick={(e) => onCategorySelect(category.id)}>
            {category.name}
        </button>
    );
}

function CategoryListBar({ categories, setSelectedCategoryId }) {

    const allCategoriesItem = {
        name: 'Tümü',
        categoryId: null,
    };

    const response = [
        <CategoryItem 
            category={allCategoriesItem} 
            onCategorySelect={(e) => setSelectedCategoryId(null)}></CategoryItem>
    ];

    categories.forEach((category) => {
        response.push(
            <CategoryItem 
                category={category}
                onCategorySelect={setSelectedCategoryId}></CategoryItem>
        );
    });

    return (
        <div>
            {response}
        </div>
    );
}

export default CategoryListBar;