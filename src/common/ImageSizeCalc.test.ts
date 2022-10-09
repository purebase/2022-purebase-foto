import {Dimension, fitCastToStage} from "./ImageSizeCalc";
import assert from "assert";
import * as _ from "lodash";

test('landscape image', () => {
    const result = fitCastToStage(
    {width: 4000, height: 3000},
    {width: 1200, height: 800});

    console.log("result", result);
    assert(
        _.isEqual(result,{ width: 1067, height: 800 })
    );
});

test('portrait image', () => {
    const result = fitCastToStage(
        {width: 3000, height: 4000},
        {width: 1200, height: 800});

    console.log("result", result);
    assert(
        _.isEqual(result,{ width: 600, height: 800 })
    );
});