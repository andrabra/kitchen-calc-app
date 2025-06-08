import { Row, Col, Button, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Card from './Card.tsx';

const { Title } = Typography;

let idCounter = 1;

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([
    { id: idCounter++, name: '', weight: 0, originalWeight: null },
  ]);
  const [recipeSaved, setRecipeSaved] = useState(false);

  const handleAdd = () => {
    setIngredients(prev => [
      ...prev,
      { id: idCounter++, name: '', weight: 0, originalWeight: null },
    ]);
  };

  const handleDelete = (id: number) => {
    if (ingredients.length === 1) return;
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleChange = (id: number, key: 'name' | 'weight', value: string | number) => {
    setIngredients(prev => prev.map(ing => (ing.id === id ? { ...ing, [key]: value } : ing)));
  };

  const handleSaveRecipe = () => {
    setIngredients(prev => prev.map(ing => ({ ...ing, originalWeight: ing.weight })));
    setRecipeSaved(true);
  };

  const handleClearRecipe = () => {
    idCounter = 1;
    setIngredients([{ id: idCounter++, name: '', weight: 0, originalWeight: null }]);
    setRecipeSaved(false);
  };

  const handleDisableSaveButton = () => {
    if (ingredients.length === 1) {
      if (ingredients[0].name === '' || ingredients[0].weight === 0) {
        return true;
      }
    }
    return false;
  };

  const handleScale = (changedId: number, newWeight: number) => {
    const changed = ingredients.find(ing => ing.id === changedId);
    if (!changed || !changed.originalWeight || newWeight <= 0) return;

    const ratio = newWeight / changed.originalWeight;

    setIngredients(prev =>
      prev.map(ing => ({
        ...ing,
        weight:
          ing.id === changedId
            ? newWeight
            : ing.originalWeight !== null
              ? Math.round(ing.originalWeight * ratio)
              : ing.weight,
      })),
    );
  };

  return (
    <>
      {recipeSaved && (
        <div className="mb-4 text-black dark:text-white bg-white dark:bg-zinc-800 dark:border-zinc-500">
          <Title className="text-black dark:text-white" level={4}>
            Оригинальный рецепт
          </Title>
          <ul>
            {ingredients.map(ing => (
              <li key={ing.id}>
                {ing.name || 'Ингредиент'} — {ing.originalWeight} г
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="pb-28 md:pb-0">
        <Row gutter={[16, 16]}>
          {ingredients.map(ing => (
            <Col key={ing.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                ingredient={ing}
                onChange={handleChange}
                onDelete={() => handleDelete(ing.id)}
                onWeightScale={handleScale}
                recipeSaved={recipeSaved}
              />
            </Col>
          ))}
        </Row>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-800 p-2 border-t border-zinc-300 dark:border-zinc-600 md:static md:border-0">
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="w-full md:w-auto text-black dark:text-white"
          >
            Добавить ингредиент
          </Button>
          {(recipeSaved && (
            <Button
              type="default"
              icon={<DeleteOutlined />}
              onClick={handleClearRecipe}
              className="w-full md:w-auto text-black dark:text-white"
            >
              Очистить рецепт
            </Button>
          )) || (
            <Button
              type="default"
              icon={<SaveOutlined />}
              onClick={handleSaveRecipe}
              disabled={recipeSaved || ingredients.length === 0 || handleDisableSaveButton()}
              className="w-full md:w-auto text-black dark:text-white"
            >
              Сохранить рецепт
            </Button>
          )}
          <div>{handleDisableSaveButton()}</div>
        </div>
      </div>
    </>
  );
};

export default IngredientsList;
