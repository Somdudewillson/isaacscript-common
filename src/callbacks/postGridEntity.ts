import { saveDataManager } from "../features/saveDataManager";
import { getGridEntities } from "../functions/gridEntity";
import * as postGridEntityInit from "./subscriptions/postGridEntityInit";
import * as postGridEntityUpdate from "./subscriptions/postGridEntityUpdate";

const v = {
  room: {
    initializedGridEntities: new LuaTable<int, GridEntityType>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("itemPickupCallback", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 9
}

function hasSubscriptions() {
  return (
    postGridEntityInit.hasSubscriptions() ||
    postGridEntityUpdate.hasSubscriptions()
  );
}

// ModCallbacks.MC_POST_NEW_ROOM (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const gridEntity of getGridEntities()) {
    checkNewGridEntity(gridEntity);
    postGridEntityUpdate.fire(gridEntity);
  }
}

// ModCallbacks.MC_POST_NEW_ROOM (9)
function postNewRoom() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const gridEntity of getGridEntities()) {
    checkNewGridEntity(gridEntity);
  }
}

function checkNewGridEntity(gridEntity: GridEntity) {
  const gridIndex = gridEntity.GetGridIndex();
  const gridEntityType = gridEntity.GetType();
  const storedGridEntityType = v.room.initializedGridEntities.get(gridIndex);
  if (storedGridEntityType !== gridEntityType) {
    v.room.initializedGridEntities.set(gridIndex, storedGridEntityType);
    postGridEntityInit.fire(gridEntity);
  }
}