import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const RotacionAlgoritm = (grados: number) => {
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
        rotacion(grados)
    };


    function rotacion(grados) {
        var image2 = new Image() as any;
        image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        var result = new Image() as any;

        const pixelsAux = image2.data;
        const filas = image2.height;
        const columnas = image2.width;
        const numPixels = columnas * filas;

        grados = grados * Math.PI / 180;
        var nDF = Math.floor((filas * Math.abs(Math.cos(grados))) + (columnas * Math.abs(Math.sin(grados))));
        var nDC = Math.floor((filas * Math.abs(Math.sin(grados))) + (columnas * Math.abs(Math.cos(grados))));
        
        result = ctx2.createImageData(nDC, nDF);
        const refX = nDC / 2;
        const refY = nDF / 2;
        
        canvas2.width = nDC;
        canvas2.height = nDF;
        
        const yoffset = Math.floor(refY - (filas / 2));
        const xoffset = Math.floor(refX - (columnas / 2));
        for (var i = 0; i < numPixels; i++) {
            var nuevaX = i % columnas - refX + xoffset;
            var nuevaY = Math.floor(i / columnas) - refY + yoffset;

            var yPrima = Math.floor(refY + (nuevaY * Math.cos(grados) - nuevaX * Math.sin(grados)));
            var xPrima = Math.floor(refX + (nuevaY * Math.sin(grados) + nuevaX * Math.cos(grados)));
            if (yPrima >= 0 && yPrima < nDF && xPrima >= 0 && xPrima < nDC) {
                result.data[(yPrima * nDC + xPrima) * 4] = pixelsAux[((Math.floor(i / columnas) * columnas) + (i % columnas)) * 4];
                result.data[(yPrima * nDC + xPrima) * 4 + 1] = pixelsAux[((Math.floor(i / columnas) * columnas) + (i % columnas)) * 4 + 1];
                result.data[(yPrima * nDC + xPrima) * 4 + 2] = pixelsAux[((Math.floor(i / columnas) * columnas) + (i % columnas)) * 4 + 2];
                result.data[(yPrima * nDC + xPrima) * 4 + 3] = 255;
            }
        }
        ctx2.putImageData(result, 0, 0);
    }
};

export const Rotacion = () => {
    return (
        <div>
            <Input idInput="imagen1" selectTool={() => RotacionAlgoritm(0)} />

            <div className="w-full flex justify-center mb-4">
                <input className="w-[400px]" type={'range'} min={0} max={360} defaultValue={0} onChange={(e) => RotacionAlgoritm(parseInt(e.target.value))} />
            </div>

            <div className="container flex flex-col items-center mx-auto">
                <div className="hidden">
                    <ImageCard key={0} variantName={""} target={0} />
                </div>
                <ImageCard key={1} variantName={"Imágen rotada"} target={1} />
            </div>
        </div>
    );
};
