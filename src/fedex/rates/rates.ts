import { token } from "../auth/auth";
import { TaskFunction } from "../fedex";
import { CurrencyCode } from "../resources/currencyCodes/currencyCodes";
import { LocaleCodes } from "../resources/locales";
import { UsShippingMethods } from "../resources/serviceLists/usServiceList";
import { SpecialServicesTypes } from "../resources/specialServices/specialServicesTypes";
import { SubPackageTypes } from "../resources/subPackageTypes/subPackageTypes";
import { PackageTypeUnion } from "../resources/packageTypes/packageTypes";
import { RecommendedDocumentSpecificationTypes } from "../resources/recommendedDocumentSpecification/recommendedDocumentSpecification";
import { ShipmentLevelSpecialServicesTypes } from "../resources/shipmentLevelSpecialServices/ShipmentLevelSpecialServicesTypes";
import { CountryCode } from "../resources/countryCodes/countryCodes";

export class Rates {
  private servers = {
    sandbox: "https://apis-sandbox.fedex.com",
    production: "https://apis.fedex.com",
  };
  private paths = {
    rates: "/rate/v1/rates/quotes",
  };
  private xLocale: LocaleCodes | undefined;
  private env: "sandBox" | "production";
  private token: token;
  public asyncQueue: TaskFunction[];

  constructor({
    env,
    asyncQueue,
    token,
  }: {
    env: "sandBox" | "production";
    asyncQueue: TaskFunction[];
    token: token;
  }) {
    this.env = env;
    this.asyncQueue = asyncQueue;
    this.token = token;
  }

  generateTestRequest = () => {
    let body: RateRequestBody = {
      accountNumber: {
        value: '23456'
      },
      requestedShipment: {
        shipper: {
          address: {
            city: "meep",
            postalCode: "48060",
            countryCode: "LB",
            residential: undefined,
            stateOrProvidence: undefined,
          },
        },
        recipient: {
          address: {
            stateOrProvidence: undefined,
            residential: undefined,
            countryCode: "AL",
            postalCode: "48060",
            city: "yolo",
          },
        },
        pickupType: "USE_SCHEDULED_PICKUP",
        totalWeight: 2,
        packagingType: "FEDEX_10KG_BOX",
        totalPackageCount: 2,
        requestedPackageLineItems: [
          {
            weight: { units: "LB", value: 2 },
            variableHandlingChargeDetail: undefined,
            dimensions: undefined,
            contentRecord: undefined,
            declaredValue: undefined,
            subPackagingType: undefined,
            groupPackageCount: undefined,
            packageSpecialServices: undefined,
          },
        ],
      
      },
    };
  };
}

export type RateRequestBody = {
  accountNumber: {
    value: string;
  };
  rateRequestControlParameters?: RateRequestControlParameters | undefined;
  requestedShipment: RequestShipment;
  carrierCodes?: string[] | undefined;
};

type RequestShipment = {
  shipper: Shipper;
  recipient: Recipient;
  serviceType?: UsShippingMethods | undefined;
  emailNotificationDetail?: EmailNotificationDetail[] | undefined;
  preferedCurrency?: CurrencyCode | undefined;
  rateRequestType?: RateRequestType[] | undefined;
  shipDateStamp?: string | undefined;
  pickupType: PickupType;
  requestedPackageLineItems: RequestedPackageLineItems[];
  documentShipment?: boolean | undefined;
  variableHandlingChargeDetail?: VariableHandlingChargeDetail | undefined;
  packagingType: PackageTypeUnion;
  totalPackageCount: number;
  totalWeight: number;
  shipmentSpecialServices?: ShipmentSpecialServices | undefined;
  customsClearanceDetail?: CustomsClearanceDetail | undefined;
  groupShipment?: boolean | undefined;
  serviceTypeDetail?: ServiceTypeDetail | undefined;
  smartPostInfoDetail?: SmartPostInfoDetail | undefined;
  expressFreightDetail?: ExpressFreightDetail | undefined;
  groundShipment?: boolean | undefined;
};

type ExpressFreightDetail = {
  bookingConfirmationNumber?: string | undefined;
  shippersLoadAndCount?: number | undefined;
};

type SmartPostInfoDetail = {
  ancillaryEndorsement?:
    | "ADDRESS_CORRECTION"
    | "CARRIER_LEAVE_IF_NO_RESPONSE"
    | "CHANGE_SERVICE"
    | "FORWARDING_SERVICE"
    | "RETURN_SERVICE"
    | undefined;
  hubId?: string | undefined;
  indicia?:
    | "MEDIA_MAIL"
    | "PARCEL_RETURN"
    | "PARCEL_SELECT"
    | "PRESORTED_BOUND_PRINTED_MATTER"
    | "PRESORTED_STANDARD"
    | undefined;
  specialServices?: ShipmentLevelSpecialServicesTypes | undefined;
};

type ServiceTypeDetail = {
  carrierCode?: "FDXE" | "FDXG" | "FXSP" | "FXFR" | "FDXC" | "FXCC" | undefined;
  description?: string | undefined;
  serviceName?: string | undefined;
  serviceCategory?: string | undefined;
};

type CustomsClearanceDetail = {
  brokers?: CCDbrokers[] | undefined;
  commercialInvoice?: CommercialInvoice | undefined;
  freightOnValue?: "CARRIER_RISK" | "OWN_RISK" | undefined;
  dutiesPayment?: DutiesPayment | undefined;
  commodities: CCDcommodities[];
};

type CCDcommodities = {
  description?: string | undefined;
  weight?: CCDCweight | undefined;
  quantity?: number | undefined;
  customsValue?: CCDcustomsValue | undefined;
  unitPrice?: CCDCunitPrice | undefined;
  numberOfPieces?: number | undefined;
  countryOfManufacture?: string | undefined;
  quantityUnits?: string | undefined;
  name?: string | undefined;
  harmonizedCode?: string | undefined;
  partNumber?: string | undefined;
};

type CCDCunitPrice = {
  amount: number;
  currency: CurrencyCode;
};

type CCDcustomsValue = {
  amount: number;
  currency: CurrencyCode;
};

type CCDCweight = {
  units?: "KG" | "LB" | undefined;
  value?: number | undefined;
};

type DutiesPayment = {
  payor?: Payor | undefined;
};

type Payor = {
  responsibleParty?: ResponsibleParty | undefined;
  paymentType?: "SENDER" | undefined;
};

type ResponsibleParty = {
  address?: RPaddress | undefined;
  contact?: RPcontact | undefined;
  accountNumber: RPaccountNumber;
};

type RPaccountNumber = {
  value?: string | undefined;
};

type RPcontact = {
  personName?: string | undefined;
  emailAddress?: string | undefined;
  phoneNumber?: string | undefined;
  phoneExtension?: string | undefined;
  faxNumber?: string | undefined;
  companyName?: string | undefined;
};

type RPaddress = {
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode?: CountryCode | undefined;
  residential?: boolean | undefined;
};

type CommercialInvoice = {
  shipmentPurpose?:
    | "GIFT"
    | "NOT_SOLD"
    | "PERSONAL_EFFECTS"
    | "REPAIR_AND_RETURN"
    | "SAMPLE"
    | "SOLD"
    | "COMMERCIAL"
    | "RETURN_AND_REPAIR"
    | "PERSONAL_USE"
    | undefined;
};

type CCDbrokers = {
  broker: CCDBbroker;
  type: "EXPORT" | "IMPORT";
  brokerCommitTimestamp?: string | undefined;
  brokerCommitDayOfWeek?: string | undefined;
  brokerLocationId?: string | undefined;
  brokerAddress?: BrokerAddress | undefined;
  brokerToDestinationDays?: number | undefined;
};

type BrokerAddress = {
  streetLines?: string[] | undefined;
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode?: CountryCode | undefined;
  residential?: boolean | undefined;
  classification?: string | undefined;
  geographicCoordinates?: string | undefined;
  urbanizationCode?: string | undefined;
  countryName?: string | undefined;
};

type CCDBbroker = {
  address: CCDBBaddress;
  accountNumber?: CCDBBaccountNumber | undefined;
  contact: any;
};

type CCDBBaccountNumber = {
  value: string;
};

type CCDBBaddress = {
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode?: CountryCode | undefined;
  residential?: boolean | undefined;
};

type ShipmentSpecialServices = {
  returnShipmentDetail?: returnShipmentDetail | undefined;
  deliveryOnInvoiceAcceptanceDetail?:
    | DeliveryOnInvoiceAcceptanceDetail
    | undefined;
  internationalTrafficInArmsRegulationsDetail?:
    | InternationalTrafficInArmsRegulationsDetail
    | undefined;
  pendingShipmentDetail?: PendingShipmentDetail | undefined;
  holdAtLocationDetail?: HoldAtLocationDetail | undefined;
  shipmentCODDetail?: SSSshipmentCODDetail | undefined;
  shipmentDryIceDetail?: ShipmentDryIceDetail | undefined;
  internationalControlledExportDetail?:
    | InternationalControlledExportDetail
    | undefined;
  homeDeliveryPremiumDetail?: HomeDeliveryPremiumDetail | undefined;
  specialServiceTypes?: SpecialServiceTypes[] | undefined;
};

type SpecialServiceTypes = ShipmentLevelSpecialServicesTypes | undefined;

type HomeDeliveryPremiumDetail = {
  phoneNumber?: HPDphoneNumber | undefined;
  shipTimestamp?: string | undefined;
  homedeliveryPremiumType?: HomedeliveryPremiumType | undefined;
};

type HomedeliveryPremiumType = "APPOINTMENT" | "DATE_CERTAIN" | "EVENING";

type HPDphoneNumber = {
  areaCode?: string | undefined;
  extension?: string | undefined;
  countryCode?: CountryCode | undefined;
  personalIdentificationNumber?: string | undefined;
  localNumber?: string | undefined;
};

type InternationalControlledExportDetail = {
  type:
    | "DEA_036"
    | "DEA_236"
    | "DEA_486"
    | "DSP_05"
    | "DSP_61"
    | "DSP_73"
    | "DSP_85"
    | "DSP_94"
    | "DSP_LICENSE_AGREEMENT"
    | "FROM_FOREIGN_TRADE_ZONE"
    | "WAREHOUSE_WITHDRAWAL"
    | undefined;
};

type SSSshipmentCODDetail = {
  addTransportationChargesDetail?: AddTransportationChargesDetail | undefined;
  codRecipient?: CodRecipient | undefined;
  remitToName?: string | undefined;
  codCollectionType?: CodCollectionType | undefined;
  financialInstitutionContactAndAddress?:
    | FinancialInstitutionContactAndAddress
    | undefined;
  returnReferenceIndicatorType?: ReturnReferenceIndicatorType | undefined;
};

type ReturnReferenceIndicatorType = "INVOICE" | "PO" | "REFERENCE" | "TRACKING";

type FinancialInstitutionContactAndAddress = {
  contact?: FICAAcontact | undefined;
  address?: FICAAaddress | undefined;
};

type FICAAaddress = {
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode?: string | undefined;
  residential?: boolean | undefined;
};

type FICAAcontact = {
  personName?: string | undefined;
  emailAddress?: string | undefined;
  phoneNumber?: string | undefined;
  phoneExtension?: string | undefined;
  faxNumber?: string | undefined;
  companyName?: string | undefined;
};

type CodRecipient = {
  address?: CRaddress | undefined;
  contact?: CRcontact | undefined;
  accountNumber?: CRaccountNumber | undefined;
};

type CRaccountNumber = {
  value: string;
};

type CRcontact = {
  personName?: string | undefined;
  emailAddress?: string | undefined;
  phoneNumber?: string | undefined;
  phoneExtension?: string | undefined;
  faxNumber?: string | undefined;
  companyName?: string | undefined;
};

type CRaddress = {
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode?: CountryCode | undefined;
  residential?: boolean | undefined;
};

type AddTransportationChargesDetail = {
  rateType?: ATCDrateType | undefined;
  rateLevelType?: ATCDrateLevelType | undefined;
  chargeLevelType?: ATCDchargeLevelType | undefined;
  chargeType?: ATCDchargeType | undefined;
};

type ATCDchargeType =
  | "COD_SURCHARGE"
  | "NET_CHARGE"
  | "NET_FREIGHT"
  | "TOTAL_CUSTOMER_CHARGE";

type ATCDchargeLevelType = "CURRENT_PACKAGE" | "SUM_OF_PACKAGES";

type ATCDrateLevelType = "BUNDLED_RATE" | "INDIVIDUAL_PACKAGE_RATE";

type ATCDrateType =
  | "ACCOUNT"
  | "ACTUAL"
  | "CURRENT"
  | "CUSTOM"
  | "LIST"
  | "INCENTIVE"
  | "PREFERRED"
  | "PREFERRED_INCENTIVE"
  | "PREFERRED_CURRENCY";

type HoldAtLocationDetail = {
  locationId: string;
  locationContactAndAddress?: LocationContactAndAddress | undefined;
  locationType?: HALDlocationType | undefined;
};

type HALDlocationType =
  | "FEDEX_AUTHORIZED_SHIP_CENTER"
  | "FEDEX_OFFICE"
  | "FEDEX_SELF_SERVICE_LOCATION"
  | "FEDEX_STAFFED"
  | "RETAIL_ALLICANCE_LOCATION"
  | "FEDEX_GROUND_TERMINAL"
  | "FEDEX_ONSITE";

type LocationContactAndAddress = {
  contact?: LCAcontact | undefined;
  address?: LCAaddress | undefined;
};

type LCAaddress = {
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode?: CountryCode | undefined;
  residential?: boolean | undefined;
};

type LCAcontact = {
  personName?: string | undefined;
  emailAddress?: string | undefined;
  phoneNumber?: string | undefined;
  phoneExtension?: string | undefined;
  faxNumber?: string | undefined;
  companyName?: string | undefined;
};

type PendingShipmentDetail = {
  pendingShipmentType?: "EMAIL" | undefined;
  processingOptions?: ProcessingOptions | undefined;
  recommendedDocumentSpecification?:
    | RecommendedDocumentSpecification
    | undefined;
  emailLabelDetail?: EmailLabelDetail | undefined;
  documentReferences?: PSDdocumentReferences[] | undefined;
  expirationTimeStamp?: string | undefined;
  shipmentDryIceDetail?: ShipmentDryIceDetail | undefined;
};

type ShipmentDryIceDetail = {
  totalWeight?: SDIDTotalWeight | undefined;
  packageCount?: number | undefined;
};

type SDIDTotalWeight = {
  units?: "KG" | "LB" | undefined;
  value?: number | undefined;
};

type PSDdocumentReferences = {
  documentType?: PSDocumentType | undefined;
  customerReference?: string | undefined;
  description?: string | undefined;
  documentId?: string | undefined;
};

type PSDocumentType =
  | "CERTIFICATE_OF_ORIGIN"
  | "COMMERCIAL_INVOICE"
  | "ETD_LABEL"
  | "NAFTA_CERTIFICATE_OF_ORIGIN"
  | "NET_RATE_SHEET"
  | "OTHER"
  | "PRO_FORMA_INVOICE";

type EmailLabelDetail = {
  recipients?: ELDrecipients[] | undefined;
  message: string;
};

type ELDrecipients = {
  emailAddress: string;
  optionsRequested?: ELDRoptionsRequested | undefined;
  role?: ELDRrole | undefined;
  locale: ELDRlocale;
};

type ELDRlocale = {
  country: CountryCode;
  language: LocaleCodes;
};

type ELDRrole = "SHIPMENT_COMPLETOR" | "SHIPMENT_INITIATOR";

type ELDRoptionsRequested = {
  options?: ELDRORoptions[] | undefined;
};

type ELDRORoptions =
  | "PRODUCE_PAPERLESS_SHIPPING_FORMAT"
  | "SUPPRESS_ADDITIONAL_LANGUAGES"
  | "SUPPRESS_ACCESS_EMAILS";

type RecommendedDocumentSpecification = {
  types?: RecommendedDocumentSpecificationTypes[] | undefined;
};

type ProcessingOptions = {
  options: string[];
};

type InternationalTrafficInArmsRegulationsDetail = {
  licenseOrExemptionNumber: string;
};

type DeliveryOnInvoiceAcceptanceDetail = {
  recipient: {
    address: DOIADaddress;
    contact: DOIADcontact;
    accountNumber?: DOIADaccountNumber | undefined;
  };
};

//If the paymentType is Sender, then the account number is optional in shippingChargesPayment.
//In case if this is shipping account number, do use the account number used for creating Auth Token.
type DOIADaccountNumber = {
  value: string;
};

type DOIADcontact = {
  personName: string;
  emailAddress?: string | undefined;
  phoneNumber: string;
  phoneExtension?: string | undefined;
  faxNumber?: string | undefined;
  companyNmae: string;
};

type DOIADaddress = {
  city?: string | undefined;
  stateOrProvinceCode?: string | undefined;
  postalCode?: string | undefined;
  countryCode: CountryCode;
  residential?: boolean | undefined;
  streetLines?: string[] | undefined;
};

type returnShipmentDetail = {
  returnType: string;
};

type RequestedPackageLineItems = {
  subPackagingType?: SubPackageTypes | undefined;
  groupPackageCount?: number | undefined;
  contentRecord?: ContentRecord[] | undefined;
  declaredValue?: DeclaredValue | undefined;
  weight: Weight;
  dimensions?: Dimensions | undefined;
  variableHandlingChargeDetail?: VariableHandlingChargeDetail | undefined;
  packageSpecialServices?: PackageSpecialServices | undefined;
};

type PackageSpecialServices = {
  specialServiceTypes?: SpecialServicesTypes[] | undefined;
  signatureOptionType?: SignatureOptionType | undefined;
  alcoholDetail?: AlcoholDetail | undefined;
  dangerousGoodsDetail?: DangerousGoodsDetail | undefined;
  packageCODDetail?: PackageCODDetail | undefined;
  pieceCountVerificationBoxCount?: number | undefined;
  batteryDetails?: BatteryDetails[] | undefined;
  dryIceWeight?: DryIceWeight | undefined;
};

type DryIceWeight = {
  units?: "KG" | "LB" | undefined;
  value?: number | undefined;
};

type BatteryDetails = {
  material?: BDdetails | undefined;
  regulatorySubType?: string | undefined;
  packing?: BDpackaging | undefined;
};

type BDpackaging = "CONTAINED_IN_EQUIPMENT" | "PACKED_WITH_EQUIPMENT";

type BDdetails = "LITHIUM_METAL" | "LITHIUM_ION";

type PackageCODDetail = {
  codCollectionAmount?: CodCollectionAmount | undefined;
  codCollectionType?: CodCollectionType | undefined;
};

type CodCollectionType =
  | "ANY"
  | "CASH"
  | "COMPANY_CHECK"
  | "GUARANTEED_FUNDS"
  | "PERSONAL_CHECK";

type CodCollectionAmount = {
  amount?: number | undefined;
  currency?: CurrencyCode | undefined;
};

type DangerousGoodsDetail = {
  offeror?: string | undefined;
  accessibility?: DGDAccessibility | undefined;
  emergencyContactNumber?: string | undefined;
  options?: DGDOptions[] | undefined;
  containers?: Containers[] | undefined;
  packaging?: ContainersPackaging | undefined;
};

type Containers = {
  offeror?: string | undefined;
  hazardousCommodities?: HazardousCommodities[] | undefined;
  numberOfContainers?: number | undefined;
  containerType?: string | undefined;
  emergencyContactNumber?: EmergencyContactNumber | undefined;
  packaging?: ContainersPackaging | undefined;
  packagingType?: string | undefined;
  radioactiveContainerClass?: RadioactiveContainerClass | undefined;
};

type RadioactiveContainerClass =
  | "EXCEPTED_PACKAGE"
  | "INDUSTRIAL_IP1"
  | "INDUSTRIAL_IP2"
  | "INDUSTRIAL_IP3"
  | "TYPE_A"
  | "TYPE_B_M"
  | "TYPE_B_U"
  | "TYPE_C";

type ContainersPackaging = {
  count?: number | undefined;
  units?: string | undefined;
};

type EmergencyContactNumber = {
  areaCode: string;
  extension?: string | undefined;
  countryCode: CountryCode;
  personalIdentificationNumber?: string | undefined;
  localNumber?: string | undefined;
};

type HazardousCommodities = {
  quantity?: HCquantity | undefined;
  innerReceptacles?: HCquantity[] | undefined;
  options?: HCoptions | undefined;
  description?: HCdescription | undefined;
};

type HCdescription = {
  sequenceNumber?: number | undefined;
  processingOptions?: string[] | undefined;
  subsidiaryClasses?: string[] | undefined;
  labelText?: string | undefined;
  technicalName?: string | undefined;
  packingDetails?: PackingDetails | undefined;
  authorization?: string | undefined;
  reportableQuantity?: boolean | undefined;
  percentage?: number | undefined;
  id?: string | undefined;
  packingGroup?: PackingGroup | undefined;
  properShippingName?: string | undefined;
  hazardClass?: string | undefined;
};

type PackingGroup = "DEFAULT" | "I" | "II" | "III";

type PackingDetails = {
  packingInstructions?: string | undefined;
  cargoAircraftOnly?: boolean | undefined;
};

type HCoptions = {
  labelTextOption?: LabelTextOption | undefined;
  customerSuppliedLabelText?: string | undefined;
};

type LabelTextOption = "APPEND" | "OVERRIDE" | "STANDARD";

type HCquantity = {
  quantityType?: "GROSS" | "NET" | undefined;
  amount?: number | undefined;
  units?: string | undefined;
};

type DGDOptions =
  | "HAZARDOUS_MATERIALS"
  | "BATTERY"
  | "ORM_D"
  | "REPORTABLE_QUANTITIES"
  | "SMALL_QUANTITY_EXCEPTION"
  | "LIMITED_QUANTITIES_COMMODITIES";

type DGDAccessibility = "ACCESSIBLE" | "INACCESSIBLE";

type AlcoholDetail = {
  alcoholRecipientType: "LICENSEE" | "CONSUMER";
  shipperAgreementType?: string | undefined;
};

type SignatureOptionType =
  | "SERVICE_DEFAULT"
  | "NO_SIGNATURE_REQUIRED"
  | "INDIRECT"
  | "DIRECT"
  | "ADULT";

type VariableHandlingChargeDetail = {
  rateType?: RateType | undefined;
  percentValue?: number | undefined;
  rateLevelType?: RateLevelType | undefined;
  fixedValue?: FixedValue | undefined;
  rateElementBasis:
    | "NET_CHARGE"
    | "NET_FREIGHT"
    | "BASE_CHARGE"
    | "NET_CHARGE_EXCLUDING_TAXES";
};

type FixedValue = {
  ammount: number;
  currency: CurrencyCode;
};

type RateLevelType = "BUNDLED_RATE" | "INDIVIDUAL_PACKAGE_RATE";

type RateType =
  | "ACCOUNT"
  | "ACTUAL"
  | "CURRENT"
  | "CUSTOM"
  | "LIST"
  | "INCENTIVE"
  | "PREFERRED"
  | "PREFERRED_INCENTIVE"
  | "PREFERRED_CURRENCY";

type Dimensions = {
  length: number;
  width: number;
  height: number;
  units: "CM" | "IN";
};

type Weight = {
  units: "KG" | "LB";
  value: number;
};

type DeclaredValue = {
  amount: number;
  currency: CurrencyCode;
};

type ContentRecord = {
  itemNumber?: string | undefined;
  receivedQuantity?: number | undefined;
  description?: string | undefined;
  partNumber?: string | undefined;
};

type PickupType =
  | "CONTACT_FEDEX_TO_SCHEDULE"
  | "DROPOFF_AT_FEDEX_LOCATION"
  | "USE_SCHEDULED_PICKUP";

type RateRequestType = "LIST" | "INCENTIVE" | "ACCOUNT" | "PREFERRED";

type EmailNotificationDetail = {
  recipients?: EmailNotificationDetailRecipients | undefined;
  personalMessage?: string | undefined;
  printedReference?: PrintedReference | undefined;
};

type PrintedReference = {
  printedReferenceType?: PrintedReferenceType | undefined;
  value?: string | undefined;
};

type PrintedReferenceType =
  | "BILL_OF_LADING"
  | "CONSIGNEE_ID_NUMBER"
  | "INTERLINE_PRO_NUMBER"
  | "PO_NUMBER"
  | "SHIPPER_ID_NUMBER"
  | "SHIPPER_ID1_NUMBER"
  | "SHIPPER_ID2_NUMBER";

type EmailNotificationDetailRecipients = {
  emailAddress: string;
  notificationEventType?: NotificationEventType | undefined;
  smsDetail?: SmsDetail | undefined;
  notificationFormatType?: NotificationFormatType | undefined;
  emailNotificationRecipientType?: EmailNotificationRecipientType | undefined;
  notificationType?: NotificationType | undefined;
  locale?: LocaleCodes | undefined;
};

type NotificationType = "EMAIL" | "SMS_TEXT_MESSAGE";

type EmailNotificationRecipientType =
  | "BROKER"
  | "OTHER"
  | "RECIPIENT"
  | "SHIPPER"
  | "THIRD_PARTY"
  | "OTHER1"
  | "OTHER2";

type NotificationFormatType = "HTML" | "TEXT";

type SmsDetail = {
  phoneNumber: string;
  phoneNumberCountryCode: string;
};

type NotificationEventType =
  | "ON_DELIVERY"
  | "ON_EXCEPTION"
  | "ON_SHIPMENT"
  | "ON_TENDER"
  | "ON_ESTIMATED_DELIVERY"
  | "ON_PICKUP"
  | "ON_LABEL"
  | "ON_BILL_OF_LADING";

type Recipient = {
  address: Address;
};

type Shipper = {
  address: Address;
};

type Address = {
  city: string;
  stateOrProvidence?: string | undefined;
  postalCode: string;
  countryCode: CountryCode;
  residential?: boolean | undefined;
};

type RateRequestControlParameters = {
  returnTransitTimes: boolean;
  servicesNeededOnRateFailure: boolean;
  variableOptions: VariableOptions;
  rateSortOrder: string;
};

type VariableOptions =
  | "COMMITASCENDING"
  | "SERVICENAMETRADITIONAL"
  | "COMMITDESCENDING";
