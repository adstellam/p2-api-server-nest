export declare enum ApiResourceEnum {
    Job = "Job",
    JobDTO = "JobDTO",
    Task = "Task",
    TaskDTO = "TaskDTO",
    TaskOperationsData = "TasKOperationsData",
    TaskOperationsDataDTO = "TaskOperationsDataDTO",
    Field = "Field",
    FieldDTO = "FieldDTO",
    FieldBoundary = "FieldBoundary",
    FieldBoundaryDTO = "FieldBoundaryDTO",
    CropZone = "CropZone",
    CropZoneDTO = "CropZoneDTO",
    CropObservationsData = "CropObservationsData",
    CropObservationsDataDTO = "CropObservationsDataDTO",
    CropImage = "CropImage",
    CropImageDTO = "CropImageDTO",
    Machine = "Machine",
    MachineDTO = "MachineDTO",
    MachineTelmaticsData = "MachineTelematicsData",
    MachineTelematicsDataDTO = "MachineTelematicsDataDTO",
    MapLayer = "MapLayer",
    MapyLaerDTO = "MapLayerDTO",
    User = "User",
    UserDTO = "UserDTO",
    Role = "Role",
    RoleDTO = "RoleDTO"
}
export declare enum DeviceElementTypeEnum {
    Machine = "Machine",
    Implement = "Implement",
    Sensor = "Sensor",
    Bin = "Bin",
    Section = "Section",
    Unit = "Unit",
    Function = "Function",
    IrrSystem = "IrrSystem",
    IrrSection = "IrrSection",
    Endgun = "Endgun"
}
export declare enum HttpMethodEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
export declare enum JobPriorityEnum {
    Immediately = "Immediately",
    AsSoonAsPossible = "AsSoonAsPossible",
    High = "High",
    Meidum = "Medium",
    Low = "Low"
}
export declare enum LoggingLevelEnum {
    MachineType = "MachineType",
    SpecificMachine = "SpecificMachine",
    ImplementType = "ImplementType",
    SpcificImplement = "SpecificImplement",
    SpecificSection = "SpecificSection",
    SpecificMeter = "SpecificMeter",
    Unspecified = "Unspecified"
}
export declare enum LoggingMethodEnum {
    TimeInterval = "TimeInterval",
    DistanceInterval = "DistanceInterval",
    ThresholdLimits = "ThresholdLimits",
    OnChange = "OnChange",
    Total = "Total"
}
export declare enum OperationTypeEnum {
    SowingAndPlanting = "Planting",
    Tillage = "Cultivating",
    Irrigation = "Irrigation",
    Fertilizaing = "Fertilizing",
    CropProtection = "Spraying",
    Harvesting = "Harvesting",
    Wrapping = "Wrapping",
    Transport = "Transport",
    Bailing = "Bailing",
    Swathing = "Swathing",
    ForageHarvesting = "ForageHarvesting",
    Mowing = "Mowing",
    Unknown = "Unknown"
}
export declare enum ReferenceLayerSourceFormatEnum {
    Vector = "Vector",
    Raster = "Raster"
}
export declare enum ReferenceLayerTypeEnum {
    BackgroundImage = "BackgroundImage",
    CommonLandUnit = "CommonLandUnit",
    ElevationMap = "ElevationMap",
    ManagementZone = "ManagementZone",
    Obstacles = "Obstacles",
    ProfitMap = "ProfitMap",
    SoilTypeMap = "SoilTypeMap",
    VarietyLocation = "VarietyLocator"
}
export declare enum SeedTypeEnum {
}
export declare enum WorkItemPriorityEnum {
    Immediately = "Immediately",
    AsSoonAsPossible = "AsSoonAsPossible",
    High = "High",
    Medium = "Medium",
    Low = "Low"
}
export declare enum WorkStatusEnum {
    Scheduled = "Scheduled",
    InProgress = "InProgress",
    Paused = "Paused",
    PartiallyCompleted = "PartiallyCompleted",
    Completed = "Completed",
    Cancelled = "Cancelled"
}
