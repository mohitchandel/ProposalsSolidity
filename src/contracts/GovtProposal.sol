// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract GovtProposal {

    // Proposal struct
    struct Proposals {
        string name;
        uint votes;
    }
    Proposals private proposals;

    // Voters struct
    struct Voters {
        string name;
        address id;
        bool voted;
    }
    voters private Voters;

    // Making Proposal
    function makeProposal(string memory _name) private{
        proposals = Proposals(_name, 0);
    }

    // Voting for proposal
    function voteProposal() private{
    }

    // Getting Proposal
    function getProposal() private{
    }
}
