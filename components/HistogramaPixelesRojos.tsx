import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "./Button";
import { ImageCard } from "./ImageCard";
import { Input } from "./Input";
import { start } from "repl";

const HistogramaAlgoritm = (setChannel: Dispatch<SetStateAction<any[]>>,
    setPixelsRange: Dispatch<SetStateAction<{
        start: number;
        end: number;
    }>>, initialPoint: number, endPoint: number) => {
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
        var channelValues = new Array(256).fill(0)

        var image = new Image() as any;
        image = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        const pixels = image.data;
        const numPixels = image.width * image.height;

        canvas2.width = canvas1.width;
        canvas2.height = canvas1.height;

        var changePixels = []

        for (var i = 0; i < numPixels; i++) {
            if ((pixels[i * 4] >= initialPoint) && (pixels[i * 4] <= endPoint))
                changePixels.push(i)
            channelValues[pixels[i * 4]] += 1;
        }

        var maxPixel = Math.max(...channelValues)

        for (i = 0; i < channelValues.length; i++) {
            channelValues[i] = Math.trunc((channelValues[i] * 400) / maxPixel)
        }

        setChannel(channelValues)

        for (i = 0; i < changePixels.length; i++) {
            pixels[changePixels[i] * 4 + 1] = 0
            pixels[changePixels[i] * 4 + 2] = 0
        }
        ctx2.putImageData(image, 0, 0);
    }
};


export const HistogramaPixelesRojos = () => {
    const [channel, setChannel] = useState<any[]>([0])
    const [pixelsRange, setPixelsRange] = useState({ start: -1, end: -1 })

    return (
        <div>
            <Input idInput="imagen1" selectTool={() => HistogramaAlgoritm(setChannel, setPixelsRange, 0, 0)} />

            <div className="container mx-auto flex space-x-5 justify-center">
                <div className="hidden">
                    <ImageCard variantName={""} target={0} />
                </div>
                <ImageCard variantName={"Imagen"} target={1} />
            </div>

            {
                channel.length > 1 && (
                    <div className="w-full flex flex-col items-center space-y-2 pb-5">
                        <div className="flex flex-col bg-[#fffaeb] shadow-black shadow-2xl w-min mx-auto ">
                            <h1 className="text-center font-ramptartOne text-4xl">Histograma</h1>
                            <div className="flex justify-center items-baseline">
                                {channel.map((el, i) => (
                                    <button onClick={() => {
                                        if (pixelsRange.start < 0) {
                                            setPixelsRange({ ...pixelsRange, start: i })
                                            return
                                        }
                                        if (pixelsRange.start > 0)
                                            setPixelsRange({ ...pixelsRange, end: i })

                                        HistogramaAlgoritm(setChannel, setPixelsRange, pixelsRange.start, i)
                                    }}
                                        style={{ height: (el * 0.5) }}
                                        className={`w-[5px] hover:w-[15px] border border-black hover:cursor-pointer bottom-0 ${i == pixelsRange.start ? 'bg-red-500' : ((pixelsRange.end >= i) && ((pixelsRange.start <= i))) ? 'bg-red-500' : 'bg-yellow-400'}`} key={i} />
                                ))}
                            </div>
                        </div>
                        <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded h-11 w-36 cursor-pointer" onClick={() => { setPixelsRange({ start: -1, end: -1 }); HistogramaAlgoritm(setChannel, setPixelsRange, 0, 0) }}>Reiniciar</button>
                    </div>
                )
            }
        </div>
    );
};
