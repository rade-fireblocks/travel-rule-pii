import PIIsdk from "@notabene/pii-sdk";
import { TravelRule, TravelRuleOptions } from "./types/type";
export declare class PIIEncryption {
    private readonly config;
    toolset: PIIsdk;
    constructor(config: TravelRuleOptions);
    hybridEncode(travelRuleMessage: TravelRule): Promise<TravelRule>;
}
