import { useState } from 'react';
import { Card, Input, Row, Col, Typography } from 'antd';

const ResponsiveCard = () => {
  const [title, setTitle] = useState('Ингредиент');
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setTitle(tempTitle.trim() || 'Ингредиент');
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const renderTitle = () =>
      isEditing ? (
          <Input
              autoFocus
              value={tempTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              size="small"
              style={{ maxWidth: 200 }}
          />
      ) : (
          <Typography.Title level={5} style={{ margin: 0 }} onClick={handleTitleClick}>
            {title}
          </Typography.Title>
      );

  return (
      <Card title={renderTitle()} style={{ maxWidth: 600, margin: '0 auto' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Input placeholder="Название" />
          </Col>
          <Col xs={24} sm={12}>
            <Input placeholder="Вес" />
          </Col>
        </Row>
      </Card>
  );
};

export default ResponsiveCard;
