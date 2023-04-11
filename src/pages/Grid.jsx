import React, { useState, useEffect } from 'react'
import GridBlock from '../components/GridBlock';
import Header from "../components/Header"
import { DijkstraAlgorithm } from '../algorithms/DijkstraAlgorithm';

const Grid = () => {
    const [divWidth, setDivWidth] = useState();
    const [divHeight, setDivHeight] = useState();
    const [NumOfColumn, setNumOfColumn] = useState()
    const [NumOfRow, setNumOfRow] = useState()
    const [StartBlock, setStartBlock] = useState("7-10")
    const [TargetBlock, setTargetBlock] = useState("25-10")

    /**Calculate the width of the div */
    useEffect(() => {
        function handleResize() {
            const divElement = document.querySelector(".main-grid");
            const width = divElement.offsetWidth;
            const height = divElement.offsetHeight;
            setDivWidth(width);
            setDivHeight(height);
        }

        /**Set initial width on mount */
        handleResize();

        /**Add event listener for resize*/
        window.addEventListener("resize", handleResize);

        /**Remove event listener on unmount */
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    /**Set the number of columns and rows */
    useEffect(() => {
        setNumOfColumn(Math.round(divWidth / 25));
        setNumOfRow(Math.round(divHeight / 29));
    }, [divWidth, divHeight])


    /**Run the algorithoms */
    function startAlgorithom() {
        DijkstraAlgorithm(StartBlock, TargetBlock, setStartBlock)
    }

    return (
        <div className='main-grid'>
            <Header
                runAlgorithom={startAlgorithom}
            />
            <table>
                {Array.from({ length: NumOfRow }, (_, index) => index + 1).map((row, index) => {
                    return (
                        <tr key={index}>
                            {Array.from({ length: NumOfColumn }, (_, index) => index + 1).map((col, index) => {
                                return (
                                    <GridBlock
                                        key={index}
                                        col={col}
                                        row={row}
                                        setTargetBlock={setTargetBlock}
                                        setStartBlock={setStartBlock}
                                    />
                                )
                            })}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Grid