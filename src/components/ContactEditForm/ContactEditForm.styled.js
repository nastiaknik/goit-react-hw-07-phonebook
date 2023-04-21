import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';

export const EditIcon = styled(MdEdit)`
  font-size: 20px;
  color: #28c38a;
  opacity: 0.8;
`;

export const EditBtn = styled.button`
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: 32px;
  width: 32px;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: transparent;

  :hover,
  :focus {
    > ${EditIcon} {
      opacity: 1;
    }
  }
`;
