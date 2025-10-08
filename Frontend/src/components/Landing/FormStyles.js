import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #171717;

  .card {
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    border-radius: 22px;
    transition: all .3s;
    padding: 10px;
  }

  .card2 {
    background-color: #171717;
    border-radius: 20px;
    padding: 2em;
    transition: all .2s;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  #heading {
    text-align: center;
    margin-bottom: 1em;
    color: rgb(0, 255, 200);
    font-size: 1.5em;
  }

  .message, .signin {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  }

  .signin a {
    color: rgb(0, 255, 200);
    text-decoration: none;
  }

  .signin a:hover {
    text-decoration: underline;
  }

  .flex {
    display: flex;
    gap: 10px;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    background-color: #1e1e1e;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .input-icon {
    font-size: 1.2em;
    color: rgb(0, 255, 200);
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: rgb(0, 255, 200);
    font-size: 1em;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }

  .button1 {
    padding: 0.7em 2em;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1em;
    cursor: pointer;
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    color: black;
    transition: 0.3s;
  }

  .button1:hover {
    background-image: linear-gradient(163deg, #00642f 0%, #13034b 100%);
    color: rgb(0, 255, 200);
  }
  .button3 {
    padding: 0.7em 2em;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1em;
    cursor: pointer;
    background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
    color: black;
    transition: 0.3s;
  }

  .button3:hover {
    background-image: linear-gradient(163deg, #00642f 0%, #13034b 100%);
    color: rgb(0, 255, 200);
  }
  .user-type-toggle label {
  color: rgb(0, 255, 200); 
  font-weight: bold; 
  margin-right: 15px;
  cursor: pointer;
}
  .user-type-toggle input {
  margin-right: 5px; /* Space between radio button and label */
}
`;

export default StyledWrapper;
