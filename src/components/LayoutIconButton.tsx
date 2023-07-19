import { Box, IconButton, IconButtonProps, IconButtonTypeMap, Stack, styled } from "@mui/material";
import React, { FC, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type LayoutIconButtonType = IconButtonProps & {
  subOptions?: ReactNode;
  active?: "true" | "false";
};

const LayoutIconButton: FC<LayoutIconButtonType> = ({ subOptions, onClick, children, ...rest }) => {
  const iconWrapperRef = useRef(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const [showSubOptions, setShowSubOptions] = useState(false);

  const offset = (iconButtonRef.current?.offsetWidth || 0) / 4;

  useOnClickOutside(iconWrapperRef, () => setShowSubOptions(false));

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (subOptions) setShowSubOptions((p) => !p);
    if (onClick) onClick(e);
  };

  return (
    <Box
      ref={iconWrapperRef}
      sx={{
        pointerEvents: "auto",
      }}
      position="relative"
    >
      <CustomIconButton onClick={handleOnClick} ref={iconButtonRef} size="medium" {...rest}>
        {children}
      </CustomIconButton>
      {showSubOptions && subOptions && (
        <Box position="absolute" bottom={48} left={`${-offset}px`}>
          {subOptions}
        </Box>
      )}
    </Box>
  );
};

const CustomIconButton = styled(IconButton)<Pick<LayoutIconButtonType, "active">>(
  ({ active, theme }) => ({
    ...(active === "true" && {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      svg: {
        fill: theme.palette.primary.main,
      },
    }),
  })
);

export default LayoutIconButton;
