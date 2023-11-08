import { DartComponentSource } from '@/components/sample/components/common/component-source';
import { DartTreeModel } from '@/types/sample';
import React, { ReactNode } from 'react';
// import { useStoreSelectors } from '@/store';

function renderComponent(
  node: DartTreeModel['node'],
  props: DartTreeModel['props'],
  children: DartTreeModel['children'],
): ReactNode {
  if (!children || children.length === 0) {
    return React.createElement(DartComponentSource[node], props); // 这里可以放内容
  }

  const childComponents =
    typeof children === 'string'
      ? [children]
      : children.map((child) => {
          return renderComponent(child.node, child.props, child.children);
        });

  return React.createElement(
    DartComponentSource[node],
    props,
    ...childComponents,
  );
}
export default function DartComponent() {
  // const tree = useStoreSelectors.use.dartTree();
  // console.log(dartComponentSource[tree.node]);
  const tree: DartTreeModel = {
    node: 'Box',
    props: { rootClassName: 'box' },
    children: [
      {
        node: 'Flex',
        props: { rootClassName: 'aaa' },
        children: '123',
      },
    ],
  };

  return <>{renderComponent(tree.node, tree.props, tree.children)}</>;
}
