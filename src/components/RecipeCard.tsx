import DOMPurify from 'dompurify';
import { Card, Col, Row, Typography, Image } from 'antd';

const { Title } = Typography;

export type Recipe = {
  title: string;
  img: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
};

type Props = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card
      role="article"
      aria-label={`Рецепт: ${recipe.title}`}
      className="w-full max-w-md mx-auto bg-white dark:bg-zinc-800 dark:border-zinc-500 transition-colors box-border"
      title={
        <Title
          className="text-black dark:text-white"
          level={5}
          style={{
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={recipe.title}
        >
          {recipe.title}
        </Title>
      }
    >
      <Row gutter={[8, 8]}>
        <Col span={24} className="flex justify-center">
          <Image
            src={recipe.img}
            alt={recipe.title}
            style={{ maxHeight: 200, objectFit: 'cover' }}
            preview={true}
          />
        </Col>

        {recipe.description && (
          <Col span={24}>
            <div
              className="text-black dark:text-white"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recipe.description),
              }}
            />
          </Col>
        )}

        {recipe.ingredients?.length > 0 && (
          <Col span={24}>
            <Title level={5} className="text-black dark:text-white mb-2">
              Ингредиенты:
            </Title>
            <ul className="list-disc list-inside text-black dark:text-white">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Col>
        )}
        {recipe.steps?.length > 0 && (
          <Col span={24}>
            <Title level={5} className="text-black dark:text-white mb-2">
              Шаги приготовления:
            </Title>
            <ol className="list-decimal list-inside text-black dark:text-white space-y-1">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default RecipeCard;
