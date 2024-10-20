import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { Layout } from '../../components/layout/layout';
import { useParams } from 'react-router';
import { useEffect } from 'react';

export function IngredientDetailPage() {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <Layout>
      <IngredientDetails />
    </Layout>
  );
}
