
function Highlight({ value, searchValue }: { value: string; searchValue: string }) {
    const regex = new RegExp(`(${searchValue})`, "gi");
    const parts = value.split(regex);

    return (
        <span>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <span key={index} style={{ color: "red" }}>
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </span>
    );
}

export default Highlight
