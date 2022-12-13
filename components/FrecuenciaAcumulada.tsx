import { Dispatch, SetStateAction, useState } from "react";

import { ImageCard } from "./ImageCard";
import { Input } from "./Input";

const FrecuenciaAcumuladaAlgoritm = (
    setRedChannel: Dispatch<SetStateAction<any[]>>,
    setGreenChannel: Dispatch<SetStateAction<any[]>>,
    setBlueChannel: Dispatch<SetStateAction<any[]>>,
    setRedChannelAcumulada: Dispatch<SetStateAction<any[]>>,
    setGreenChannelAcumulada: Dispatch<SetStateAction<any[]>>,
    setBlueChannelAcumulada: Dispatch<SetStateAction<any[]>>,

) => {
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

    if (!curFile.length) {
      return;
    }
    image1.src = window.URL.createObjectURL(curFile[0]);
    image1.onload = function () {
        canvas1.width = image1.width;
        canvas1.height = image1.height;

        ctx1.drawImage(image1, 0, 0);
        frecuenciaAcumulada();
    };

    function frecuenciaAcumulada() {
        var redChannelValues = new Array(256).fill(0)
        var greenChannelValues = new Array(256).fill(0)
        var blueChannelValues = new Array(256).fill(0)

        var image = new Image() as any;
        image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const pixels = image.data;
        const numPixels = image.width * image.height;

        canvas2.width = canvas1.width;
        canvas2.height = canvas1.height;

        /* */
        for (var i = 0; i < numPixels; i++) {
            redChannelValues[pixels[i * 4]] += 1;
            greenChannelValues[pixels[i * 4 + 1]] += 1;
            blueChannelValues[pixels[i * 4 + 2]] += 1;
        }

        var maxR = Math.max(...redChannelValues)
        var maxG = Math.max(...greenChannelValues)
        var maxB = Math.max(...blueChannelValues)

        for (i = 0; i < redChannelValues.length; i++) {
            redChannelValues[i] = Math.trunc((redChannelValues[i] * 400) / maxR)
            greenChannelValues[i] = Math.trunc((greenChannelValues[i] * 400) / maxG)
            blueChannelValues[i] = Math.trunc((blueChannelValues[i] * 400) / maxB)
        }

        setRedChannel(redChannelValues)
        setGreenChannel(greenChannelValues)
        setBlueChannel(blueChannelValues)

        var hra = new Array(256).fill(0);
        var hga = new Array(256).fill(0);
        var hba = new Array(256).fill(0);

        hra[0] = redChannelValues[0];
        hga[0] = greenChannelValues[0];
        hba[0] = blueChannelValues[0];

        for (var i = 1; i < 256; i++) {
            hra[i] = redChannelValues[i] + hra[i - 1];
            hga[i] = greenChannelValues[i] + hga[i - 1];
            hba[i] = blueChannelValues[i] + hba[i - 1];
        }

        for (var i = 0; i < numPixels; i++) {
            image.data[i * 4] = Math.round(255 * (hra[image.data[i * 4]] / numPixels));
            image.data[i * 4 + 1] = Math.round(255 * (hga[image.data[i * 4 + 1]] / numPixels));
            image.data[i * 4 + 2] = Math.round(255 * (hba[image.data[i * 4 + 2]] / numPixels));
        }

        var maxR = Math.max(...hra)
        var maxG = Math.max(...hga)
        var maxB = Math.max(...hba)

        for (i = 0; i < hra.length; i++) {
            hra[i] = Math.trunc((hra[i] * 400) / maxR)
            hga[i] = Math.trunc((hga[i] * 400) / maxG)
            hba[i] = Math.trunc((hba[i] * 400) / maxB)
        }

        setRedChannelAcumulada(hra)
        setGreenChannelAcumulada(hga)
        setBlueChannelAcumulada(hba)

        canvas2.width = image.width;
        canvas2.height = image.height;
        ctx2.putImageData(image, 0, 0);
    }
};

export const FrecuenciaAcumulada = () => {
    const [redChannel, setRedChannel] = useState<any[]>([0])
    const [greenChannel, setGreenChannel] = useState<any[]>([0])
    const [blueChannel, setBlueChannel] = useState<any[]>([0])

    const [redChannelAcumulada, setRedChannelAcumulada] = useState<any[]>([0])
    const [greenChannelAcumulada, setGreenChannelAcumulada] = useState<any[]>([0])
    const [blueChannelAcumulada, setBlueChannelAcumulada] = useState<any[]>([0])

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => FrecuenciaAcumuladaAlgoritm(setRedChannel, setGreenChannel, setBlueChannel, setRedChannelAcumulada, setGreenChannelAcumulada, setBlueChannelAcumulada)} />
            <div className="container flex flex-col items-center mx-auto">
                <ImageCard key={0} variantName={"Imagen Original"} target={0} />
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
                <ImageCard key={1} variantName={"Imagen Modificada"} target={1} />

                {
                    redChannelAcumulada.length > 1 && (
                        <div className="w-full flex pb-5">
                            <div className="flex flex-col bg-[#fffaeb] shadow-red-600 shadow-2xl w-min mx-auto ">
                                <h1 className="text-center font-ramptartOne text-red-600 text-4xl">Red</h1>
                                <div className="flex justify-center items-baseline">
                                    {redChannelAcumulada.map((el, i) => (
                                        <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-red-600" key={i} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col bg-[#fffaeb] shadow-green-800 shadow-2xl w-min mx-auto">
                                <h1 className="text-center font-ramptartOne text-green-800 text-4xl">Green</h1>
                                <div className="flex justify-center items-baseline">
                                    {greenChannelAcumulada.map((el, i) => (
                                        <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-green-800" key={i} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col bg-[#fffaeb] shadow-blue-700 shadow-2xl w-min mx-auto">
                                <h1 className="text-center font-ramptartOne text-blue-700 text-4xl">Blue</h1>
                                <div className="flex justify-center items-baseline">
                                    {blueChannelAcumulada.map((el, i) => (
                                        <div style={{ height: (el * 0.8) }} className="w-[1.5px] bottom-0 bg-blue-700" key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
