import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { blackA, indigo, mauve, purple, violet } from '@radix-ui/colors';
import { keyframes, styled } from '@stitches/react';

import { Button } from './Button';
import { CaretDownIcon } from '@radix-ui/react-icons';

type NavigationMenuDemoProps = {
    FocoAlgoritm: (matrix: any) => void
    matrix: number[];
    setMatrix: Dispatch<SetStateAction<number[]>>;
}

export const NavigationMenuDemo = (props: NavigationMenuDemoProps) => {
    const { FocoAlgoritm, matrix, setMatrix } = props;

    const [matrixDimension, setMatrixDimension] = useState(3);
    const pings = useRef<HTMLInputElement | any>([]);

    const variants = [
        {
            name: 'Bottom Sobel',
            matrix: [-1, -2, -2, 0, 0, 0, 1, 2, 1],
        }, {
            name: 'Emboss',
            matrix: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
        }
        , {
            name: 'Left Sobel',
            matrix: [1, 0, -1, 2, 0, -2, 1, 0, -1],
        }
        , {
            name: 'Outline',
            matrix: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
        }
        , {
            name: 'Right Sobel',
            matrix: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
        }
        , {
            name: 'Sharpen',
            matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        }
        , {
            name: 'Top Sobel',
            matrix: [1, 2, 1, 0, 0, 0, -1, -2, -1],
        }
    ]

    return (
        <NavigationMenuRoot>
            <NavigationMenuList>
                <NavigationMenu.Item>
                    <NavigationMenuTrigger>
                        Personalizado <CaretDown aria-hidden />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className='w-[300px] flex p-4 flex-col items-center space-y-5'>
                            <div className="grid grid-cols-3 shadow-xl shadow-blue-400 w-[150px] h-[150px] rounded-xl bg-gradient-to-r from-blue-400 to-emerald-400">
                                {
                                    matrix.map((e, i) => (
                                        <input
                                            ref={(element) => (pings.current[i] = element)}
                                            key={i}
                                            type="number"
                                            defaultValue={e}
                                            onChange={() => console.log(i)}
                                            className={`bg-transparent text-center h-[50px] w-[50px] border ${i == 0 ? 'rounded-tl-xl' : (i == 2 ? 'rounded-tr-xl' : (i == 6 ? 'rounded-bl-xl' : (i == 8 ? 'rounded-br-xl' : null)))}`}
                                        />
                                    ))
                                }
                            </div>

                            <Button
                                onClick={() => {
                                    console.log(pings)
                                    const valores = pings.current.map((e: any) => e.value);
                                    var isAnyElementEmpty = false;
                                    var list = [];
                                    for (var i = 0; i < valores.length; i++) {
                                        list.push(parseInt(valores[i]));
                                        if (valores[i] == "" || valores[i] == "-")
                                            isAnyElementEmpty = true;
                                    }
                                    if (!isAnyElementEmpty) {
                                        setMatrix(list)
                                        FocoAlgoritm(list);
                                    }
                                }}
                                variant="primary"
                            >
                                {" "}

                                Aplicar
                            </Button>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenu.Item>

                {
                    variants.map((element, i) => (
                        <NavigationMenu.Item>
                            <NavigationMenuTrigger>
                                {element.name} <CaretDown aria-hidden />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className='w-[300px] flex p-4 flex-col items-center space-y-2'>
                                    <div className="grid grid-cols-3 shadow-xl shadow-blue-400 w-[150px] h-[150px] rounded-xl bg-gradient-to-r from-blue-400 to-emerald-400">
                                        {
                                            element.matrix.map((e, i) => (
                                                <input
                                                    ref={(element) => (pings.current[i] = element)}
                                                    key={i}
                                                    defaultValue={e}
                                                    className={`bg-transparent text-center h-[50px] w-[50px] border ${i == 0 ? 'rounded-tl-xl' : (i == 2 ? 'rounded-tr-xl' : (i == 6 ? 'rounded-bl-xl' : (i == 8 ? 'rounded-br-xl' : null)))}`}
                                                />
                                            ))
                                        }
                                    </div>

                                    <Button
                                        onClick={() => {
                                            FocoAlgoritm(element.matrix);
                                        }}
                                        variant="primary"
                                    >
                                        {" "}

                                        Aplicar
                                    </Button>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenu.Item>
                    ))
                }


            </NavigationMenuList>

            <NavigationMenuIndicator>
                <Arrow />
            </NavigationMenuIndicator>



            <ViewportPosition>
                <NavigationMenuViewport />
            </ViewportPosition>
        </NavigationMenuRoot>
    );
};

const enterFromRight = keyframes({
    from: { transform: 'translateX(200px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
});

const enterFromLeft = keyframes({
    from: { transform: 'translateX(-200px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
});

const exitToRight = keyframes({
    from: { transform: 'translateX(0)', opacity: 1 },
    to: { transform: 'translateX(200px)', opacity: 0 },
});

const exitToLeft = keyframes({
    from: { transform: 'translateX(0)', opacity: 1 },
    to: { transform: 'translateX(-200px)', opacity: 0 },
});

const scaleIn = keyframes({
    from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
    to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
});

const scaleOut = keyframes({
    from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
    to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
});

const fadeIn = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

const fadeOut = keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
});

const NavigationMenuRoot = styled(NavigationMenu.Root, {
    position: 'relative',
    display: 'flex',
    justifyContent: 'start',
    width: '100vw',
    zIndex: 1,
});

const NavigationMenuList = styled(NavigationMenu.List, {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 6,
    listStyle: 'none',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    margin: 0,
});

const itemStyles = {
    padding: '8px 12px',
    outline: 'none',
    userSelect: 'none',
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: 4,
    fontSize: 15,
    color: violet.violet11,
    '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
    '&:hover': { backgroundColor: violet.violet3 },
};

const NavigationMenuTrigger = styled(NavigationMenu.Trigger, {
    all: 'unset',
    ...itemStyles,
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    width: 'calc(100% - 25px)',
    gap: 2,
});

const NavigationMenuContent = styled(NavigationMenu.Content, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    '@media only screen and (min-width: 600px)': { width: 'auto' },
    animationDuration: '250ms',
    animationTimingFunction: 'ease',
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
});

const NavigationMenuIndicator = styled(NavigationMenu.Indicator, {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 10,
    top: '100%',
    overflow: 'hidden',
    zIndex: 1,
    transition: 'width, transform 250ms ease',
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
});

const NavigationMenuViewport = styled(NavigationMenu.Viewport, {
    position: 'absolute',
    left: 170,
    top: -250,
    transformOrigin: 'top center',
    marginTop: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    height: 'var(--radix-navigation-menu-viewport-height)',
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
    '@media only screen and (min-width: 600px)': {
        width: 'var(--radix-navigation-menu-viewport-width)',
    },
});

const ListItemLink = styled('a', {
    display: 'block',
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    padding: 12,
    borderRadius: 6,
    fontSize: 15,
    lineHeight: 1,
    '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
    '&:hover': { backgroundColor: mauve.mauve3 },
});

const ListItemHeading = styled('div', {
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 5,
    color: violet.violet12,
});

const ListItemText = styled('p', {
    all: 'unset',
    color: mauve.mauve11,
    lineHeight: 1.4,
    fontWeight: 'initial',
});

const Callout = styled('a', {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${purple.purple9} 0%, ${indigo.indigo9} 100%);`,
    borderRadius: 6,
    padding: 25,
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const CalloutHeading = styled('div', {
    color: 'white',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.2,
    marginTop: 16,
    marginBottom: 7,
});

const CalloutText = styled('p', {
    all: 'unset',
    color: mauve.mauve4,
    fontSize: 14,
    lineHeight: 1.3,
});

const ViewportPosition = styled('div', {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    top: '100%',
    left: 0,
    perspective: '2000px',
});

const CaretDown = styled(CaretDownIcon, {
    position: 'relative',
    color: violet.violet10,
    top: 1,
    transition: 'transform 250ms ease',
    '[data-state=open] &': { transform: 'rotate(-180deg)' },
});

const Arrow = styled('div', {
    position: 'relative',
    top: '70%',
    backgroundColor: 'white',
    width: 10,
    height: 10,
    transform: 'rotate(45deg)',
    borderTopLeftRadius: 2,
});