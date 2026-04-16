import { StatsGrid } from './StatsGrid';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(StatsGrid, {
  name: 'StatsGrid',
  description: '',
  props: {
    stat: props.Slot({
      name:"Stat Card",
      group:"Content"
    })
  }
});
