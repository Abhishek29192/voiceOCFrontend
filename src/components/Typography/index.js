import React from "react";

function createTypographyComponent(baseClassNames, defaultTag) {
  return function Typography({as, className = "", ...props}) {
    const Component = as || defaultTag;
    return (
      <Component className={`${baseClassNames} ${className}`} {...props} />
    );
  };
}

export const Heading1 = createTypographyComponent("text-7xl font-medium", "h1");

export const Heading1Strong = createTypographyComponent(
  "font-bold text-4xl leading-ui",
  "h2"
);

export const Heading2 = createTypographyComponent(
  "font-normal text-2xl leading-ui poppins",
  "h2"
);

export const Heading2Strong = createTypographyComponent(
  "font-medium text-2xl leading-ui",
  "h2"
);

export const Heading3 = createTypographyComponent(
  "font-normal text-xl leading-ui",
  "h2"
);

export const Heading3Strong = createTypographyComponent(
  "font-medium text-xl leading-ui poppins",
  "h2"
);

export const Base1 = createTypographyComponent(
  "font-normal text-lg leading-ui",
  "p"
);

export const Base1Strong = createTypographyComponent(
  "font-medium text-lg leading-ui",
  "p"
);

export const Base2 = createTypographyComponent(
  "font-normal text-base leading-ui",
  "p"
);

export const Base2Strong = createTypographyComponent(
  "font-medium text-base leading-ui",
  "p"
);

export const Caption1 = createTypographyComponent(
  "font-normal text-xs leading-ui tracking-wider poppins",
  "p"
);

export const Caption2 = createTypographyComponent(
  "font-normal text-2xs leading-ui tracking-wider poppins",
  "p"
);

export const Overline = createTypographyComponent(
  "font-normal text-xs leading-ui uppercase tracking-wider poppins",
  "p"
);

export const Display1 = createTypographyComponent(
  "font-extralight text-7xl leading-display",
  "h2"
);
export const Display2 = createTypographyComponent(
  "font-extralight text-6xl leading-display",
  "h2"
);

export const Display3 = createTypographyComponent(
  "font-light text-5xl leading-display",
  "h2"
);

export const Display4 = createTypographyComponent(
  "font-light text-4xl leading-display",
  "h2"
);

export const Display5 = createTypographyComponent(
  "font-normal text-1.5xl leading-display",
  "h2"
);

export const Paragraph1 = createTypographyComponent(
  "font-normal text-lg leading-paragraph whitespace-pre-wrap break-words poppins ",
  "p"
);

export const Options = createTypographyComponent(
  "font-normal text-base leading-paragraph whitespace-pre-wrap break-words poppins pl-4",
  "p"
);

export const Paragraph3 = createTypographyComponent(
  "font-normal text-sm leading-paragraph tracking-wide whitespace-pre-wrap break-words",
  "p"
);
