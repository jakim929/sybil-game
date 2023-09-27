// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { FieldLayout, FieldLayoutLib } from "@latticexyz/store/src/FieldLayout.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { RESOURCE_TABLE, RESOURCE_OFFCHAIN_TABLE } from "@latticexyz/store/src/storeResourceTypes.sol";

ResourceId constant _tableId = ResourceId.wrap(
  bytes32(abi.encodePacked(RESOURCE_TABLE, bytes14(""), bytes16("Players")))
);
ResourceId constant PlayersTableId = _tableId;

FieldLayout constant _fieldLayout = FieldLayout.wrap(
  0x0001010001000000000000000000000000000000000000000000000000000000
);

library Players {
  /** Get the table values' field layout */
  function getFieldLayout() internal pure returns (FieldLayout) {
    return _fieldLayout;
  }

  /** Get the table's key schema */
  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _keySchema = new SchemaType[](2);
    _keySchema[0] = SchemaType.UINT32;
    _keySchema[1] = SchemaType.ADDRESS;

    return SchemaLib.encode(_keySchema);
  }

  /** Get the table's value schema */
  function getValueSchema() internal pure returns (Schema) {
    SchemaType[] memory _valueSchema = new SchemaType[](1);
    _valueSchema[0] = SchemaType.BOOL;

    return SchemaLib.encode(_valueSchema);
  }

  /** Get the table's key names */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](2);
    keyNames[0] = "roundIndex";
    keyNames[1] = "player";
  }

  /** Get the table's field names */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](1);
    fieldNames[0] = "isRegistered";
  }

  /** Register the table with its config */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /** Register the table with its config */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /** Register the table with its config (using the specified store) */
  function register(IStore _store) internal {
    _store.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /** Get isRegistered */
  function getIsRegistered(uint32 roundIndex, address player) internal view returns (bool isRegistered) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /** Get isRegistered */
  function _getIsRegistered(uint32 roundIndex, address player) internal view returns (bool isRegistered) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /** Get isRegistered (using the specified store) */
  function getIsRegistered(IStore _store, uint32 roundIndex, address player) internal view returns (bool isRegistered) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    bytes32 _blob = _store.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /** Get isRegistered */
  function get(uint32 roundIndex, address player) internal view returns (bool isRegistered) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /** Get isRegistered */
  function _get(uint32 roundIndex, address player) internal view returns (bool isRegistered) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /** Get isRegistered (using the specified store) */
  function get(IStore _store, uint32 roundIndex, address player) internal view returns (bool isRegistered) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    bytes32 _blob = _store.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /** Set isRegistered */
  function setIsRegistered(uint32 roundIndex, address player, bool isRegistered) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((isRegistered)), _fieldLayout);
  }

  /** Set isRegistered */
  function _setIsRegistered(uint32 roundIndex, address player, bool isRegistered) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((isRegistered)), _fieldLayout);
  }

  /** Set isRegistered (using the specified store) */
  function setIsRegistered(IStore _store, uint32 roundIndex, address player, bool isRegistered) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    _store.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((isRegistered)), _fieldLayout);
  }

  /** Set isRegistered */
  function set(uint32 roundIndex, address player, bool isRegistered) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((isRegistered)), _fieldLayout);
  }

  /** Set isRegistered */
  function _set(uint32 roundIndex, address player, bool isRegistered) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((isRegistered)), _fieldLayout);
  }

  /** Set isRegistered (using the specified store) */
  function set(IStore _store, uint32 roundIndex, address player, bool isRegistered) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    _store.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((isRegistered)), _fieldLayout);
  }

  /** Delete all data for given keys */
  function deleteRecord(uint32 roundIndex, address player) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /** Delete all data for given keys */
  function _deleteRecord(uint32 roundIndex, address player) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /** Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, uint32 roundIndex, address player) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    _store.deleteRecord(_tableId, _keyTuple);
  }

  /** Tightly pack static data using this table's schema */
  function encodeStatic(bool isRegistered) internal pure returns (bytes memory) {
    return abi.encodePacked(isRegistered);
  }

  /** Tightly pack full data using this table's field layout */
  function encode(bool isRegistered) internal pure returns (bytes memory, PackedCounter, bytes memory) {
    bytes memory _staticData = encodeStatic(isRegistered);

    PackedCounter _encodedLengths;
    bytes memory _dynamicData;

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /** Encode keys as a bytes32 array using this table's field layout */
  function encodeKeyTuple(uint32 roundIndex, address player) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(roundIndex));
    _keyTuple[1] = bytes32(uint256(uint160(player)));

    return _keyTuple;
  }
}

function _toBool(uint8 value) pure returns (bool result) {
  assembly {
    result := value
  }
}