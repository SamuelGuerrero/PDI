import { useEffect, useState } from "react";

import { Bordes } from "../components/Bordes";
import { Convolucion } from "../components/Convolucion";
import { Desplazamiento } from "../components/Desplazamiento";
import { Foco } from "../components/Foco";
import { FrecuenciaAcumulada } from "../components/FrecuenciaAcumulada";
import Head from "next/head";
import { Histograma } from "../components/Histograma";
import { HistogramaColoreado } from "../components/HistogramaColoreado";
import { HistogramaPixelRojo } from "../components/HistogramaPixelRojo";
import { HistogramaPixelesRojos } from "../components/HistogramaPixelesRojos";
import { NavBar } from "../components/NavBar";
import { Operadores } from "../components/Operadores";
import { RGB } from "../components/RGB";
import { Rotacion } from "../components/Rotacion";
import { Scala } from "../components/Scala";
import { Scalar } from "../components/Scalar";
import { Segmentacion } from "../components/Segmentacion";
import { SegmentacionEuclideana } from "../components/SegmentacionEuclideana";
import { SegmentacionMahalanobis } from "../components/SegmentacionMahalanobis";
import { Dilatacion } from "../components/Dilatacion";
import { Erosion } from "../components/Erosion";
import { Esqueleto } from "../components/Esqueleto";
import { Relleno } from "../components/Relleno";
import { ErosionDilatacion } from "../components/ErosionDilatacion";

export default function Home() {
  const [toolSelected, setToolSelected] = useState("RGB");

  useEffect(() => {
    const toolInCookie = localStorage.getItem('toolSelected');
    if (toolInCookie) {
      setToolSelected(toolInCookie)
    }
  }, []);

  return (
    <div className="h-screen">
      <Head>
        <title>PDI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar setMode={setToolSelected} toolSelected={toolSelected} />
      <div className="pt-24 h-full">
        <div>{toolSelected == "Bordes" && <Bordes />}</div>
        <div>{toolSelected == "RGB" && <RGB />}</div>
        <div>{toolSelected == "Operadores" && <Operadores />}</div>
        <div>{toolSelected == "Convolucion" && <Convolucion />}</div>
        <div>{toolSelected == "Foco" && <Foco />}</div>
        <div>{toolSelected == "Histograma" && <Histograma />}</div>
        <div>{toolSelected == "Scalar" && <Scalar />}</div>
        <div>{toolSelected == "Scala" && <Scala />}</div>
        <div>{toolSelected == "Desplazamiento" && <Desplazamiento />}</div>
        <div>{toolSelected == "Histograma Pixel Rojo" && <HistogramaPixelRojo />}</div>
        <div>{toolSelected == "Histograma Pixeles Rojos" && <HistogramaPixelesRojos />}</div>
        <div>{toolSelected == "Histograma Coloreado" && <HistogramaColoreado />}</div>
        <div>{toolSelected == "Rotacion" && <Rotacion />}</div>
        <div>{toolSelected == "Histograma Frecuencia Acumulada" && <FrecuenciaAcumulada />}</div>
        <div>{toolSelected == "Segmentacion" && <Segmentacion />}</div>
        <div>{toolSelected == "Segmentacion Euclideana" && <SegmentacionEuclideana />}</div>
        <div>{toolSelected == "Segmentacion Mahalanobis" && <SegmentacionMahalanobis />}</div>
        <div>{toolSelected == "Dilatacion" && <Dilatacion />}</div>
        <div>{toolSelected == "Erosion" && <Erosion />}</div>
        <div>{toolSelected == "Esqueleto" && <Esqueleto />}</div>
        <div>{toolSelected == "Relleno" && <Relleno />}</div>
        <div>{toolSelected == "ErosionDilatacion" && <ErosionDilatacion />}</div>
      </div>
    </div>
  );
}
