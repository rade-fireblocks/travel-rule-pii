import PIIsdk, {
    AgentType,
    initAgent,
    PIIEncryptionMethod,
} from "@notabene/pii-sdk";

import * as util from "util";
import {TravelRule, TravelRuleOptions} from "./types/type";

const requiredFields = [
    "kmsSecretKey",
    "baseURLPII",
    "audiencePII",
    "clientId",
    "clientSecret",
    "authURL",
    "jsonDidKey",
];

export class PIIEncryption {
    public toolset: PIIsdk;

    constructor(private readonly config: TravelRuleOptions) {
        this.config = config;
        const missingFields = requiredFields.filter(
            (field) => !(field in this.config)
        );

        if (missingFields.length > 0) {
            throw new Error(
                `Missing PII configuration fields: ${missingFields.join(", ")}`
            );
        }

        this.toolset = new PIIsdk({
            kmsSecretKey: config.kmsSecretKey,
            piiURL: config.baseURLPII,
            audience: config.audiencePII,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            authURL: config.authURL,
        });
    }

    async hybridEncode(travelRuleMessage: TravelRule) {
        const pii = travelRuleMessage.pii || {
            originator: travelRuleMessage.originator,
            beneficiary: travelRuleMessage.beneficiary,
        };
        const { beneficiaryDidKey, jsonDidKey, kmsSecretKey } = this.config;
        const counterpartyDIDKey = beneficiaryDidKey || undefined;

        let piiIvms;
        let agent;

        try {
            agent = initAgent({ KMS_SECRET_KEY: kmsSecretKey }).agent as AgentType;
            await agent.didManagerImport(JSON.parse(jsonDidKey));
            piiIvms = await this.toolset.generatePIIField({
                pii,
                originatorVASPdid: travelRuleMessage.originatorVASPdid,
                beneficiaryVASPdid: travelRuleMessage.beneficiaryVASPdid,
                counterpartyDIDKey,
                agent,
                senderDIDKey: JSON.parse(jsonDidKey).did,
                encryptionMethod: PIIEncryptionMethod.HYBRID,
            });
        } catch (error) {
            const errorMessage = error.message || error.toString();
            const errorDetails = JSON.stringify(error);
            throw new Error(`Failed to generate PII fields error: ${errorMessage}. Details: ${errorDetails}`);
        }

        return travelRuleMessage
    }
}