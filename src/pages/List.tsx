import { FixedSizeList as List } from 'react-window';

export default function VirtualList() {
  const Row = ({ index, style }) => (
    <div style={style} className="flex">
      Row {index}
    </div>
  );

  const Example = () => (
    <List
      height={window.innerHeight}
      itemCount={1000}
      itemSize={window.innerHeight}
      width={window.innerWidth}
      style={{ background: '#fff', padding: 0 }}
    >
      {Row}
    </List>
  );
  return Example();
}
