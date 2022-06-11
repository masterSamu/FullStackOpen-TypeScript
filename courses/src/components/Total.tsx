
interface Props {
    totalCount: number
}

const Total = ({totalCount}: Props) => {
    return (
        <div>Number of exercises {totalCount}</div>
    );
};

export default Total;