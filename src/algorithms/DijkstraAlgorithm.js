export async function DijkstraAlgorithm(startBlock_, targetBlock, setStartBlock) {
    var startBlock = startBlock_
    const cost_of_travel = 10
    var unvisited_nodes = []
    const visited_color = "rgb(175, 216, 248)"
    let statementMatched = false;

    /**
     * Get the travel-cost value
     */
    function costValue(nodeDom) {
        var divElement = document.getElementsByClassName(nodeDom)[0]
        var travel_cost = divElement.getAttribute("data-travelCost")
        return travel_cost
    }

    /**
     * calculate travel cost
     */
    function calculateTravelCost(visitingNode, unvisited_nodes) {
        // console.log(startBlock);
        const start_node_row = visitingNode.split("-")[1]
        const start_node_col = visitingNode.split("-")[0]
        const neibor_top = start_node_col + "-" + String(parseInt(start_node_row) - 1)
        const neibor_bottom = start_node_col + "-" + String(parseInt(start_node_row) + 1)
        const neibor_right = String(parseInt(start_node_col) + 1) + "-" + start_node_row
        const neibor_left = String(parseInt(start_node_col) - 1) + "-" + start_node_row

        /**Get the vising node & neibor nodes DOM element */
        const start_node = document.getElementsByClassName(visitingNode)[0]
        const neibor_top_node = document.getElementsByClassName(neibor_top)[0]
        const neibor_bottom_node = document.getElementsByClassName(neibor_bottom)[0]
        const neibor_right_node = document.getElementsByClassName(neibor_right)[0]
        const neibor_left_node = document.getElementsByClassName(neibor_left)[0]

        unvisited_nodes.push(
            start_node,
            neibor_top_node,
            neibor_bottom_node,
            neibor_right_node,
            neibor_left_node
        )

        /**Get the visiting note & neibor nodes current cost */
        const start_grid_travel_cost = costValue(start_node.className)

        /**Calculate neibor travel cost */
        function calculateNaborToNabor(cost) {
            return cost === "infinity" ? 0 : parseInt(cost)
        }

        /**Calculate the naibers new travel cost */
        const start_new_travel_cost = calculateNaborToNabor(start_grid_travel_cost) + cost_of_travel
        const neibor_top_new_travel_cost = calculateNaborToNabor(start_grid_travel_cost) + cost_of_travel
        const neibor_bottom_new_travel_cost = calculateNaborToNabor(start_grid_travel_cost) + cost_of_travel
        const neibor_right_new_travel_cost = calculateNaborToNabor(start_grid_travel_cost) + cost_of_travel
        const neibor_left_new_travel_cost = calculateNaborToNabor(start_grid_travel_cost) + cost_of_travel
        const new_costs = [
            start_new_travel_cost,
            neibor_top_new_travel_cost,
            neibor_bottom_new_travel_cost,
            neibor_right_new_travel_cost,
            neibor_left_new_travel_cost
        ]

        function updateTravelCost(node, newCost) {
            var current_cost = node.getAttribute("data-travelCost");

            if (current_cost === "infinity" || parseInt(current_cost) > newCost) {
                node.setAttribute("data-travelCost", newCost)
            }
        }

        /**Update travel cost */
        unvisited_nodes.map((node, index) => {
            node.style.backgroundColor = visited_color
            updateTravelCost(node, new_costs[index])
        })
        console.log(new_costs);
        start_node.style.backgroundColor = "red"

        /**Remove the start node from unvidited_nodes */
        var index = unvisited_nodes.indexOf(start_node);
        if (index !== 1) {
            unvisited_nodes.splice(index, 1)
        }

        unvisited_nodes.forEach((node) => {
            if (parseInt(costValue(node.className)) < cost_of_travel) {
                startBlock = node.className
            } else {
                startBlock = unvisited_nodes[0].className
            }
        })
        // console.log(unvisited_nodes);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 0);
        })
    }
    while (startBlock !== targetBlock) {
        await calculateTravelCost(startBlock, unvisited_nodes);
    }
}