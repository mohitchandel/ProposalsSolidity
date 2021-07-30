const GovtProposal = artifacts.require("GovtProposal");

module.exports = function (deployer) {
  deployer.deploy(GovtProposal);
};
