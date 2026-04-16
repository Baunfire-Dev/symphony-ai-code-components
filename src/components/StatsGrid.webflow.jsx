import { StatsGrid } from './StatsGrid';
import { props } from '@webflow/data-types';
import { WFSlot, declareComponent } from '@webflow/react';

export default declareComponent(StatsGrid, {
  name: 'StatsGrid',
  description: '',
  slots: { stat: WFSlot }
});
