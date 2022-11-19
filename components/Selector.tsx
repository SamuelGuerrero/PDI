import * as Select from '@radix-ui/react-select';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { blackA, mauve, violet } from '@radix-ui/colors';

import { styled } from '@stitches/react';

type SelectorProps = {
  setMatrixDimension: Dispatch<SetStateAction<number>>
}

export const Selector = (props: SelectorProps) => (
  <Select.Root>
    <SelectTrigger aria-label="Food">
      <Select.Value placeholder="Selecciona una dimensión" />
      <SelectIcon>
        <ChevronDownIcon />
      </SelectIcon>
    </SelectTrigger>
    <Select.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          <Select.Group>
            <SelectLabel onClick={() => console.log("Hola")}>Dimensiones</SelectLabel>
            <SelectItem  value="3">3 x 3</SelectItem>
            <SelectItem value="5">5 x 5</SelectItem>
            <SelectItem value="7">7 x 7</SelectItem>
          </Select.Group>
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </Select.Portal>
  </Select.Root >
);

const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: 'white',
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: mauve.mauve3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-placeholder]': { color: violet.violet9 },
});

const SelectIcon = styled(Select.SelectIcon, {
  color: violet.violet11,
});

const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
});

const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
});
const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: violet.violet11,
  cursor: 'default',
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);

export default Selector;