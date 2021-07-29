// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract GovtProposal {

    struct Proposal {
        string name;
        uint votes;
    }
    Proposal private proposal;

    function makeProposal(string memory _name) private{
        proposal = Proposal(_name, 0);
    }

    function voteProposal() private{
    }

    function getProposal() private{

    }
}
