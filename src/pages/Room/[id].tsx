import RoomComponent from '@/components/room';
import { getPathId } from '@/util/object';
import { useLocation } from 'react-router-dom';

function Room() {
  const location = useLocation();
  const pathname = location.pathname;

  return <RoomComponent id={getPathId(pathname)} />;
}

export default Room;
