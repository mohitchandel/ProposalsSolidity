import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import GovtProposal from "./artifacts/GovtProposal.json";
import { Col, Container, Dropdown, Form, Row, Table, FloatingLabel, Button} from 'react-bootstrap';

function App() {
  useEffect (() => {
    for(var i = 0; i < 2; i++){
      (async () => {
        getGovtProposal();
      })()
    }
    console.log(proarr)
  }, []);

  const [voter, setVoter] = useState();
  const [prname, setPrname] = useState();
  const [procount, setProcount] = useState();
  const [proarr, setProarr] = useState([]);
  // const [promap, setPromap] = useState();
  
  
  const getGovtProposal = async() => {
    const web3 = new Web3(Web3.givenProvider)
    const contractId = await web3.eth.net.getId()
    const contractNetwork = GovtProposal.networks[contractId]
    const contract = new web3.eth.Contract(GovtProposal.abi, contractNetwork.address);
    const address = await web3.eth.getAccounts()
    setVoter(address[0]);
    const propcount = await contract.methods.getproposalsCount().call()
    setProcount(propcount)
    
    var arr = [];
    for(var i = 1; i <= propcount; i++){
        await contract.methods.proposals(i).call(function(err,res){
        arr.push({ res })
          proarr.push(res);
          setProarr(arr);
      })
    }
  }

  const delGovtProposal = async(id) => {
    const web3 = new Web3(Web3.givenProvider)
    const contractId = await web3.eth.net.getId()
    const contractNetwork = GovtProposal.networks[contractId]
    const contract = new web3.eth.Contract(GovtProposal.abi, contractNetwork.address);
    const address = await web3.eth.getAccounts()
    setVoter(address[0]);
    await contract.methods.deleteProposal(id).send({from : address[0]})
    const propcount = await contract.methods.getproposalsCount().call()
    setProcount(propcount)
    for(var i = 0; i < 2; i++){
      (async () => {
        getGovtProposal();
      })()
    }
  }
  
  
  
  const setGovtProposal = async() => {
    const web3 = new Web3(Web3.givenProvider)
    const contractId = await web3.eth.net.getId()
    const contractNetwork = GovtProposal.networks[contractId]
    const contract = new web3.eth.Contract(GovtProposal.abi, contractNetwork.address);
    const address = await web3.eth.getAccounts()
    setVoter(address[0]);
    await contract.methods.submiProposal(prname).send({from : address[0]})
    const propcount = await contract.methods.getproposalsCount().call()
    setProcount(propcount)
    for(var i = 0; i < 2; i++){
      (async () => {
        getGovtProposal();
      })()
    }
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
              <thead id="propcont">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {proarr.map((proarr, index) => (
                  <tr key={index + 1}>
                    <th >{proarr.res.id}</th>
                    <th >{proarr.res.name}</th>
                    <th >{proarr.res.votes}</th>
                    <th ><Button onClick={() => delGovtProposal(proarr.res.id)}>Del</Button></th>
                  </tr>
                ))}
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
              <Button onClick={setGovtProposal}>Add Proposal</Button>
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
