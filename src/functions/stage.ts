export function onRepentanceStage(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stageType = level.GetStageType();

  return (
    stageType === StageType.STAGETYPE_REPENTANCE ||
    stageType === StageType.STAGETYPE_REPENTANCE_B
  );
}

export function onCathedral(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 10 && stageType === 1;
}

export function onChest(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 11 && stageType === 1;
}

export function onDarkRoom(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 11 && stageType === 0;
}

export function onSheol(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 10 && stageType === 0;
}
