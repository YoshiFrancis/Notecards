import { useParams } from "react-router-dom"
import DeckList from "./DeckList"

const DeckListWrapper = () => {
  const {username} = useParams();
  return <DeckList username={username} />
}

export default DeckListWrapper;