import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
// import { Button } from '@storybook/react/demo';
import { Button, Tag } from '../../zet-ui';
import 'antd/dist/antd.css';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with text', () => {
    const name = text('Name', 'Arunoda Susiripala');
    const type = select('type', ['primary', 'dashed', 'danger']);
    return <Button type={type}>{name}</Button>
  })
  .add('with some emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ))
  .add('with tag', () => {
    return <Tag />
  });


