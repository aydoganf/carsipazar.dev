
function BasketModal({ products, hide }) {

    const className = hide ? "modal hidden" : "modal";

    function calculateTotalPrice() {
        let price = 0.0;

        products.forEach((product) => {
            price += product.count * product.price;
        });

        return price;
    }

    return (
        <div class={className} tabindex="-1" id="basket">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sepet</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        {products.map((product) => (
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={'img/' + product.image} className="img-fluid"></img>
                                </div>
                                <div className="col-md-7">
                                    {product.name} ({product.count} adet / {product.price} ₺)
                                </div>
                                <div className="col-md-3">
                                    {product.price * product.count} ₺
                                </div>
                            </div>
                        ))}
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-7"></div>
                            <div class="col-sm-3">
                                {calculateTotalPrice()} ₺                                
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default BasketModal;