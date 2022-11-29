import { Dispatch, SetStateAction, useState } from "react";

import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const HistogramaAlgoritm = (setRedChannel: Dispatch<SetStateAction<any[]>>, setGreenChannel: Dispatch<SetStateAction<any[]>>, setBlueChannel: Dispatch<SetStateAction<any[]>>, desplazamiento: number) => {
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
        ctx1.drawImage(image1, 0, 4);
        histograma();
    };

    function histograma() {

        var redChannelValues = new Array(256).fill(0)
        var greenChannelValues = new Array(256).fill(0)
        var blueChannelValues = new Array(256).fill(0)

        var image = new Image() as any;
        image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const pixels = image.data;

        var image2 = new Image() as any;
        image2 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const respaldo = image2.data;

        const numPixels = image.width * image.height;

        for (i = 0; i < numPixels; i++) {
            pixels[i * 4] = (respaldo[i * 4] + desplazamiento) > 255 ? 255 : respaldo[i * 4] + desplazamiento
            pixels[i * 4 + 1] = (respaldo[i * 4 + 1] + desplazamiento) > 255 ? 255 : respaldo[i * 4 + 1] + desplazamiento
            pixels[i * 4 + 2] = (respaldo[i * 4 + 2] + desplazamiento) > 255 ? 255 : respaldo[i * 4 + 2] + desplazamiento
        }
        canvas2.width = canvas1.width;
        canvas2.height = canvas1.height;
        ctx2.putImageData(image, 0, 0);

        for (var i = 0; i < numPixels; i++) {
            redChannelValues[pixels[i * 4]] += 1;
            greenChannelValues[pixels[i * 4 + 1]] += 1;
            blueChannelValues[pixels[i * 4 + 2]] += 1;
        }

        var maxR = Math.max(...redChannelValues)
        var maxG = Math.max(...greenChannelValues)
        var maxB = Math.max(...blueChannelValues);

        for (i = 0; i < redChannelValues.length; i++) {
            redChannelValues[i] = Math.trunc((redChannelValues[i] * 400) / maxR)
            greenChannelValues[i] = Math.trunc((greenChannelValues[i] * 400) / maxG)
            blueChannelValues[i] = Math.trunc((blueChannelValues[i] * 400) / maxB)
        }

        console.log(redChannelValues)

        setRedChannel(redChannelValues)
        setGreenChannel(greenChannelValues)
        setBlueChannel(blueChannelValues)
    }
};

export const Histograma = () => {
    const [redChannel, setRedChannel] = useState<any[]>([0])
    const [blueChannel, setBlueChannel] = useState<any[]>([0])
    const [greenChannel, setGreenChannel] = useState<any[]>([0])

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, 0)} />

            <div className="container mx-auto flex space-x-5 justify-center">
                <ImageCard variantName={"Imagen Original"} target={0} />
                <ImageCard variantName={"Imagen Modificada"} target={1} />
            </div>

            <div className="w-full flex justify-center mb-4">
                <input className="w-[400px]" type={'range'} min={-256} max={256} defaultValue={0} onChange={(e) => HistogramaAlgoritm(setRedChannel, setBlueChannel, setGreenChannel, parseInt(e.target.value))} />
            </div>
            {
                redChannel.length > 1 && (
                    <div className="w-full flex pb-5">
                        <div className="flex flex-col bg-[#fffaeb] shadow-red-600 shadow-2xl w-min mx-auto ">
                            <h1 className="text-center font-ramptartOne text-red-600 text-4xl">Red</h1>
                            <div className="flex justify-center items-baseline">
                                {redChannel.map((el, i) => (
                                    <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-red-600" key={i} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col bg-[#fffaeb] shadow-green-800 shadow-2xl w-min mx-auto">
                            <h1 className="text-center font-ramptartOne text-green-800 text-4xl">Green</h1>
                            <div className="flex justify-center items-baseline">
                                {greenChannel.map((el, i) => (
                                    <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-green-800" key={i} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col bg-[#fffaeb] shadow-blue-700 shadow-2xl w-min mx-auto">
                            <h1 className="text-center font-ramptartOne text-blue-700 text-4xl">Blue</h1>
                            <div className="flex justify-center items-baseline">
                                {blueChannel.map((el, i) => (
                                    <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-blue-700" key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
