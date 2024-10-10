declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.pdf";
declare module "*.svg" {
  import { ComponentProps, FunctionComponent } from "react";
  const ReactComponent: FunctionComponent<ComponentProps<"svg">>;
  export = ReactComponent;
}
