import {
  Categories,
  FeaturedCategory,
  Hero,
  useCategoryFilter,
} from "../components/homepage";
import Loading from "../components/Loading";
import { useAppFeatures } from "../contexts/AppContext";

export const Home = () => {
  const { categories, loading, globalSearch } = useAppFeatures();
  const { filteredCategory } = useCategoryFilter(categories, globalSearch);

  if (loading) return <Loading />;

  return (
    <div className="fade-in">
      <Hero />
      <FeaturedCategory />
      <Categories filteredCategory={filteredCategory} />
    </div>
  );
};
