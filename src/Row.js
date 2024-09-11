import Box from "./Box";

export default function Row({numList}) {
    return (
        <div className="row">
            {numList.map((num, index) => <Box key={index} value={num} onChange={(val) => console.log(val)} />)}
        </div>
    )
}