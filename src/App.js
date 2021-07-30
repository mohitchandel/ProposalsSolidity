import { useState } from 'react';
import './App.css';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import GovtProposal from "./artifacts/GovtProposal.json";
import { Col, Container, Dropdown, Form, Row, Table, FloatingLabel } from 'react-bootstrap';

function App() {

  const [voter, setVoter] = useState();
  const [prname, setPrname] = useState();

  async function setGovtProposal(){
    const web3 = new Web3(Web3.givenProvider)
    const contractId = await web3.eth.net.getId()
    const contractNetwork = GovtProposal.networks[contractId]
    const contract = new web3.eth.Contract(GovtProposal.abi, contractNetwork.address);
    const address = await web3.eth.getAccounts()
    setVoter(address[0]);
    // await contract.methods.submiProposal(prname).send({from : address[0]})
    // const result = await contract.methods.proposals(2).call()
    // console.log(result)
  }


  return (
    <div className="App">
      <Container>
        <div className="mt-3 text-center">
          <h2>Govt. Proposals</h2>
        </div>
        <Row className="d-flex justify-content-center mt-5">
          <Col md={6} className="text-center">
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>0</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col md={3} className="text-center">
            <h5>Add New Proposal</h5>
              <FloatingLabel
                controlId="floatingInput"
                label="Proposal Name"
                className="mb-3"
                >
                <Form.Control onChange={e => setPrname(e.target.value)} type="text" placeholder="Proposal Name" />
              </FloatingLabel>
              <button onClick={setGovtProposal}>Add Proposal</button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col md={6} className="text-center">
            <h5>Vote For Proposal</h5>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Proposals
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col md={6} className="text-center">
            <p>Your Address</p>
            <h5>{voter}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
