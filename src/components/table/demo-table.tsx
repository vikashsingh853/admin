import { DataTable } from "./data-table";

type Item = {
    id: number;
    name: string;
    price?: number;
    package?: string;
    gg?: string
    ss?: string
    adjfkskefk?:string
};

const data: Item[] = [
    { id: 1, name: "Saloon", price: 200, package: "AAA", gg: 'sdfsd', ss: 'sdfsdf', adjfkskefk:'sdkfhsk' },
    { id: 2, name: "Carpainter", price: 30 },
    { id: 3, name: "Garage", package: "BBB" },
];

export default function HomePage() {
    return (
        <DataTable
            // apiEndpoint="https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
            data={data}
            actions={(row) => [
                { label: "Edit", onClick: () => alert(`Editing ${row.name}`) },
                { label: "Delete", onClick: () => alert(`Deleting ${row.name}`) },
            ]}
            mandatoryKeys={['name']}
            shownKeys={['ss','gg']}
            filterKeys={['name']}
        />
    );
}
