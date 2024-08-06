import pandas as pd
import json

# Define the mapping from wait descriptions to numerical values
wait_mapping = {
    'Around 1 hour': 1,
    'Over 1 hour': 2,
    'Over 2 hours': 3,
    'Over 3 hours': 4,
    'Over 4 hours': 5,
    'Over 5 hours': 6,
    'Over 6 hours': 7,
    'Over 7 hours': 8,
    'Over 8 hours': 9
}

def create_df():
    """Sets up and creates dataframe based on the data provided"""
    # Load the data
    df = pd.read_csv('data/raw_data.csv', parse_dates=['Timestamp'], index_col=['Timestamp'])

    # Convert wait times using the mapping
    for column in df.columns:  # Skip the first column (Timestamp)
        df[column] = df[column].map(wait_mapping)

    # Convert timestamp to day of week and hour
    df['day_of_week'] = df.index.dayofweek
    df['hour_of_day'] = df.index.hour
    
    return df

def compute_averages(df, group_by, column):
    """Compute average of a column grouped by specified field."""
    new_df = df.groupby(group_by)[column].mean()
    
    # adjust day labels if group_by is day_of_week
    if group_by == "day_of_week": new_df.index = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    return new_df

def get_daily_averages(df, hospital, data):
    """Get daily averages per hospital"""
    average_per_day = compute_averages(df, 'day_of_week', hospital)
    data["Days"] = average_per_day.to_dict()

def get_hourly_averages(df, hospital, data):
    """Get hourly averages per hospital"""
    average_per_day = compute_averages(df, 'hour_of_day', hospital)
    data["Hours"] = average_per_day.to_dict()

def get_daily_hourly_averages(df, hospital, data):
    """Get daily hourly averages per hospital"""
    day_labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for idx, day in enumerate(day_labels):
        daily_data = df[df['day_of_week'] == idx]
        daily_averages = compute_averages(daily_data, 'hour_of_day', hospital)
        data[day] = daily_averages.to_dict()  # convert series to dict for JSON serialization

def gather_all_hospitals_data(df):
    """Gather daily hourly averages for all hospitals and return as a dictionary"""
    hospital_data = {}
    for hospital in df.columns[0:-2]:  # adjust as per your actual columns
        hospital_data[hospital] = {}
        get_daily_averages(df, hospital, hospital_data[hospital])
        get_hourly_averages(df, hospital, hospital_data[hospital])
        get_daily_hourly_averages(df, hospital, hospital_data[hospital])
    return hospital_data

def save_to_json(data, filename):
    """Save dictionary data to a JSON file"""
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def main():
    df = create_df()
    all_hospitals_data = gather_all_hospitals_data(df)
    save_to_json(all_hospitals_data, 'data/hospital_averages.json')

if __name__ == "__main__":
    main()