import { Card, Input, Row, Col, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export type ingredient = {
  id: number;
  name: string;
  weight: number;
  originalWeight: number | null;
}

type Props = {
  ingredient: ingredient;
  onChange: (id: number, key: 'name' | 'weight', value: string | number) => void;
  onDelete: () => void;
  onWeightScale: (id: number, newWeight: number) => void;
  recipeSaved: boolean;
};

const IngredientCard = ({ ingredient, onChange, onDelete, onWeightScale, recipeSaved }: Props) => {
  const handleWeightChange = (value: string) => {
    const num = parseFloat(value);
    onChange(ingredient.id, 'weight', isNaN(num) ? 0 : num);
    if (recipeSaved) {
      onWeightScale(ingredient.id, num);
    }
  };

  return (
    <Card
      className="bg-white dark:bg-zinc-800 dark:border-zinc-500 transition-colors"
      title={
        <Typography.Title
          className="text-black dark:text-white"
          level={5}
          style={{ margin: 0 }}
          editable={{
            onChange: val => onChange(ingredient.id, 'name', val),
          }}
        >
          {ingredient.name || 'Ингредиент'}
        </Typography.Title>
      }
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onDelete}
          danger
          aria-label="Удалить"
        />
      }
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Input
            placeholder="Вес, г"
            type="number"
            value={ingredient.weight}
            onChange={e => handleWeightChange(e.target.value)}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default IngredientCard;
