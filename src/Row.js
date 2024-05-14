import Box from "./Box";

export default function Row() {
    return (
        <div className="row">
            {Array(9).fill(0).map((p, index) => <Box key={index} onChange={(val) => console.log(val)} />)}
        </div>
    )
}