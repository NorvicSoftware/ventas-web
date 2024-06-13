export function PrintTitle({
    title,
    subtitle = "Titulo por defecto",
    myArray,
    myObject,
}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <p>{myArray}</p>
            <p>{JSON.stringify(myObject)}</p>
        </div>
    );
}
