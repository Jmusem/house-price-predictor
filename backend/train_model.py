import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv("final_cleaned_df.csv")

# Select features and target
features = ['bedrooms', 'bathrooms', 'property_type', 'purchase_type', 'new_sub_county', 'total_rooms']
target = 'price'

X = df[features]
y = df[target]

# Identify categorical and numerical columns
categorical = ['property_type', 'purchase_type', 'new_sub_county']
numerical = ['bedrooms', 'bathrooms', 'total_rooms']

# Preprocessing pipeline
preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical),
    ('num', StandardScaler(), numerical)
])

# Create full pipeline with model
model = Pipeline([
    ('preprocess', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model.fit(X_train, y_train)

# Predict on test set
y_pred = model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("✅ Training complete!")
print(f"Mean Absolute Error: {mae:,.0f} KES")
print(f"R² Score: {r2:.2f}")

# Save model
joblib.dump(model, 'house_price_model.pkl')
print("✅ Model saved as house_price_model.pkl")
