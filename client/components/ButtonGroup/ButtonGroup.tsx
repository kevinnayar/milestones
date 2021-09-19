import * as React from 'react';
import { useState } from 'react';
import { Button } from '../Button/Button';

type ButtonGroupProps = {
  currentItem: string,
  items: string[],
  onClick?: (_item: string) => void;
};

export const ButtonGroup = ({ currentItem, items, onClick }: ButtonGroupProps) => {
  const [selected, setSelected] = useState(currentItem);

  return (
    <div className="button-group">
      {items.map((item, index) => {
        const classNames = [
          'button-group-item',
          `button-group-item--index-${index}`,
          ...(index === 0 ? ['button-group-item--first'] : [undefined]),
          ...(index === items.length - 1 ? ['button-group-item--last'] : [undefined]),
          ...(item === selected ? ['button-group-item--active'] : ['button-group-item--inactive']),
        ]
          .filter((c) => !!c)
          .join(' ');

        return (
          <Button
            key={item}
            className={classNames}
            onClick={() => {
              setSelected(item);

              if (onClick) {
                onClick(item);
              }
            }}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};
