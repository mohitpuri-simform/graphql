import { useState } from "react";
import "./App.css";
import useGetCharacterDetails from "./hooks/useGetCharacterDetails";
import useGetCharacterList from "./hooks/useGetCharacterList";
import CustomSearch from "./components/CustomSearch";
import CreatePost from "./components/CreatePost";
import DragAndDrop from "./components/DragAndDrop";

function App() {
  const { data } = useGetCharacterList();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const { data: characterDetailData } =
    useGetCharacterDetails(selectedCharacterId);
  return (
    <>
      <div>
        <CustomSearch />
        {data && (
          <div>
            {data.characters.results.map((characterItem) => (
              <button
                onClick={() =>
                  setSelectedCharacterId(parseInt(characterItem.id))
                }
                style={{
                  marginBottom: "20px",
                  backgroundColor: "lightblue",
                }}
                key={characterItem.id}
              >
                <p>{characterItem.name}</p>
                <p>{characterItem.species}</p>
                {characterDetailData &&
                  selectedCharacterId === parseInt(characterItem.id) && (
                    <img
                      src={`${characterDetailData.character.image}`}
                      alt={characterDetailData.character.name}
                    />
                  )}
              </button>
            ))}
          </div>
        )}
      </div>
      <CreatePost />
      <DragAndDrop />
    </>
  );
}

export default App;
