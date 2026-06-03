export type SnapshotPoint = {
    snapshot_at: string;
    hospital_slug: string;
    t45p95?: number | null;
    t45p50?: number | null;
    t3p95?: number | null;
    t3p50?: number | null;
    t2wt?: number | null;
    t1wt?: number | null;
    manageT1case?: number | null;
    manageT2case?: number | null;
    multiple_resuscitation_cases?: number;
    data_version?: string;
};
  
export type SnapshotStore = {
    updated_at?: string;
    timezone?: string;
    date?: string;
    hospitals: Record<string, SnapshotPoint[]>;
};
  
export type HospitalPrediction = {
    snapshot_at?: string | null;
    features_ok?: boolean;
    valid_lag_1h?: boolean;
    valid_avg_wait_3h?: boolean;
    valid_triage_lag_1h?: boolean;
    valid_triage_avg_3h?: boolean;
    multiple_resuscitation_cases?: boolean;
    multiple_resuscitation_cases_1h_any?: boolean;
    pred_1h?: number | null;
    pred_2h?: number | null;
    pred_3h?: number | null;
};
  
export type PredictionsDocument = {
    predicted_at?: string;
    source_snapshot_at?: string | null;
    timezone?: string;
    hospitals: Record<string, HospitalPrediction>;
};
  