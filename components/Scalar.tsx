import { Input } from "./Input";

const ScalarAlgoritm = (umbral: number) => {
    var canvas1 = document.getElementById(
        "canvasImagen1"
    ) as HTMLCanvasElement | null;


    var image1 = new Image();
    var imagen1 = document.getElementById("imagen1") as HTMLInputElement;

    var ctx1 = canvas1?.getContext("2d");

    var curFile = imagen1.files;
    image1.src = window.URL.createObjectURL(curFile[0]);
    image1.onload = function () {
        canvas1.width = image1.width;
        canvas1.height = image1.height;
        ctx1.drawImage(image1, 0, 0);
        scala();
    };

    function scala() {
        var image2 = new Image() as any;
        var image1 = new Image() as any;

        image1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);


        imageResult = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        var ancho = canvas1.width;
        var alto = canvas1.height;

        for (var k = 0; k < umbral; k++) {
            const pixels = imageResult.data;
            const numPixels = imageResult.width * imageResult.height;
            var imageResult = new Image() as any;
            imageResult = ctx1.getImageData(
                0,
                0,
                ancho * 2,
                alto * 2
            );
            var result = imageResult.data;
            for (var i = 0, j = 0; i < numPixels; j += 2, i++) {
                result[j * 4] = pixels[i * 4];
                result[j * 4 + 1] = pixels[i * 4 + 1];
                result[j * 4 + 2] = pixels[i * 4 + 2];
                result[j * 4 + 3] = 255;

                result[(j + 1) * 4] = pixels[i * 4];
                result[(j + 1) * 4 + 1] = pixels[i * 4 + 1];
                result[(j + 1) * 4 + 2] = pixels[i * 4 + 2];
                result[(j + 1) * 4 + 3] = 255;

                result[(j + imageResult.width) * 4] = pixels[i * 4];
                result[(j + imageResult.width) * 4 + 1] = pixels[i * 4 + 1];
                result[(j + imageResult.width) * 4 + 2] = pixels[i * 4 + 2];
                result[(j + imageResult.width) * 4 + 3] = 255;

                result[(j + imageResult.width + 1) * 4] = pixels[i * 4];
                result[(j + imageResult.width + 1) * 4 + 1] = pixels[i * 4 + 1];
                result[(j + imageResult.width + 1) * 4 + 2] = pixels[i * 4 + 2];
                result[(j + imageResult.width + 1) * 4 + 3] = 255;

                if (j % imageResult.width == imageResult.width - 2) {
                    j += imageResult.width;
                }
            }
            ancho = ancho * 2;
            alto = alto * 2;
            canvas1.width = imageResult.width;
            canvas1.height = imageResult.height;
        }
        ctx1.putImageData(imageResult, 0, 0);
    }
};

export const Scalar = () => {
    return (
        <div className="h-screen">

            <Input idInput="imagen1" selectTool={() => ScalarAlgoritm(0)} />
            <div className="w-full flex flex-col items-center space-y-4">
                <input
                    className="w-[400px]" type={"range"} min={0} max={4} defaultValue={0} onChange={(e) => ScalarAlgoritm(parseInt(e.target.value))
                    }
                />
                <div className="flex justify-between mx-auto">
                    <canvas className="w-auto" id={"canvasImagen1"}></canvas>
                </div>
            </div>

        </div>
    );
};