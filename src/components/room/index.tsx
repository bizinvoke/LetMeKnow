import { useGlobal } from '@/global/provider';
import reactLogo from '/src/assets/react.svg';
import viteLogo from '/vite.svg';

type Props = {
  id: string;
};

export default function RoomComponent({ id }: Props) {
  const { globalState } = useGlobal();
  return (
    <div className="flex">
      {globalState.count}
      <div className="flex">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  );
}
