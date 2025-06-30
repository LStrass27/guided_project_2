import Navigator from "./Navigator";
import Sock from "./Sock";

const Character = (props) => {
    const characterId = props.id
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_CHARACTERS_URL + String(characterId));
            if (!response.ok) {
            throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [characterId]);

    return (
        <div>
            <head>
                <title>A Star Wars Character</title>
            </head>

            <body>
                <main>
                    <h1 {data[0].name}></h1>
                    <section id="generalInfo">
                    <p>Height: {data[0].height} cm</p>
                    <p>Mass: {data[0].mass} kg</p>
                    <p>Born: {data[0].birth_year} </p>
                    </section>

                </main>
            </body>
        </div>
    );
};

export default Character;