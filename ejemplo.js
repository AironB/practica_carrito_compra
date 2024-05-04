let arreglo_curso =[
    {
        curso: "Curso1",
        id: 1
    },
    {
        curso: "Curso2",
        id: 2
    },
    {
        curso: "Curso3",
        id: 3
    },
    {
        curso: "Curso1",
        id: 4
    }
]
function eliminar(){
    for(let i = 0; i<=arreglo_curso.length; i++){
        if(arreglo_curso[i].curso != "curso1"){
            console.log(arreglo_curso[i]);
        }
    }
    //filter(map)
    arreglo_curso.filter(curso=>curso.id !==2);
}