//iterujemy po wszystkich nodeach i dla każdego nodea iterujemy po wszystkich krawędziach i zapisujemy
//do niego parenta jezeli jest jako target (wtedy parentem jest source) i childa jezeli jest oznaczony jako source
//(wtedy childem jest target)
//można to robić przy każdej próbie stworzenia krawędzi - jeżeli jakiś node miałby mieć więcej niż jednego childa
//to wtedy nie pozwalamy utworzyć krawędzi
//w następnym kroku wyszukujemy w kolekcji "root" nodea, tzn. takiego nodea który nie ma childów (jeżeli znajdziemy
//więcej takich nodeów to znaczy, że są nodey bez połączeń i powinniśmy zwrócic błąd)
//dla root nodea wyliczamy d* = 1-d
//następnie rekurencyjnie dla każdego parenta wyliczamy d* jako max(d*_childa oraz d*_parenta)
//po wyliczeniu dla całego drzewa d* przechodzimy do wyznaczania kolejności wpisania tasków do tabelki
//rekurencyjnie wyszukujemy taski które albo nie mają parenta albo których parenty zostały już wpisane do tabelki
//a następnie sortujemy je w kolejności malejącej i wypluwamy max tyle tasków ile mamy procesów
//gdy wszystkei taski są oznaczone jako wpisane do tabelki algorytm zakończył prace


// class Node {
//     constructor(node, edges) {
//         this.id = node.id;
//         this.position = node.position;
//         this.d = node.data.d;
//         //this.color = node.data.color
//     }
// }
//
// class Tree {
//     constructor(nodes) {
//
//     }
//
// }

export const algorithm = (flowNodes, flowEdges, processes) => {
    const nodes = flowNodes.map(node => {
        return {
            id: node.id,
            position: node.position,
            d: node.data.d,
            color: node.data.color ?? "#FFFFFF",
            parents: flowEdges.filter(edge => edge.target === node.id)
                .flatMap(edge => flowNodes.filter(node => edge.source === node.id)),
            child: flowEdges.filter(edge => edge.source === node.id)
                .flatMap(edge => flowNodes.filter(node => edge.target === node.id))
        }
    })

    console.log(`Begin nodes:`)
    console.log(nodes)
    console.log("------")

    if (nodes.filter(node => node.child.length === 0).length !== 1) throw new Error("Niepoprawne drzewo - błędna liczba root nodeów");
    if (nodes.filter(node => node.child.length > 1).length !== 0) throw new Error("Niepoprawne drzewo - połączenia z większą ilością childów niż jeden");

    const rootNode = nodes.filter(node => node.child.length === 0)[0];

    console.log(`rootNode:`)
    console.log(rootNode)
    console.log("------")

    const calculateDStar = (currentNode, nodesList, nodes) => {
        const nodeWithD = calculateD(currentNode, nodesList);
        console.log(`NodeWithD:`)
        console.log(nodeWithD)
        console.log("------")

        nodesList.push(nodeWithD);
        for (let i = 0; i < currentNode.parents.length; ++i) {
            let node = nodes.filter(n => n.id === currentNode.parents[i].id)[0]
            console.log(`invoke calculateDStar with i=${i}`)
            console.log(node)
            console.log("------")
            calculateDStar(node, nodesList, nodes);
        }
    }

    const calculateD = (currentNode, nodeList) => {
        console.log("calculateD currentNode:")
        console.log(currentNode)
        console.log("------")

        if (currentNode.child.length === 0) {
            return {
                ...currentNode,
                dStar: 1 - currentNode.d
            };
        }

        const d1 = 1 - currentNode.d;
        let node = nodeList.filter(n => n.id === currentNode.child[0].id)[0]
        const d2 = 1 + node.dStar;
        return {
            ...currentNode,
            dStar: d1 > d2 ? d1 : d2
        };
    }

    const nodesWithDStar = (rootNode, nodes) => {
        let nodesList = []
        calculateDStar(rootNode, nodesList, nodes);
        return nodesList;
    }

    const result = nodesWithDStar(rootNode, nodes)
    console.log(`algorithm result list:`)
    console.log(result)
    console.log("------")

    const findAvailableTasks = (addedTasks) => {
        let tasks = [];

        for (let i = 0; i < result.length; i++) {
            let skip = false;

            for (let k = 0; k < addedTasks.length; k++) {
                if (addedTasks[k].id === result[i].id) {
                    skip = true;
                }
            }

            if (skip) {
                continue;
            }

            if (result[i].parents.length === 0) {
                tasks.push(result[i]);
                continue;
            }

            let counter = 0;

            for (let j = 0; j < result[i].parents.length; j++) {
                for (let k = 0; k < addedTasks.length; k++) {
                    if (addedTasks[k].id === result[i].parents[j].id) {
                        counter++;
                    }
                }
            }

            if (counter === result[i].parents.length) {
                tasks.push(result[i])
            }
        }

        tasks.sort((a, b) => a.dStar - b.dStar);

        return tasks;
    }

    const calculateTable = () => {
        let index = 0;
        let addedTasks = [];
        let availableTasks = findAvailableTasks(addedTasks);
        let table = [];

        while (index < result.length && availableTasks.length > 0) {
            let processesCount = 0;
            let tasks = [];

            for (let i = 0; i < availableTasks.length; ++i) {
                if (processesCount < processes) {
                    tasks.push(
                        {
                            p: processesCount + 1,
                            task: availableTasks[i]
                        })

                    addedTasks.push(availableTasks[i])
                } else {
                    break;
                }

                ++processesCount;
            }

            table.push(tasks);

            availableTasks = findAvailableTasks(addedTasks);

            ++index;
        }

        const output = [];
        let lmax = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < table.length; i++)
        {
            const row = [];
            for(let j = 0; j < table[i].length; j++)
            {
                const L = i + 1 - table[i][j].task.d;
                lmax = L > lmax ? L : lmax;
                row.push({task: table[i][j], l: L});
            }

            output.push(row);
        }

        return {table: output, Lmax: lmax};
    }

    const table = calculateTable();
    return result
}