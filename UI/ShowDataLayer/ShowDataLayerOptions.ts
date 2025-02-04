import FeatureSource from "../../Logic/FeatureSource/FeatureSource";
import {Store, UIEventSource} from "../../Logic/UIEventSource";
import {ElementStorage} from "../../Logic/ElementStorage";
import LayerConfig from "../../Models/ThemeConfig/LayerConfig";
import ScrollableFullScreen from "../Base/ScrollableFullScreen";

export interface ShowDataLayerOptions {
    features: FeatureSource,
    selectedElement?: UIEventSource<any>,
    leafletMap: Store<L.Map>,
    popup?: undefined | ((tags: UIEventSource<any>, layer: LayerConfig) => ScrollableFullScreen),
    zoomToFeatures?: false | boolean,
    doShowLayer?: Store<boolean>,
    state?: { allElements?: ElementStorage }
}