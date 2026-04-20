import { WonderwallCard } from './WonderwallCard';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(WonderwallCard, {
  name: 'Wonderwall Card',
  description: '',
  group: 'Wonderwall',
  props: {
    cardColor: props.Variant({
      name: "Card Color",
      options: [ "None", "Dark Gray", "Teal", "Blue", "Yellow", "Orange", "Purple" ],
      defaultValue: "None",
    }),
    theme: props.Variant({
      name: "Theme",
      options: [ "Light", "Dark" ],
      defaultValue: "Light",
    }),
    backgroundImage: props.Image({
      name: "Background Image",
    }),
    headerType: props.Variant({
      name: "Header Type",
      options: [ "Text", "Logo" ],
      defaultValue: "Text",
      group: "Header",
    }),
    iconColor: props.Variant({
      name: "Icon Color",
      options: [ "Dark Gray", "Teal", "Blue", "Yellow", "Orange", "Purple" ],
      defaultValue: "Dark Gray",
      group: "Header",
    }),
    headerText: props.Text({
      name: "Header Text",
      group: "Header",
    }),
    logo: props.Image({
      name: "Logo",
      group: "Header",
    }),
    title: props.Text({
      name: "Title",
      group: "Content",
      defaultValue: "",
      tooltip: "",
    }),
    subtitle: props.Text({
      name: "Subtitle",
      group: "Content",
      defaultValue: "",
      tooltip: "",
    }),
    description: props.TextNode({
      name: "Description",
      group: "Content",
      multiline: true,
      defaultValue: "",
      tooltip: "",
    }),
    footerLayout: props.Variant({
      name: "Footer Layout",
      group: "Footer",
      options: [ "Link", "Person" ],
      defaultValue: "Link",
    }),
    footerLinkText: props.Text({
      name: "Footer Link Text",
      group: "Footer",
      defaultValue: "Read more",
    }),
    footerLink: props.Link({
      name: "Footer Link",
      group: "Footer",
    }),
    personImage: props.Image({
      name: "Person Image",
      group: "Footer",
    }),
    personName: props.Text({
      name: "Person Name",
      group: "Footer",
      defaultValue: "",
    }),
    personPosition: props.Text({
      name: "Person Position",
      group: "Footer",
      defaultValue: "",
    }),
  },
});
