import { ImageCard } from "./ImageCard";
import { Input } from "./Input";
import { SliderDemo } from "./SliderDemo"

const ScalaAplicados = (umbral: number) => {
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
    image1.onload = function () {
        canvas1.width = image1.width;
        canvas1.height = image1.height;

        ctx1.drawImage(image1, 0, 0);
        Scala();
    };

    function Scala() {
        var image2 = new Image() as any;
        image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        var image3 = new Image() as any;
        image3 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const pixels = image2.data;
        const pixelsResult = image3.data;
        const numPixels = image2.width * image2.height;
        for (var i = 0; i < numPixels; i++) {
            for (var j = 0; j < (umbral + 1); j++) {
                var iAux = i + (image2.width * j)
                for (var k; k < (umbral + 1); k++) {
                    pixelsResult[iAux * 4 + (4 * k)] = 0;
                    pixelsResult[iAux * 4 + 1 + (4 * k)] = 0;
                    pixelsResult[iAux * 4 + 2 + (4 * k)] = 0;
                }
            }
        }
        canvas2.width = image3.width * (umbral + 1)
        canvas2.height = image3.height * (umbral + 1)

        ctx2.putImageData(image3, 0, 0);
    }
};

const variants = [
    {
        name: "Scalar",
    },
    {
        name: "Scalar",
    },
];

export const Scala = () => {
    return (
        <div>
            <Input idInput="imagen1" selectTool={() => ScalaAplicados(1)} />
            <div className="w-full flex justify-center">
                <SliderDemo />
            </div>

            <div className="container flex flex-col items-center mx-auto">
                {variants.map((variant, target) => (
                    <ImageCard key={target} variantName={variant.name} target={target} />
                ))}
            </div>
        </div>
    )
}