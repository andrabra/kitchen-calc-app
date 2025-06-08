import { useState } from 'react';
import { Drawer, Switch, Typography, Menu } from 'antd';
import { BulbOutlined, BulbFilled, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

type BurgerMenuProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const BurgerMenu = ({ theme, toggleTheme }: BurgerMenuProps) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <button
        onClick={showDrawer}
        className="text-xl p-0 border-0 bg-transparent"
        aria-label="Открыть меню"
      >
        <MenuOutlined />
      </button>

      <Drawer
        title="Меню"
        placement="left"
        onClose={closeDrawer}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          onClick={closeDrawer}
          items={[
            { key: 'home', label: <Link to="/">Главная</Link> },
            { key: 'recipes', label: <Link to="/recipes">Рецепты</Link> },
          ]}
        />

        <div className="flex items-center justify-between p-4 border-t mt-4">
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
            <Title level={5} className="m-0">
              Темная тема
            </Title>
          </span>
          <Switch checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
