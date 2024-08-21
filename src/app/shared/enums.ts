export enum RecordAction {
    UpdateClick,
    DeleteClick
}

export enum InsuranceStatus {
    Active,        // The insurance policy is currently in force, and coverage is provided.
    Expired,       // The policy has reached its end date and is no longer valid until renewed.
    Pending,       // The policy is in the process of being activated or renewed, but coverage has not yet started.
    Cancelled,     // The policy has been terminated before its expiration date, either by the insurer or the policyholder.
    Suspended,     // Coverage is temporarily halted, possibly due to non-payment or other issues, but may be reinstated.
    Lapsed,        // The policy has not been renewed and coverage is no longer provided.
    UnderReview,   // The policy is being assessed for potential adjustments or issues, which might affect coverage or status.
    InForce        // The policy is current and providing coverage, similar to "Active."
}