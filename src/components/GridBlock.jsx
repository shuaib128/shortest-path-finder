import React from 'react';

const GridBlock = ({ col, row, setStartBlock, setTargetBlock }) => {
    const colRow = `${col}-${row}`;

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        var divElement = document.getElementsByClassName(ev.target.parentNode.className)[0]
        divElement.setAttribute("data-travelCost", "infinity")

        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        if (data === "start-img") {
            setStartBlock(ev.target.className);
        }

        if (data === "target-img") {
            setTargetBlock(ev.target.className);
        }

        var divElement = document.getElementsByClassName(ev.target.className)[0]
        divElement.setAttribute("data-travelCost", 0)
    }


    return (
        <td
            id="grid"
            data-travelCost={colRow === "7-10" ? 0 : "infinity"}
            className={colRow}
            onDrop={(event) => drop(event)}
            onDragOver={(event) => allowDrop(event)}
        >
            {colRow === "7-10" ?
                <img
                    id="start-img"
                    draggable={true}
                    onDragStart={(event) => drag(event)}
                    src="Images/starticon.svg"
                    alt=""
                /> :
                ""
            }

            {colRow === "25-10" ?
                <img
                    id="target-img"
                    draggable={true}
                    onDragStart={(event) => drag(event)}
                    src="Images/targeticon.svg"
                    alt=""
                /> :
                ""
            }
        </td>
    );
};

export default GridBlock;