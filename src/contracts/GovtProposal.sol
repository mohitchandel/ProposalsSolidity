// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract GovtProposal {

    mapping(address => bool ) voter;
    
    uint private votes;
     
    struct Proposals{
        uint id;
        string name;
        uint votes;
    }
    mapping (uint => Proposals) public proposals;
    
    uint public proposalsCount;
    
    function getproposalsCount() public view returns(uint){
        return proposalsCount;
    }
    
    function submiProposal(string memory _name) public{
        addProposal(_name);
    }
    
    function addProposal(string memory _name) private{
        proposalsCount ++;
        proposals[proposalsCount] = Proposals(proposalsCount,_name, 0);
    }
    
    function voteProposal(uint _proposalId) public{
        require(!voter[msg.sender]);
        require(_proposalId > 0 && _proposalId <= proposalsCount);

        voter[msg.sender] = true;
        proposals[_proposalId].votes ++;
    }

}
