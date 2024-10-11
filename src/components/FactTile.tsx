
const FactTile = ({ fact }: { fact: string }) => {
    return (
        <div className="px-3 py-2 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in m-2  bg-slate-50 rounded-lg">
            <p>{fact}</p>
        </div>
    )
}

export default FactTile;