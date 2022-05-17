import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Item = styled.ul`
  padding: 0px;
  list-style: none;
  width: fit-content;
`;
const ItemList = styled.li`
  padding: 0px;
  border: 1px solid black;
  font-size: 28px;
  letter-spacing: 2px;
`;
const Button = styled.button`
  width: inherit;
  border: none;
`;
const Tree = ({ data }) => {
  const [displayItem, setDisplayItem] = useState({});
  return (
    <Container>
      <Item>
        {data.map((item) => (
          <ItemList key={item.title}>
            {item.title}
            {item.items.length !== 0 && (
              <Button
                onClick={() =>
                  setDisplayItem({
                    ...displayItem,
                    [item.title]: !displayItem[item.title],
                  })
                }
              >
                {displayItem[item.title] ? "-" : "+"}
              </Button>
            )}

            {displayItem[item.title] && item.items && (
              <Tree data={item.items} />
            )}
          </ItemList>
        ))}
      </Item>
    </Container>
  );
};

export default Tree;
