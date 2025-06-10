import DOMPurify from 'dompurify';
import { Card, Col, Row, Typography } from 'antd';
import { Image } from 'antd';

const { Title } = Typography;

export type Recipe = {
  title: string;
  img: string;
  description?: string;
  ingredients?: string[];
};

type Props = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card
      className="w-full max-w-md mx-auto bg-white dark:bg-zinc-800 dark:border-zinc-500 transition-colors box-border"
      title={
        <Title
          className="text-black dark:text-white"
          level={5}
          style={{
            margin: 0,
            // Если нужно, чтобы заголовок переносился, можно убрать whiteSpace
            whiteSpace: 'nowrap', // Для однострочного эллипсиса
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={recipe.title} // Показываем полный заголовок при наведении (tooltip)
        >
          {recipe.title}
        </Title>
      }
    >
      <Row gutter={[8, 8]}>
        <Col span={24} className="flex justify-center">
          <Image src={recipe.img} alt={recipe.title} />
        </Col>
        <Col span={24}>
          <div
            className="text-black dark:text-white"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.description || '') }}
          />
        </Col>

        <Col span={24}>
          <Title level={5} className="text-black dark:text-white mb-2">
            Ингредиенты:
          </Title>
          {recipe.ingredients && (
            <ul className="list-disc list-inside text-black dark:text-white">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default RecipeCard;
