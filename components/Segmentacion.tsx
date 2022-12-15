import { Dispatch, SetStateAction, useState } from "react";
import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const SegmentacionAlgoritm = (setRgbPixel: Dispatch<SetStateAction<{
    R: number;
    G: number;
    B: number;
}>>) => {
    var canvas1 = document.getElementById(
        "canvasImagen1"
    ) as HTMLCanvasElement | null;
    var canvas2 = document.getElementById(
        "canvasImagen2"
    ) as HTMLCanvasElement | null;

    var image1 = new Image();
    var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

    var ctx1 = canvas1?.getContext("2d");
    var ctx2 = canvas2?.getContext("2d");

    var curFile = imagen1.files;
    image1.src = window.URL.createObjectURL(curFile[0]);

    canvas1.addEventListener("click", manejadorRaton, false);
    image1.onload = function () {
        canvas1.width = image1.width;
        canvas1.height = image1.height;

        ctx1.drawImage(image1, 0, 0);
        segmentacion();
    };

    function segmentacion() {
        var image2 = new Image() as any;
        image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const pixels = image2.data;
        const numPixels = image2.width * image2.height;

        for (var i = 0; i < numPixels; i++) {
            pixels[i * 4] = 0;
            pixels[i * 4 + 1] = 0;
            pixels[i * 4 + 2] = pixels[i * 4 + 2];
        }
        canvas2.width = image2.width;
        canvas2.height = image2.height;
        ctx2.putImageData(image2, 0, 4);
    }

    function manejadorRaton(e) {
        var relativeX =
            e.clientX - (canvas1.offsetLeft - Math.floor(window.scrollX))
        var relativeY =
            e.clientY - (canvas1.offsetTop - Math.floor(window.scrollY))

        console.log(relativeX, relativeY)
    }
};

const variants = [
    {
        name: "Imágen Original",
    },
    {
        name: "Canal Azúl",
    },
];

export const Segmentacion = () => {
    const [rgbPixel, setRgbPixel] = useState({ R: 0, G: 0, B: 0 })

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => SegmentacionAlgoritm(setRgbPixel)} />

            <div className="w-10 h-10 mx-auto" style={{ background: `rgb(${"0,0,0"})` }}>

            </div>

            <div className="container flex flex-col items-center mx-auto">
                {variants.map((variant, target) => (
                    <ImageCard key={target} variantName={variant.name} target={target} />
                ))}
            </div>
        </div>
    );
};
