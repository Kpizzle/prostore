import ProductList from '@/components/shared/product/product-list';
import sampleData from '@/sample-data';

const Homepage = () => {
  return (
    <>
      <ProductList
        data={sampleData.products}
        title='Newist Arrivals'
								limit={4}
      />
    </>
  );
};

export default Homepage;
