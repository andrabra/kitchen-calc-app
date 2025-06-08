import { Row, Col } from 'antd';
import ResponsiveCard from "./Card.tsx";


type Ingredient = {
  id: number;
  // сюда можно добавить дополнительные поля по необходимости
};

const ingredientsData: Ingredient[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const IngredientsList = () => {
  return (
      <Row gutter={[16, 16]}>
        {ingredientsData.map((ingredient) => (
            <Col
                key={ingredient.id}
                xs={24}  // на мобилке занимает всю ширину (1 колонка)
                sm={12}  // на маленьких планшетах 2 колонки
                md={8}   // на десктопах 3 колонки
                lg={6}   // на больших экранах 4 колонки
            >
              <ResponsiveCard />
            </Col>
        ))}
      </Row>
  );
};

export default IngredientsList;
