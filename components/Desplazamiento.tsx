import { Dispatch, SetStateAction, useRef, useState } from "react";

import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const DesplazamientoAlgoritm = (imageDimension: {
    width: number;
    height: number;
},
    setImageDimension: Dispatch<SetStateAction<{
        width: number;
        height: number;
    }>>, numeroDesplazamientoX: number, numeroDesplazamientoY: number) => {


    var canvas1 = document.getElementById(
        "canvasImagen1"
    ) as HTMLCanvasElement | null;

    var image1 = new Image();
    var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

    var ctx1 = canvas1?.getContext("2d");

    var curFile = imagen1.files;

    if (!curFile.length) {
      return;
    }
    image1.src = window.URL.createObjectURL(curFile[0]);
    image1.onload = function () {
        canvas1.width = image1.width;
        canvas1.height = image1.height;

        setImageDimension({ width: image1.width, height: image1.height })

        ctx1.drawImage(image1, 0, 0);
        desplazamiento();
    };

    function desplazamiento() {
        var original = new Image() as any;
        original = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

        var result = new Image() as any;
        result = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

        const pixel = original.data;
        const res = result.data;
        const numPixels = original.width * original.height;

        for (var i = 0; i < numPixels; i++) {
            res[i * 4] = 0
            res[i * 4 + 1] = 0
            res[i * 4 + 2] = 0
        }

        const limite = image1.width + numeroDesplazamientoX
        if (numeroDesplazamientoX < 0) {
            for (var i = 0; i < numPixels; i++) {
                if (i % image1.width < limite) {
                    res[(i + (numeroDesplazamientoY * image1.width)) * 4] = pixel[(i - numeroDesplazamientoX) * 4];
                    res[(i + (numeroDesplazamientoY * image1.width)) * 4 + 1] = pixel[(i - numeroDesplazamientoX) * 4 + 1];
                    res[(i + (numeroDesplazamientoY * image1.width)) * 4 + 2] = pixel[(i - numeroDesplazamientoX) * 4 + 2];

                }
                else {
                    res[i * 4] = 0
                    res[i * 4 + 1] = 0
                    res[i * 4 + 2] = 0
                }
            }
        }
        else {
            for (var i = 0; i < numPixels; i++) {
                res[(i + numeroDesplazamientoX + (numeroDesplazamientoY * image1.width)) * 4] = pixel[i * 4];
                res[(i + numeroDesplazamientoX + (numeroDesplazamientoY * image1.width)) * 4 + 1] = pixel[i * 4 + 1];
                res[(i + numeroDesplazamientoX + (numeroDesplazamientoY * image1.width)) * 4 + 2] = pixel[i * 4 + 2];

                if ((i % image1.width <= numeroDesplazamientoX)) {
                    res[i * 4] = 0
                    res[i * 4 + 1] = 0
                    res[i * 4 + 2] = 0
                }
            }
            if (numeroDesplazamientoY < 0) {
                for (i = 0; i < numPixels; i++) {
                    if ((i % image1.width) < numeroDesplazamientoX) {
                        res[i * 4] = 0
                        res[i * 4 + 1] = 0
                        res[i * 4 + 2] = 0
                    }
                }
            }
        }
        ctx1.putImageData(result, 0, 0);
    }
};

const variants = [
    {
        name: "",
    },
];

export const Desplazamiento = () => {
    const [imageDimension, setImageDimension] = useState({ width: 0, height: 0 })
    const [desplazamiento, setDesplazamiento] = useState({ dX: 0, dY: 0 })

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => DesplazamientoAlgoritm(imageDimension, setImageDimension, 0, 0)} />
            <div className="container mx-auto flex flex-col space-y-4 items-center mb-10">
                <input className="w-[400px]" type={'range'} min={-imageDimension.width} max={imageDimension.width} defaultValue={0} onChange={(e) => { setDesplazamiento({ ...desplazamiento, dX: parseInt(e.target.value) }), DesplazamientoAlgoritm(imageDimension, setImageDimension, parseInt(e.target.value), desplazamiento.dY) }} />
                <input className="w-[400px]" type={'range'} min={-imageDimension.width} max={imageDimension.width} defaultValue={0} onChange={(e) => { setDesplazamiento({ ...desplazamiento, dY: parseInt(e.target.value) }), DesplazamientoAlgoritm(imageDimension, setImageDimension, desplazamiento.dX, parseInt(e.target.value)) }} />
                {variants.map((variant, target) => (
                    <ImageCard variantName={variant.name} target={target} />
                ))}
            </div>
        </div>
    );
};
