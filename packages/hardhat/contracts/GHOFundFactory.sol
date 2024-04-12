//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GhoFundStreams.sol";

contract GhoFundFactory {
	GhoFundStreams[] public ghoFundStreams;

	uint256 public count;

	event GhoFundStreamCreated(
		GhoFundStreams indexed ghoFundStream,
		address indexed owner,
		address aavePoolAddress,
		address GHOAddress,
		address wethGatewayAddress
	);

	function createGHOFundStream(
		address _owner,
		address _aavePoolAddress,
		address _GHOAddress,
		address _wethGatewayAddress
	) public {
		GhoFundStreams ghoFundStream = new GhoFundStreams(
			_owner,
			_aavePoolAddress,
			_GHOAddress,
			_wethGatewayAddress
		);
		ghoFundStreams.push(ghoFundStream);
		count++;
		emit GhoFundStreamCreated(
			ghoFundStream,
			_owner,
			_aavePoolAddress,
			_GHOAddress,
			_wethGatewayAddress
		);
	}
}
