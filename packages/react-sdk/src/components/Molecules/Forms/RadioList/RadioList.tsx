/* Dependencies */
import React from 'react';

// Components
import { FieldSet } from '../FieldSet/FieldSet';
import { Radio, Props as RadioProps } from '../Radio/Radio';

// Models
type Props = {
  /**
   * Sets an error on the radio list component.
   */
  error?: string;

  /**
   * The radio items to be rendered.
   */
  items: RadioProps[];

  /**
   * Sets the field as required.
   */
  required?: boolean;

  /**
   * Sets the radio list title.
   */
  title: string;
};

/**
 * Radio List Component
 */
export const RadioList: React.FC<Props> = ({
  error,
  items,
  required,
  title,
}) => {
  return (
    <FieldSet title={title} error={error} required={required}>
      {items.map((item, index) => {
        return (
          <div className="db-block db-w-full db-mt-1" key={index}>
            <Radio {...item}></Radio>
          </div>
        );
      })}
    </FieldSet>
  );
};
