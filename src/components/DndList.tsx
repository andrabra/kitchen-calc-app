import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

type Item = {
  id: string;
  text: string;
};

const SortableItem = ({ id, text }: Item) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {text}
    </div>
  );
};

const DndList = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Чтобы не срабатывало при случайных тачах
      },
    }),
    useSensor(MouseSensor),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div style={{ padding: 16, background: '#f4f4f4', borderRadius: 8 }}>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id} text={item.text} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DndList;
