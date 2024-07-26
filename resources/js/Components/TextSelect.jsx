
export default function TextSelect({ options, formater = 0, ...props }) {
    return (
        <select {...props} className=" w-full block rounded-md mb-2">
            {formater === 0 ? (
                <>
                    {options.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </>
            ) : (
                <>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>{option.name}</option>
                    ))}
                </>
            )}

        </select>

    );
}