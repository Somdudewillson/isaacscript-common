// By default, callbacks fire in the following order:
// PostNewRoom --> PostNewLevel --> PostGameStarted
// It is easier to write mod code if the callbacks run in a more logical order:
// PostGameStarted --> PostNewLevel --> PostNewRoom
// Manually reorganize the callback execution so that this is the case

import * as postGameStartedReordered from "./subscriptions/postGameStartedReordered";
import * as postNewLevelReordered from "./subscriptions/postNewLevelReordered";
import * as postNewRoomReordered from "./subscriptions/postNewRoomReordered";

let currentStage = -1;
let currentStageType = -1;
let forceNewLevel = false;
let forceNewRoom = false;

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStartedVanilla); // 15
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevelVanilla); // 18
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoomVanilla); // 19
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStartedVanilla(isContinued: boolean) {
  if (!hasSubscriptions()) {
    return;
  }

  postGameStartedReordered.fire(isContinued);
  recordCurrentStage();
  postNewLevelReordered.fire();
  postNewRoomReordered.fire();
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevelVanilla() {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount === 0 && !forceNewLevel) {
    // Wait for the PostGameStarted callback to fire
    return;
  }
  forceNewLevel = false;

  recordCurrentStage();
  postNewLevelReordered.fire();
  postNewRoomReordered.fire();
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoomVanilla() {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  if (
    (gameFrameCount === 0 ||
      currentStage !== stage ||
      currentStageType !== stageType) &&
    !forceNewRoom
  ) {
    return;
  }
  forceNewRoom = false;

  postNewRoomReordered.fire();
}

function hasSubscriptions() {
  return (
    postGameStartedReordered.hasSubscriptions() ||
    postNewLevelReordered.hasSubscriptions() ||
    postNewRoomReordered.hasSubscriptions()
  );
}

function recordCurrentStage() {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  currentStage = stage;
  currentStageType = stageType;
}

/**
 * If some specific cases, mods can change the current level during run initialization on the 0th
 * frame. However, due to how the callback reordering works, the custom PostNewLevel callback will
 * never fire on the 0th frame. To get around this, call this function before changing levels to
 * temporarily force the callback to fire.
 *
 * @category Custom Callbacks
 */
export function forceNewLevelCallback(): void {
  forceNewLevel = true;
}

/**
 * If some specific cases, mods can change the current room during run initialization on the 0th
 * frame. However, due to how the callback reordering works, the custom PostNewRoom callback will
 * never fire on the 0th frame. To get around this, call this function before changing rooms to
 * temporarily force the callback to fire.
 *
 * @category Custom Callbacks
 */
export function forceNewRoomCallback(): void {
  forceNewRoom = true;
}
