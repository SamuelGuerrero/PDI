import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import React, { Dispatch, SetStateAction } from "react";
import { blackA, mauve, violet } from "@radix-ui/colors";
import { keyframes, styled } from "@stitches/react";

import { Tools } from "./data/Tools";

type NavBarProps = {
  setMode: Dispatch<SetStateAction<string>>;
};

const DropdownMenuDemo = (props: NavBarProps) => {
  const { setMode } = props;
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton aria-label="Customise options">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem
            onClick={() => {
              setMode("Bordes");
              localStorage.setItem("toolSelected", "Bordes");
            }}
          >
            Bordes
          </DropdownMenuItem>

          <DropdownMenu.Sub>
            <DropdownMenuSubTrigger>
              Desplazamiento
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuSubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                <DropdownMenuItem>Desplazamiento Normal</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Promediando</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenuItem>Foco</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("RGB");
              localStorage.setItem("toolSelected", "RGB");
            }}
          >
            RGB
          </DropdownMenuItem>
          <DropdownMenuItem>Rotar</DropdownMenuItem>
          <DropdownMenuItem>Scalar</DropdownMenuItem>
          <DropdownMenu.Sub>
            <DropdownMenuSubTrigger>
              Scala
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuSubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                <DropdownMenuItem>Eliminando</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Promediando</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenuArrow />

          <DropdownMenuItem>Otro</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Operadores");
              localStorage.setItem("toolSelected", "Operadores");
            }}
          >
            Operadores
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Convolucion");
              localStorage.setItem("toolSelected", "Convolucion");
            }}
          >
            Convolución
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Foco");
              localStorage.setItem("toolSelected", "Foco");
            }}
          >
            Foco
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = {
  minWidth: 220,
  backgroundColor: "#ffeaad",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};

const DropdownMenuContent = styled(DropdownMenu.Content, contentStyles);
const DropdownMenuSubContent = styled(DropdownMenu.SubContent, contentStyles);

const DropdownMenuArrow = styled(DropdownMenu.Arrow, { fill: "white" });

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",

  "&[data-disabled]": {
    color: "#d14334",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "#d14334",
    color: "#ffeaad",
  },
};

const DropdownMenuItem = styled(DropdownMenu.Item, itemStyles);
const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: "#d14334",
    color: "#ffeaad",
  },
  ...itemStyles,
});

const DropdownMenuLabel = styled(DropdownMenu.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "#d14334",
});

const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: "#d14334",
  margin: 5,
});

const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: "#d14334",
  "[data-highlighted] > &": { color: "white" },
  "[data-disabled] &": { color: "#d14334" },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 40,
  width: 40,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1c2130",
  backgroundColor: "#ffeaad",
  boxShadow: "0 25px 50px -12px rgb(6, 182, 212)",
  "&:hover": { backgroundColor: "#fcf682", cursor: "pointer" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export default DropdownMenuDemo;