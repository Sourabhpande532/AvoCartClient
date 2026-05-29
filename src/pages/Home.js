/* eslint-disable no-lone-blocks */
import {
  Categories,
  FeaturedCategory,
  Hero,
  useCategoryFilter,
} from "../components/homepage";
import { useAppFeatures } from "../contexts/AppContext";

export const Home = () => {
  const { categories, loading, globalSearch } = useAppFeatures();
  const { filteredCategory } = useCategoryFilter(categories, globalSearch);

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className='container my-5 fade-in'>
      <Hero />
      <FeaturedCategory />
      <Categories filteredCategory={filteredCategory} />
    </div>
  );
};
