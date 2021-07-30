import * as itemPickup from "../callbacks/itemPickup";
import * as postItemPickup from "../callbacks/postItemPickup";
import * as preItemPickup from "../callbacks/preItemPickup";
import { ensureAllCases } from "../functions/util";
import * as saveDataManager from "../saveDataManager";
import { ModCallbacksCustom } from "./ModCallbacksCustom";
import PickingUpItem from "./PickingUpItem";

/** `isaacscript-common` allows for custom callbacks, so it provides an upgraded Mod object. */
export default class ModUpgraded extends Mod {
  // eslint-disable-next-line class-methods-use-this
  AddCallbackCustom<T extends keyof CallbackParametersUpgraded>(
    customCallbackIDGeneric: T,
    ...args: CallbackParametersUpgraded[T]
  ): void {
    const customCallbackID = customCallbackIDGeneric as ModCallbacksCustom;
    switch (customCallbackID) {
      case ModCallbacksCustom.MC_PRE_ITEM_PICKUP: {
        preItemPickup.register(args[0], args[1], args[2]);
        break;
      }

      case ModCallbacksCustom.MC_POST_ITEM_PICKUP: {
        postItemPickup.register(args[0], args[1], args[2]);
        break;
      }

      default: {
        ensureAllCases(customCallbackID);
        error(`The custom callback ID of "${customCallbackID}" is not valid.`);
        break;
      }
    }
  }

  constructor(mod: Mod) {
    super();

    this.copyAllModAttributes(mod);
    saveDataManager.init(this);
    this.initCustomCallbacks();
  }

  copyAllModAttributes(mod: Mod): void {
    this.AddCallback = mod.AddCallback; // eslint-disable-line @typescript-eslint/unbound-method
    this.HasData = mod.HasData; // eslint-disable-line @typescript-eslint/unbound-method
    this.LoadData = mod.LoadData; // eslint-disable-line @typescript-eslint/unbound-method
    this.RemoveCallback = mod.RemoveCallback; // eslint-disable-line @typescript-eslint/unbound-method
    this.RemoveData = mod.RemoveData; // eslint-disable-line @typescript-eslint/unbound-method
    this.SaveData = mod.SaveData; // eslint-disable-line @typescript-eslint/unbound-method
    this.Name = mod.Name;
  }

  initCustomCallbacks(): void {
    itemPickup.init(this);
  }
}

/**
 * This is the format for the custom callbacks, along with optional arguments, if any.
 *
 * @category Custom Callbacks
 */
interface CallbackParametersUpgraded {
  [ModCallbacksCustom.MC_PRE_ITEM_PICKUP]: [
    callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];
  [ModCallbacksCustom.MC_POST_ITEM_PICKUP]: [
    callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];
}