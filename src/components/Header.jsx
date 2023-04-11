import React from 'react'

const Header = ({ runAlgorithom }) => {
    return (
        <div className='header-main' style={{ display: "flex" }}>
            <h2>Pathfinding Visualizer</h2>
            <button onClick={runAlgorithom}>Vissualize</button>
        </div>
    )
}

export default Header