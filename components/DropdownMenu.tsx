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

          <DropdownMenuItem
            onClick={() => {
              setMode("Desplazamiento");
              localStorage.setItem("toolSelected", "Desplazamiento");
            }}
          >
            Desplazamiento
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMode("RGB");
              localStorage.setItem("toolSelected", "RGB");
            }}
          >
            RGB
          </DropdownMenuItem>
          <DropdownMenuItem>Rotar</DropdownMenuItem>
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
          <DropdownMenuItem
            onClick={() => {
              setMode("Histograma");
              localStorage.setItem("toolSelected", "Histograma");
            }}
          >
            Histograma
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Histograma Pixel Rojo");
              localStorage.setItem("toolSelected", "Histograma Pixel Rojo");
            }}
          >
            Histograma Pixel Rojo
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Histograma Pixeles Rojos");
              localStorage.setItem("toolSelected", "Histograma Pixeles Rojos");
            }}
          >
            Histograma Pixeles Rojos
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Histograma Coloreado");
              localStorage.setItem("toolSelected", "Histograma Coloreado");
            }}
          >
            Histograma Coloreado
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMode("Histograma Frecuencia Acumulada");
              localStorage.setItem("toolSelected", "Histograma Frecuencia Acumulada");
            }}
          >
            Histograma Frecuencia Acumulada
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMode("Scalar");
              localStorage.setItem("toolSelected", "Scalar");
            }}
          >
            Scalar
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMode("Scala");
              localStorage.setItem("toolSelected", "Scala");
            }}
          >
            Scala
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMode("Rotacion");
              localStorage.setItem("toolSelected", "Rotacion");
            }}
          >
            Rotacion
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMode("Segmentacion");
              localStorage.setItem("toolSelected", "Segmentacion");
            }}
          >
            Segmentacion
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setMode("Segmentacion Euclideana");
              localStorage.setItem("toolSelected", "Segmentacion Euclideana");
            }}
          >
            Segmentacion Euclideana
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
  zIndex: 100,
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
