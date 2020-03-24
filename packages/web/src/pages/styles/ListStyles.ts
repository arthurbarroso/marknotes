import styled from 'styled-components';
import { darken } from 'polished';
import { Animated } from 'react-animated-css';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 8%;

  .backbutton {
    width: 120%;
    border-radius: 2%;
    background: #f5f5f5;
    border: 0;
    height: 40px;

    &:hover {
      background: ${darken(0.09, '#f5f5f5')};
    }
  }
`;

export const Wrapper = styled(Animated)`
  margin-top: 20%;
  max-width: 357px;

  input {
    width: 100%;
    height: 36px;
    padding: 0 5%;
    ::placeholder {
      color: #333;
    }
  }

  button {
    margin-top: 2%;
    width: 100%;
    border-radius: 2%;
    background: #f5f5f5;
    border: 0;
    height: 40px;

    &:hover {
      background: ${darken(0.09, '#f5f5f5')};
    }

    h1 {
      font-size: 18px;
    }
  }

  .loadbutton {
    height: 46px;
  }
`;

export const Content = styled.div`
  background: #f5f5f5;
  width: 100%;
  max-width: 420px;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  border-radius: 2%;
  margin-bottom: 4%;

  h2 {
    font-weight: normal;
    margin-bottom: 4%;
  }
`;

export const EditorWrapper = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 2% 5%;

  input {
    width: 100%;
    margin-bottom: 4%;
    border-radius: 2%;
  }

  button {
    width: 100%;
    margin-top: 5%;
    border-radius: 2%;
  }

  .wrapper {
    max-width: 420px;
  }
`;
