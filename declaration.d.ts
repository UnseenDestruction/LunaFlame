declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}

declare module '*.mp4' {
    const content: any;
    export default content;
}

declare module '*.mov' {
    const src: string;
    export default src;
  }
  