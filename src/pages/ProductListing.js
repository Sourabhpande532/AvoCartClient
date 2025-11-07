import FiltersSidebar from "../components/FiltersSidebar";
import ProductCart from "../components/ProductCard";
import { useAppFeatures } from "../contexts/AppContext"
export const ProductListing = () => {
    const { products } = useAppFeatures()
    console.log( products );
    return (
        <div className="row">
            <div className="col-md-3">
                <FiltersSidebar />
            </div>
            <div className="col-md-9">
                <div className="row">
                {products.map((p)=>(
                    <div key={p._id} className="col-md-4 mb-3">
                    <ProductCart product={p}/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}