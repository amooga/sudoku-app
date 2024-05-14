export default function Box({value, onChange}) {
    return (
        <input className="box" type="text" value={value} onChange={(e) => {
            if (!isNaN(e.target.value)) {
                onChange(e.target.value);
            } else {
                return 0;
            }
        }}/>
    )
}
