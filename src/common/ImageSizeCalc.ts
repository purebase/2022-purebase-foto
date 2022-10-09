export type Dimension = {width: number, height: number};

export const fitCastToStage = (cast: Dimension, stage: Dimension): Dimension  => {

    // 1. Calculate ratio of window:
    const stageRatio = stage.width / stage.height;
    console.log("winRatio: ", stageRatio, stage.width, stage.height);

    // 2. Calculate ratio of src:
    const castRatio = cast.width / cast.height;
    console.log("castRatio: ", castRatio, cast.width, cast.height);

    // 3. Calculate new dimensions:
    if (castRatio > stageRatio) {
        const newWidth = stage.width;
        const scaleF = cast.width / newWidth;
        const newHeight = Math.round(cast.height / scaleF);
        return {
            width: newWidth,
            height: newHeight
        }

    } else if (castRatio <= stageRatio) {
        const newHeight = stage.height;
        const scaleF = cast.height / newHeight;
        const newWidth = Math.round(cast.width / scaleF);
        return {
            width: newWidth,
            height: newHeight
        }
    }

    return {width:-1, height:-1};
}