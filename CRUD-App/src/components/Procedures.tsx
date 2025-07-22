import { useState, useEffect } from "react";

type Procedure = {
    id: number;
    name: string;
    description: string;
    category: string;
};

function Procedures() {
    const [procedures, setProcedures] = useState<Procedure[]>([]);
    useEffect(()=>{
        fetch('http://localhost:3000/procedures')
        .then((res)=>res.json())
        .then((data)=>setProcedures(data))
        .catch((err)=>console.error('Error fetching procedures.',err));
    },[]);

    return (
        <>
        <h1>Procedures</h1>
            <ul>
                {procedures.map((procedure)=>(
                    <li key = {procedure.id}>
                        {procedure.name}
                        {procedure.category}
                        {procedure.description}
                    </li>
                ))}
                
            </ul>
            
        </>
    )
}

export default Procedures;