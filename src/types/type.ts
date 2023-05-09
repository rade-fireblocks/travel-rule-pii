export interface TravelRule {
    originatorVASPdid: string;
    beneficiaryVASPdid: string;
    originator?: TROriginator;
    beneficiary?: TROriginator;
    pii?: PII;
    jsonDidKey?: string;
}


interface PII {
    originator?: TROriginator;
    beneficiary?: TROriginator;
}

interface TROriginator {
    originatorPersons?: TROriginatorPerson[];
    beneficiaryPersons?: TROriginatorPerson[];
    accountNumber?: string[];
}

interface TROriginatorPersons extends Array<TROriginatorPerson> {}

interface TROriginatorPerson {
    naturalPerson?: TRNaturalPerson;
    legalPerson?: TRNaturalPerson;
}

interface TRNaturalPerson {
    name?: TRName;
    geographicAddress?: TRGeographicAddress;
    nationalIdentification?: TRNationalIdentification;
    dateAndPlaceOfBirth?: TRDateAndPlaceOfBirth;
}

interface TRName extends Array<TRPersonNameIdentifier> {}

interface TRPersonNameIdentifier {
    nameIdentifier?: TRNameIdentifier;
}

interface TRNameIdentifier {
    primaryIdentifier?: string;
    secondaryIdentifier?: string;
    nameIdentifierType?: string;
}

interface TRGeographicAddress extends Array<TRGeographicAddressData> {}

interface TRGeographicAddressData {
    streetName?: string;
    townName?: string;
    country?: string;
    buildingNumber?: string;
    postCode?: string;
    addressType?: string;
    department?: string;
    subDepartment?: string;
    buildingName?: string;
    floor?: string;
    postBox?: string;
    room?: string;
    townLocationName?: string;
    districtName?: string;
    countrySubDivision?: string;
    addressLine?: string;
}

interface TRNationalIdentification {
    countryOfIssue?: string;
    nationalIdentifier?: string;
    nationalIdentifierType?: string;
}

interface TRDateAndPlaceOfBirth {
    dateOfBirth?: string;
    placeOfBirth?: string;
}

export interface TravelRuleOptions {
    clientId: string;
    clientSecret: string;
    authURL?: string;
    audience?: string;
    audiencePII?: string;

    baseURL?: string;
    baseURLPII?: string;

    kmsSecretKey?: string;
    jsonDidKey?: string;
    beneficiaryDidKey?: string;
    travelRuleMessage?: TravelRule;
}