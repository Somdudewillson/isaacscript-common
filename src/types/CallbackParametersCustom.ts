import { PostCursedTeleportCallbackType } from "../callbacks/subscriptions/postCursedTeleport";
import { PostEsauJrCallbackType } from "../callbacks/subscriptions/postEsauJr";
import { PostFirstEsauJrCallbackType } from "../callbacks/subscriptions/postFirstEsauJr";
import { PostFirstFlipCallbackType } from "../callbacks/subscriptions/postFirstFlip";
import { PostFlipCallbackType } from "../callbacks/subscriptions/postFlip";
import { PostGameStartedReorderedCallbackType } from "../callbacks/subscriptions/postGameStartedReordered";
import { PostGridEntityInitCallbackType } from "../callbacks/subscriptions/postGridEntityInit";
import { PostGridEntityRemoveCallbackType } from "../callbacks/subscriptions/postGridEntityRemove";
import { PostGridEntityUpdateCallbackType } from "../callbacks/subscriptions/postGridEntityUpdate";
import { PostItemPickupCallbackType } from "../callbacks/subscriptions/postItemPickup";
import { PostNewLevelReorderedCallbackType } from "../callbacks/subscriptions/postNewLevelReordered";
import { PostNewRoomReorderedCallbackType } from "../callbacks/subscriptions/postNewRoomReordered";
import { PostPlayerChangeTypeCallbackType } from "../callbacks/subscriptions/postPlayerChangeType";
import { PostSacrificeCallbackType } from "../callbacks/subscriptions/postSacrifice";
import { PostTransformationCallbackType } from "../callbacks/subscriptions/postTransformation";
import { PreItemPickupCallbackType } from "../callbacks/subscriptions/preItemPickup";
import ModCallbacksCustom from "./ModCallbacksCustom";

export default interface CallbackParametersCustom {
  [ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED]: [
    callback: PostGameStartedReorderedCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED]: [
    callback: PostNewLevelReorderedCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED]: [
    callback: PostNewRoomReorderedCallbackType,
  ];
  [ModCallbacksCustom.MC_PRE_ITEM_PICKUP]: [
    callback: PreItemPickupCallbackType,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];
  [ModCallbacksCustom.MC_POST_ITEM_PICKUP]: [
    callback: PostItemPickupCallbackType,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];
  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]: [
    callback: PostPlayerChangeTypeCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_FLIP]: [callback: PostFlipCallbackType];
  [ModCallbacksCustom.MC_POST_FIRST_FLIP]: [
    callback: PostFirstFlipCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_ESAU_JR]: [callback: PostEsauJrCallbackType];
  [ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]: [
    callback: PostFirstEsauJrCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_TRANSFORMATION]: [
    callback: PostTransformationCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_SACRIFICE]: [callback: PostSacrificeCallbackType];
  [ModCallbacksCustom.MC_POST_CURSED_TELEPORT]: [
    callback: PostCursedTeleportCallbackType,
  ];
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT]: [
    callback: PostGridEntityInitCallbackType,
    gridEntityType?: GridEntityType,
  ];
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE]: [
    callback: PostGridEntityUpdateCallbackType,
    gridEntityType?: GridEntityType,
  ];
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE]: [
    callback: PostGridEntityRemoveCallbackType,
    gridEntityType?: GridEntityType,
  ];
}

// Make copies of the objects we need to verify so that we can easily re-use the code block below
type EnumToCheck = ModCallbacksCustom;
type InterfaceToCheck = CallbackParametersCustom;

// Throw a compiler error if InterfaceToCheck does not match the values of EnumToCheck
// From: https://stackoverflow.com/questions/51829842
type KeysMissing = Exclude<EnumToCheck, keyof InterfaceToCheck>;
type ExtraKeys = {
  [K in keyof InterfaceToCheck]: Extract<EnumToCheck, K> extends never
    ? K
    : never;
}[keyof InterfaceToCheck];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Verify<
  _Missing extends never = KeysMissing, // eslint-disable-line
  _Extra extends never = ExtraKeys, // eslint-disable-line
> = 0;
