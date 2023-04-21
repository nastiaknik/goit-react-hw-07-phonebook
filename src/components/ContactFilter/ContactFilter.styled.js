import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const FilterInput = styled.input`
  padding: 8px;
  background: transparent;
  border: 2px solid #e5e0ff;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 16px;
  &:focus {
    outline: 1px solid #8ea7e9;
  }
`;
