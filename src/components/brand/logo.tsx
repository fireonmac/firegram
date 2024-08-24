import clsx from "clsx";

import logoImage from "@/assets/images/logo.png";

const BrandLogo = ({
  className,
  ...props
}: // Define Type which inherits HTML Image Element properties, like src, alt, etc
React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      className={clsx(className, "h-8 w-auto")}
      src={logoImage}
      alt={props.alt || "Logo"}
    />
  );
};

export default BrandLogo;
